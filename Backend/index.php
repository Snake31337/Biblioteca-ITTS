<?php
    function respond($statusCode, $data)
    {
        http_response_code($statusCode);
        header('Content-Type: application/json; charset=utf-8');
        $errorText = json_encode($data);
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

        //####################//
        // SQL string methods //
        //####################//

        private function GetInsertRow($tableName, $columns, $values)
        {
            $sqlQuery = "INSERT INTO " . $tableName;
            $sqlQuery .= " (" . implode(", ", $columns) . ")";
            $sqlQuery .= " VALUES (" . implode(", ", $values) . ")";
            return $sqlQuery;
        }

        private function GetSelectRows($tableName, $columns, $whereCondition)
        {
            $sqlQuery = "SELECT " . implode(", ", $columns) . " FROM " . $tableName;
            if($whereCondition != "")
                $sqlQuery .= " WHERE " . $whereCondition;
            return $sqlQuery;
        }

        private function GetSelectRowsRelationNN($tableName1, $tableName2, $relationTable, $columnsWithTables, $primaryKey1, $primaryKey2, $whereCondition)
        {
            $sqlQuery = "SELECT " . implode(", ", $columnsWithTables) . " FROM " . $tableName1 . ", " . $tableName2 . ", " . $relationTable;
            $sqlQuery .= " WHERE " . $tableName1 . "." . $primaryKey1 . " = " . $relationTable . "." . $primaryKey1;
            $sqlQuery .= " AND " . $tableName2 . "." . $primaryKey2 . " = " . $relationTable . "." . $primaryKey2;
            if($whereCondition != "")
                $sqlQuery .= " AND " . $whereCondition;
            return $sqlQuery;
        }

        //End of SQL string methods

        //##################//
        // Public functions //
        //##################//

        public function InsertRow($tableName, $columns, $values)
        {
            return $this->Query($this->GetInsertRow($tableName, $columns, $values));
        }

        public function SelectRows($tableName, $columns, $whereCondition)
        {
            return $this->Query($this->GetSelectRows($tableName, $columns, $whereCondition));
        }

        public function SelectRowsRelationNN($tableName1, $tableName2, $relationTable, $columnsWithTables, $primaryKey1, $primaryKey2, $whereCondition)
        {
            return $this->Query($this->GetSelectRowsRelationNN($tableName1, $tableName2, $relationTable, $columnsWithTables, $primaryKey1, $primaryKey2, $whereCondition));
        }

        //End of Public functions
    }

    header('Access-Control-Allow-Origin: *');

    define("HOSTNAME", "127.0.0.1");
    define("USERNAME", "root");
    define("PASSWORD", NULL);
    define("DBNAME", "itts_biblioteca");

    $requestData = json_decode(file_get_contents('php://input'), true);
    try
    {
        $dbManager = new DatabaseManager(HOSTNAME, USERNAME, PASSWORD);
    }
    catch (Exception $e)
    {
        respond(500, "Can't connect to SQL server: " . $e->getMessage()); //Internal server error
    }
    $operation = $dbManager->SelectDatabase(DBNAME);
    if($operation["successful"])
    {
        if(isset($requestData["type"]))
        {
            if($requestData["type"] == "listBooks")
            {
                $operation = $dbManager->SelectRowsRelationNN("Libro", "Autore", "Scrive", Array("Libro.*", "Autore.Nome", "Autore.Cognome"), "CodiceLibro", "CodiceAutore", "");
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
            else if($requestData["type"] == "insertBook")
            {
                if(isset($requestData["bookArgs"]))
                {
                    $bookArgs = $requestData["bookArgs"];
                    $operation = $dbManager->InsertRow(
                        "Libro", 
                        Array("Titolo", "Lingua", "Editore", "AnnoPubblicazione", "Categoria", "ISBN"),
                        Array("'" . $bookArgs["Titolo"] . "'", "'" . $bookArgs["Lingua"] . "'", "'" . $bookArgs["Editore"] . "'", $bookArgs["AnnoPubblicazione"], "'" . $bookArgs["Categoria"] . "'", "'" . $bookArgs["ISBN"] . "'")
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
            else if($requestData["type"] == "searchBook")
            {
                if(isset($requestData["keyword"]))
                {
                    $keyword = $requestData["keyword"];
                    $operation = $dbManager->SelectRowsRelationNN("Libro", "Autore", "Scrive", Array("Libro.*", "Autore.Nome", "Autore.Cognome"), "CodiceLibro", "CodiceAutore", "Libro.Titolo LIKE '%" . $keyword . "%'");
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
            else if($requestData["type"] == "listUsers")
            {
                $operation = $dbManager->SelectRows("Utente", Array("*"), "");
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
            else if($requestData["type"] == "insertUser")
            {
                if(isset($requestData["userArgs"]))
                {
                    $userArgs = $requestData["userArgs"];
                    $operation = $dbManager->InsertRow(
                        "Utente", 
                        Array("CodiceFiscale", "Nome", "Cognome", "DataRegistrazioneTessera", "Indirizzo", "NumeroTessera"),
                        Array("'" . $userArgs["CodiceFiscale"] . "'", "'" . $userArgs["Nome"] . "'", "'" . $userArgs["Cognome"] . "'", date_format(date_create($userArgs["DataRegistrazioneTessera"]), "Ymd"), "'" . $userArgs["Indirizzo"] . "'", $userArgs["NumeroTessera"])
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
                    respond(400, "'insertUser' needs 'userArgs' which is an array of a User attributes"); //Bad request
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