<?php
    function respond($statusCode, $data)
    {
        http_response_code($statusCode);
        $errorText = "";
        if(isset($data))
        {
            header('Content-Type: application/json; charset=utf-8');
            $errorText = json_encode($data);
        }
        die($errorText);
    }

    class DatabaseManager
    {
        private $mysqli;
        public $lastQuery;

        public function __construct($hostname, $username, $password)
        {
            $this->mysqli = mysqli_connect($hostname, $username, $password);
            if (!$this->mysqli)
                throw new Exception("Couldn't connect to SQL server: " . mysqli_connect_error());
        }

        public function __destruct()
        {
            mysqli_close($this->mysqli);
        }

        private function Query($queryToSend)
        {
            $this->lastQuery = $queryToSend;
            $queryResult = mysqli_query($this->mysqli, $queryToSend);
            if($queryResult)
                return Array("successful" => true, "response" => mysqli_fetch_all($queryResult));
            else
                return Array("successful" => false, "response" => mysqli_error($this->mysqli));
        }

        public function SelectDatabase($databaseName)
        {
            $sqlQuery = "USE " . $databaseName;
            return $this->Query($sqlQuery);
        }

        public function CreateDatabase($databaseName)
        {
            $sqlQuery = "CREATE DATABASE " . $databaseName . " CHARACTER SET utf8 COLLATE utf8_general_ci";
            return $this->Query($sqlQuery);
        }

        public function CreateTable($tableName, $columnsAndTypes, $primaryKey) //columnsAndTypes is an array of pairs
        {
            $sqlQuery = "CREATE TABLE " . $tableName . " (";
            for($i = 0; $i < count($columnsAndTypes); $i++)
                $sqlQuery += implode(" ", $columnsAndTypes[$i]) . ",";
            $sqlQuery += "PRIMARY KEY (" . $primaryKey . "));";
            return $this->Query($sqlQuery);
        }

        public function InsertQuery($tableName, $columns, $values)
        {
            $sqlQuery = "INSERT INTO " . $tableName . " (" . implode(",", $columns) . ") VALUES (" . implode(",", $values) . ")";
            return $this->Query($sqlQuery);
        }

        public function SelectQuery($tableName, $columns, $whereCondition)
        {
            $sqlQuery = "SELECT " . implode(",", $columns) . " FROM " . $tableName;
            if(isset($whereCondition))
                $sqlQuery .= " WHERE " . $whereCondition;
            return $this->Query($sqlQuery);
        }
    }

    define("HOSTNAME", "127.0.0.1");
    define("USERNAME", "root");
    define("PASSWORD", NULL);
    define("DBNAME", "itts_biblioteca");

    $requestType = $_POST["type"];

    if(isset($requestType))
    {
        if($requestType == "listAllBooks")
        {
            respond(501, "Not implemented yet");
        }
        else if($requestType == "authenticateUser")
        {
            respond(501, "Not implemented yet"); //Not implemented
        }
        else if($requestType == "test")
        {
            $dbManager = new DatabaseManager(HOSTNAME, USERNAME, PASSWORD);
            $operation = $dbManager->SelectDatabase(DBNAME);
            respond(200, $operation["response"]);
        }
        else
        {
            respond(400, "Invalid value for 'type'"); //Bad request
        }
    }
    else
    {
        respond(400, "'type' POST variable not set"); //Bad request
    }

    die;
?>