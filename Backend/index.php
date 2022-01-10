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
                return Array("successful" => true, "response" => $queryResult);
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

        public function InsertRow($tableName, $columns, $values)
        {
            $sqlQuery = "INSERT INTO " . $tableName;
            $sqlQuery .= " (" . implode(",", $columns) . ")";
            $sqlQuery .= " VALUES (" . implode(",", $values) . ")";
            return $this->Query($sqlQuery);
        }

        public function SelectRows($tableName, $columns, $whereCondition)
        {
            $sqlQuery = "SELECT " . implode(",", $columns) . " FROM " . $tableName;
            if($whereCondition != "")
                $sqlQuery .= " WHERE " . $whereCondition;
            return $this->Query($sqlQuery);
        }
    }

    header('Access-Control-Allow-Origin: *');

    define("HOSTNAME", "127.0.0.1");
    define("USERNAME", "root");
    define("PASSWORD", NULL);
    define("DBNAME", "itts_biblioteca");

    //$requestType = $_POST["type"];
    $requestData = json_decode(file_get_contents('php://input'), true);
    $requestType = $requestData["type"];

    $dbManager = new DatabaseManager(HOSTNAME, USERNAME, PASSWORD);
    $operation = $dbManager->SelectDatabase(DBNAME);
    if($operation["successful"])
    {
        if(isset($requestType))
        {
            if($requestType == "listBooks")
            {
                $operation = $dbManager->SelectRows("Libro", Array("*"), "");
                if($operation["successful"])
                {
                    $resultArray = Array();
                    while($row = mysqli_fetch_assoc($operation["response"]))
                        array_push($resultArray, $row);
                    respond(200, $resultArray); //Ok
                }
                else
                {
                    respond(500, "Couldn't select rows: " . $operation["response"] . " - Last query was: " . $dbManager->lastQuery); //Internal server error
                }
            }
            else if($requestType == "insertBook")
            {
                if(isset($_POST["bookArgs"]))
                {
                    $bookArgs = explode(",", $_POST["bookArgs"]);
                    $operation = $dbManager->InsertRow(
                        "Libro", 
                        Array("Titolo", "Lingua", "Editore", "AnnoPubblicazione", "Categoria", "ISBN"),
                        Array("'" . $bookArgs[0] . "'", "'" . $bookArgs[1] . "'", "'" . $bookArgs[2] . "'", $bookArgs[3], "'" . $bookArgs[4] . "'", "'" . $bookArgs[5] . "'")
                    );
                    if($operation["successful"])
                    {
                        respond(200, "Row successfully inserted (" . $operation["response"] . ")"); //Ok
                    }
                    else
                    {
                        respond(500, "Couldn't insert row: " . $operation["response"] . " - Last query was: " . $dbManager->lastQuery); //Internal server error
                    }
                }
                else
                {
                    respond(400, "'insertBook' needs 'bookArgs' which is an array of a Book attributes"); //Bad request
                }
            }
            else if($requestType == "searchBook")
            {
                if(isset($_POST["keyword"]))
                {
                    $keyword = $_POST["keyword"];
                    $operation = $dbManager->SelectRows("Libro", Array("*"), "Titolo LIKE '%" . $keyword . "%'");
                    if($operation["successful"])
                    {
                        $resultArray = Array();
                        while($row = mysqli_fetch_assoc($operation["response"]))
                            array_push($resultArray, $row);
                        respond(200, $resultArray); //Ok
                    }
                    else
                    {
                        respond(500, "Couldn't select rows: " . $operation["response"] . " - Last query was: " . $dbManager->lastQuery); //Internal server error
                    }
                }
                else
                {
                    respond(400, "'searchBook' needs 'keyword' which is the string to be searched"); //Bad request
                }
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
    }
    else
    {
        respond(500, "Can't select database: " . $operation["response"]); //Internal server error
    }

    die;
?>