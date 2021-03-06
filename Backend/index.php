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
        public $lastError;
        public $lastResult;

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

            $this->lastError = mysqli_error($this->mysqli);
            $this->lastResult = $queryResult;
            
            if($queryResult)
                return true;
            else
                return false;
        }

        public function SelectDatabase($databaseName)
        {
            $sqlQuery = "USE " . $databaseName;
            return $this->Query($sqlQuery);
        }

        //####################//
        // SQL string methods //
        //####################//

        public function GetInsertRow($tableName, $columnsAndValues)
        {
            $columns = array_keys($columnsAndValues);
            $values = array_values($columnsAndValues);

            $sqlQuery = "INSERT INTO " . $tableName;
            $sqlQuery .= " (" . implode(", ", $columns) . ")";
            $sqlQuery .= " VALUES (" . implode(", ", $values) . ")";
            return $sqlQuery;
        }

        public function GetSelectRows($tableName, $aliasesAndColumns, $whereCondition, $orderBy)
        {
            $selectArray = Array();
            foreach($aliasesAndColumns as $alias => $column)
                if(is_string($alias))
                    array_push($selectArray, $column . " AS " . $alias);
                else
                    array_push($selectArray, $column);

            $sqlQuery = "SELECT " . implode(", ", $selectArray);
            $sqlQuery .= " FROM " . $tableName;
            if($whereCondition != "")
                $sqlQuery .= " WHERE " . $whereCondition;
            if($orderBy != "")
                $sqlQuery .= " ORDER BY " . $orderBy;
            return $sqlQuery;
        }

        public function GetSelectRowsRelationNN($tableName1, $tableName2, $relationTable, $aliasesAndColumnsWithTables, $primaryKey1, $primaryKey2, $whereCondition, $orderBy)
        {
            $selectArray = Array();
            foreach($aliasesAndColumnsWithTables as $alias => $column)
                if(is_string($alias))
                    array_push($selectArray, $column . " AS " . $alias);
                else
                    array_push($selectArray, $column);

            $sqlQuery = "SELECT " . implode(", ", $selectArray);
            $sqlQuery .= " FROM " . $tableName1 . ", " . $tableName2 . ", " . $relationTable;
            $sqlQuery .= " WHERE " . $tableName1 . "." . $primaryKey1 . " = " . $relationTable . "." . $primaryKey1;
            $sqlQuery .= " AND " . $tableName2 . "." . $primaryKey2 . " = " . $relationTable . "." . $primaryKey2;
            if($whereCondition != "")
                $sqlQuery .= " AND " . $whereCondition;
            if($orderBy != "")
                $sqlQuery .= " ORDER BY " . $orderBy;
            return $sqlQuery;
        }

        public function GetUpdateRows($tableName, $columnsAndValues, $whereCondition)
        {
            $setArray = Array();
            foreach($columnsAndValues as $column => $value)
                array_push($setArray, $column . " = " . $value);

            $sqlQuery = "UPDATE " . $tableName;
            $sqlQuery .= " SET " . implode(",", $setArray);
            $sqlQuery .= " WHERE " . $whereCondition;
            return $sqlQuery;
        }

        public function GetDeleteRows($tableName, $whereCondition)
        {
            $sqlQuery = "DELETE";
            $sqlQuery .= " FROM " . $tableName;
            $sqlQuery .= " WHERE " . $whereCondition;
            return $sqlQuery;
        }

        //End of SQL string methods

        //##################//
        // Public functions //
        //##################//

        public function InsertRow($tableName, $columnsAndValues)
        {
            return $this->Query($this->GetInsertRow($tableName, $columnsAndValues));
        }

        public function SelectRows($tableName, $aliasesAndColumns, $whereCondition, $orderBy)
        {
            return $this->Query($this->GetSelectRows($tableName, $aliasesAndColumns, $whereCondition, $orderBy));
        }

        public function SelectRowsRelationNN($tableName1, $tableName2, $relationTable, $aliasesAndColumnsWithTables, $primaryKey1, $primaryKey2, $whereCondition, $orderBy)
        {
            return $this->Query($this->GetSelectRowsRelationNN($tableName1, $tableName2, $relationTable, $aliasesAndColumnsWithTables, $primaryKey1, $primaryKey2, $whereCondition, $orderBy));
        }

        public function UpdateRows($tableName, $columnsAndValues, $whereCondition)
        {
            return $this->Query($this->GetUpdateRows($tableName, $columnsAndValues, $whereCondition));
        }

        public function DeleteRows($tableName, $whereCondition)
        {
            return $this->Query($this->GetDeleteRows($tableName, $whereCondition));
        }



        public function FixData($data, $tableName)
        {
            $whereArray = Array();
            foreach($data as $key => $value)
                array_push($whereArray, "COLUMN_NAME = \"" . $key . "\"");

            $whereCondition = "TABLE_NAME = \"" . $tableName . "\"";
            $whereCondition .= " AND " . implode(" OR ", $whereArray);
            $operation = $this->Query($this->GetSelectRows("INFORMATION_SCHEMA.COLUMNS", Array("COLUMN_NAME", "DATA_TYPE"), $whereCondition, ""));
            if($operation)
            {
                $typesArray = Array();
                while($row = mysqli_fetch_row($this->lastResult))
                    $typesArray[$row[0]] = $row[1];
                foreach($data as $key => $value)
                    if($typesArray[$key] == "varchar" || $typesArray[$key] == "date")
                        $data[$key] = "\"" . $data[$key] . "\"";
                
                return $data;
            }
            else
            {
                return false; 
            }
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
    if($operation)
    {
        if(isset($requestData["type"]))
        {
            if($requestData["type"] == "listBooks")
            {
                if(isset($requestData["orderBy"]))
                {
                    $orderBy = $requestData["orderBy"];
                    $operation = $dbManager->SelectRows("Libro", Array("*"), "", $orderBy);
                    if($operation)
                    {
                        $resultArray = Array();
                        while($row = mysqli_fetch_assoc($dbManager->lastResult))
                            array_push($resultArray, $row);
                        respond(200, $resultArray); //Ok
                    }
                    else
                    {
                        respond(500, "Couldn't select rows: " . $dbManager->lastError . " - Last query was: " . $dbManager->lastQuery); //Internal server error
                    }
                }
                else
                {
                    respond(400, "'listBooks' needs 'orderBy' which is the name of the field to consider when ordering output"); //Bad request
                }
            }
            else if($requestData["type"] == "listBooksWithPrestato")
            {
                if(isset($requestData["orderBy"]))
                {
                    $orderBy = $requestData["orderBy"];
                    $operation = $dbManager->SelectRows("Libro", Array("*", "Stato"=>"(" . $dbManager->GetSelectRows("Prestito", Array("'Prestato'"), "Libro.CodiceLibro = Prestito.CodiceLibro AND CURDATE() > Prestito.DataInizioPrestito AND CURDATE() < Prestito.DataFinePrestito", "") . ")"), "", $orderBy);
                    if($operation)
                    {
                        $resultArray = Array();
                        while($row = mysqli_fetch_assoc($dbManager->lastResult))
                            array_push($resultArray, $row);
                        respond(200, $resultArray); //Ok
                    }
                    else
                    {
                        respond(500, "Couldn't select rows: " . $dbManager->lastError . " - Last query was: " . $dbManager->lastQuery); //Internal server error
                    }
                }
                else
                {
                    respond(400, "'listBooksWithPrestato' needs 'orderBy' which is the name of the field to consider when ordering output"); //Bad request
                }
            }
            else if($requestData["type"] == "insertBook")
            {
                if(isset($requestData["bookArgs"]))
                {
                    $bookArgs = $dbManager->FixData($requestData["bookArgs"], "Libro");
                    $operation = $dbManager->InsertRow("Libro", $bookArgs);
                    if($operation)
                    {
                        respond(200, "Inserted successfully (" . $dbManager->lastResult . ")"); //Ok
                    }
                    else
                    {
                        respond(500, "Couldn't insert row: " . $dbManager->lastError . " - Last query was: " . $dbManager->lastQuery); //Internal server error
                    }
                }
                else
                {
                    respond(400, "'insertBook' needs 'bookArgs' which is an array of a Book attributes"); //Bad request
                }
            }
            else if($requestData["type"] == "searchBook")
            {
                if(isset($requestData["orderBy"]))
                {
                    $orderBy = $requestData["orderBy"];
                    if(isset($requestData["by"]))
                    {
                        if(isset($requestData["keyword"]))
                        {
                            $by = $requestData["by"];
                            $keyword = $requestData["keyword"];
                            $operation = $dbManager->SelectRows("Libro", Array("*"), $by . " LIKE '%" . $keyword . "%'", $orderBy);
                            if($operation)
                            {
                                $resultArray = Array();
                                while($row = mysqli_fetch_assoc($dbManager->lastResult))
                                    array_push($resultArray, $row);
                                respond(200, $resultArray); //Ok
                            }
                            else
                            {
                                respond(500, "Couldn't select rows: " . $dbManager->lastError . " - Last query was: " . $dbManager->lastQuery); //Internal server error
                            }
                        }
                        else
                        {
                            respond(400, "'searchBook' requires 'keyword' which is the string to be searched"); //Bad request
                        }
                    }
                    else
                    {
                        respond(400, "'searchBook' requires 'by' which is the name of the field to search");
                    }
                }
                else
                {
                    respond(400, "'searchBook' needs 'orderBy' which is the name of the field to consider when ordering output"); //Bad request
                }
                
            }
            else if($requestData["type"] == "searchBookWithPrestato")
            {
                if(isset($requestData["orderBy"]))
                {
                    if(isset($requestData["by"]))
                    {
                        if(isset($requestData["keyword"]))
                        {
                            $orderBy = $requestData["orderBy"];
                            $by = $requestData["by"];
                            $keyword = $requestData["keyword"];
                            $operation = $dbManager->SelectRows("Libro", Array("*", "Stato"=>"(" . $dbManager->GetSelectRows("Prestito", Array("'Prestato'"), "Libro.CodiceLibro = Prestito.CodiceLibro AND CURDATE() > Prestito.DataInizioPrestito AND CURDATE() < Prestito.DataFinePrestito", "") . ")"), $by . " LIKE '%" . $keyword . "%'", $orderBy);
                            if($operation)
                            {
                                $resultArray = Array();
                                while($row = mysqli_fetch_assoc($dbManager->lastResult))
                                    array_push($resultArray, $row);
                                respond(200, $resultArray); //Ok
                            }
                            else
                            {
                                respond(500, "Couldn't select rows: " . $dbManager->lastError . " - Last query was: " . $dbManager->lastQuery); //Internal server error
                            }
                        }
                        else
                        {
                            respond(400, "'searchBook' requires 'keyword' which is the string to be searched"); //Bad request
                        }
                    }
                    else
                    {
                        respond(400, "'searchBook' requires 'by' which is the name of the field to search");
                    }
                }
                else
                {
                    respond(400, "'searchBook' needs 'orderBy' which is the name of the field to consider when ordering output"); //Bad request
                }
            }
            else if($requestData["type"] == "updateBook")
            {
                if(isset($requestData["id"]))
                {
                    if(isset($requestData["bookArgs"]))
                    {
                        $id = $requestData["id"];
                        $bookArgs = $dbManager->FixData($requestData["bookArgs"], "Libro");
                        $operation = $dbManager->UpdateRows("Libro", $bookArgs, "CodiceLibro = " . $id);
                        if($operation)
                        {
                            respond(200, "Updated successfully (" . $dbManager->lastResult . ")");
                        }
                        else
                        {
                            respond(500, "Couldn't update row: " . $dbManager->lastError . " - Last query was: " . $dbManager->lastQuery);
                        }
                    }
                    else
                    {
                        respond(400, "'updateBook' requires 'column' which is the string identifying the column to modify");
                    }
                }
                else
                {
                    respond(400, "'updateBook' requires 'id' which is the primary key of the book to be modified");
                }
            }
            else if($requestData["type"] == "deleteBook")
            {
                if(isset($requestData["id"]))
                {
                    $id = $requestData["id"];
                    $operation = $dbManager->DeleteRows("Libro", "CodiceLibro = " . $id);
                    if($operation)
                    {
                        respond(200, "Deleted successfully (" . $dbManager->lastResult . ")");
                    }
                    else
                    {
                        respond(500, "Couldn't delete row: " . $dbManager->lastError . " - Last query was: " . $dbManager->lastQuery);
                    }
                }
                else
                {
                    respond(400, "'deleteBook' requires 'id' which is the primary key of the book to be deleted");
                }
            }
            else if($requestData["type"] == "listUsers")
            {
                if(isset($requestData["orderBy"]))
                {
                    $orderBy = $requestData["orderBy"];
                    $operation = $dbManager->SelectRows("Utente", Array("*"), "", $orderBy);
                    if($operation)
                    {
                        $resultArray = Array();
                        while($row = mysqli_fetch_assoc($dbManager->lastResult))
                            array_push($resultArray, $row);
                        respond(200, $resultArray); //Ok
                    }
                    else
                    {
                        respond(500, "Couldn't select rows: " . $dbManager->lastError . " - Last query was: " . $dbManager->lastQuery); //Internal server error
                    }
                }
                else
                {
                    respond(400, "'listUsers' needs 'orderBy' which is the name of the field to consider when ordering output"); //Bad request
                }
            }
            else if($requestData["type"] == "insertUser")
            {
                if(isset($requestData["userArgs"]))
                {
                    $userArgs = $dbManager->FixData($requestData["userArgs"], "Utente");
                    $operation = $dbManager->InsertRow("Utente", $userArgs);
                    if($operation)
                    {
                        respond(200, "Row successfully inserted (" . $dbManager->lastResult . ")"); //Ok
                    }
                    else
                    {
                        respond(500, "Couldn't insert row: " . $dbManager->lastError . " - Last query was: " . $dbManager->lastQuery); //Internal server error
                    }
                }
                else
                {
                    respond(400, "'insertUser' needs 'userArgs' which is an array of a User attributes"); //Bad request
                }
            }
            else if($requestData["type"] == "searchUser")
            {
                if(isset($requestData["orderBy"]))
                {   
                    if(isset($requestData["by"]))
                    {
                        if(isset($requestData["keyword"]))
                        {
                            $orderBy = $requestData["orderBy"];
                            $by = $requestData["by"];
                            $keyword = $requestData["keyword"];
                            $operation = $dbManager->SelectRows("Utente", Array("*"), $by . " LIKE '%" . $keyword . "%'", $orderBy);
                            if($operation)
                            {
                                $resultArray = Array();
                                while($row = mysqli_fetch_assoc($dbManager->lastResult))
                                    array_push($resultArray, $row);
                                respond(200, $resultArray); //Ok
                            }
                            else
                            {
                                respond(500, "Couldn't select rows: " . $dbManager->lastError . " - Last query was: " . $dbManager->lastQuery); //Internal server error
                            }
                        }
                        else
                        {
                            respond(400, "'searchUser' requires 'keyword' which is the string to be searched"); //Bad request
                        }
                    }
                    else
                    {
                        respond(400, "'searchUser' requires 'by' which is the name of the field to search");
                    }
                }
                else
                {
                    respond(400, "'searchUser' needs 'orderBy' which is the name of the field to consider when ordering output"); //Bad request
                }
            }
            else if($requestData["type"] == "updateUser")
            {
                if(isset($requestData["id"]))
                {
                    if(isset($requestData["userArgs"]))
                    {
                        $id = $requestData["id"];
                        $userArgs = $dbManager->FixData($requestData["userArgs"], "Utente");
                        $operation = $dbManager->UpdateRows("Utente", $userArgs, "CodiceFiscale = '" . $id . "'");
                        if($operation)
                        {
                            respond(200, "Updated successfully (" . $dbManager->lastResult . ")");
                        }
                        else
                        {
                            respond(500, "Couldn't update row: " . $dbManager->lastError . " - Last query was: " . $dbManager->lastQuery);
                        }
                    }
                    else
                    {
                        respond(400, "'updateUser' requires 'userArgs' which is an array of a User attributes");
                    }
                }
                else
                {
                    respond(400, "'updateUser' requires 'id' which is the primary key of the user to be modified");
                }
            }
            else if($requestData["type"] == "deleteUser")
            {
                if(isset($requestData["id"]))
                {
                    $id = $requestData["id"];
                    $operation = $dbManager->DeleteRows("Utente", "CodiceFiscale = '" . $id ."'");
                    if($operation)
                    {
                        respond(200, "Deleted successfully (" . $dbManager->lastResult . ")");
                    }
                    else
                    {
                        respond(500, "Couldn't delete row: " . $dbManager->lastError . " - Last query was: " . $dbManager->lastQuery);
                    }
                }
                else
                {
                    respond(400, "'deleteUser' requires 'id' which is the primary key of the user to be deleted");
                }
            }
            else if($requestData["type"] == "listBorrows")
            {
                if(isset($requestData["orderBy"]))
                {
                    $orderBy = $requestData["orderBy"];
                    $operation = $dbManager->SelectRows("Prestito, Utente, Libro", Array("Prestito.*", "Utente.Nome", "Utente.Cognome", "Libro.Titolo"), "Utente.CodiceFiscale = Prestito.CodiceFiscale AND Libro.CodiceLibro = Prestito.CodiceLibro", $orderBy);
                    if($operation)
                    {
                        $resultArray = Array();
                        while($row = mysqli_fetch_assoc($dbManager->lastResult))
                            array_push($resultArray, $row);
                        respond(200, $resultArray); //Ok
                    }
                    else
                    {
                        respond(500, "Couldn't select rows: " . $dbManager->lastError . " - Last query was: " . $dbManager->lastQuery); //Internal server error
                    }
                }
                else
                {
                    respond(400, "'listBorrows' needs 'orderBy' which is the name of the field to consider when ordering output"); //Bad request
                }
            }
            else if($requestData["type"] == "insertBorrow")
            {
                if(isset($requestData["borrowArgs"]))
                {
                    $borrowArgs = $dbManager->FixData($requestData["borrowArgs"], "Prestito");
                    $operation = $dbManager->InsertRow("Prestito", $borrowArgs);
                    if($operation)
                    {
                        respond(200, "Row successfully inserted (" . $dbManager->lastResult . ")"); //Ok
                    }
                    else
                    {
                        respond(500, "Couldn't insert row: " . $dbManager->lastError . " - Last query was: " . $dbManager->lastQuery); //Internal server error
                    }
                }
                else
                {
                    respond(400, "'insertBorrow' needs 'borrowArgs' which is an array of a User attributes"); //Bad request
                }
            }
            else if($requestData["type"] == "searchBorrow")
            {
                if(isset($requestData["orderBy"]))
                {
                    if(isset($requestData["by"]))
                    {
                        if(isset($requestData["keyword"]))
                        {
                            $orderBy = $requestData["orderBy"];
                            $by = $requestData["by"];
                            $keyword = $requestData["keyword"];
                            $operation = $dbManager->SelectRows("Prestito, Utente, Libro", Array("Prestito.*", "Utente.Nome", "Utente.Cognome", "Libro.Titolo"), $by . " LIKE '%" . $keyword . "%'", $orderBy);
                            if($operation)
                            {
                                $resultArray = Array();
                                while($row = mysqli_fetch_assoc($dbManager->lastResult))
                                    array_push($resultArray, $row);
                                respond(200, $resultArray); //Ok
                            }
                            else
                            {
                                respond(500, "Couldn't select rows: " . $dbManager->lastError . " - Last query was: " . $dbManager->lastQuery); //Internal server error
                            }
                        }
                        else
                        {
                            respond(400, "'searchBorrow' requires 'keyword' which is the string to be searched"); //Bad request
                        }
                    }
                    else
                    {
                        respond(400, "'searchBorrow' requires 'by' which is the name of the field to search");
                    }
                }
                else
                {
                    respond(400, "'searchBorrow' needs 'orderBy' which is the name of the field to consider when ordering output"); //Bad request
                }
            }
            else if($requestData["type"] == "updateBorrow")
            {
                if(isset($requestData["id"]))
                {
                    if(isset($requestData["borrowArgs"]))
                    {
                        $id = $requestData["id"];
                        $borrowArgs = $dbManager->FixData($requestData["borrowArgs"], "Prestito");
                        $operation = $dbManager->UpdateRows("Prestito", $borrowArgs, "CodicePrestito = " . $id);
                        if($operation)
                        {
                            respond(200, "Updated successfully (" . $dbManager->lastResult . ")");
                        }
                        else
                        {
                            respond(500, "Couldn't update row: " . $dbManager->lastError . " - Last query was: " . $dbManager->lastQuery);
                        }
                    }
                    else
                    {
                        respond(400, "'updateBorrow' requires 'userArgs' which is an array of a Borrow attributes");
                    }
                }
                else
                {
                    respond(400, "'updateBorrow' requires 'id' which is the primary key of the borrow to be modified");
                }
            }
            else if($requestData["type"] == "deleteBorrow")
            {
                if(isset($requestData["id"]))
                {
                    $id = $requestData["id"];
                    $operation = $dbManager->DeleteRows("Prestito", "CodicePrestito = " . $id);
                    if($operation)
                    {
                        respond(200, "Deleted successfully (" . $dbManager->lastResult . ")");
                    }
                    else
                    {
                        respond(500, "Couldn't delete row: " . $dbManager->lastError . " - Last query was: " . $dbManager->lastQuery);
                    }
                }
                else
                {
                    respond(400, "'deleteBorrow' requires 'id' which is the primary key of the borrow to be deleted");
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
        respond(500, "Can't select database: " . $dbManager->lastError); //Internal server error
    }

    die;
?>