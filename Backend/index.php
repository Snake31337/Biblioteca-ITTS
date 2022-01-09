<?php
    $hostname = "127.0.0.1";
    $username = "root";
    $password = NULL;
    $dbName = "itts_biblioteca";

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

    function databaseInit()
    {
        $mysqli = mysqli_connect($GLOBALS['hostname'], $GLOBALS['username'], $GLOBALS['password']);
        if (!$mysqli)
            return Array(false, "Can't connect to SQL server (" . mysqli_connect_error() . ")");
        else
        {
            $sqlQuery = "CREATE DATABASE " . $GLOBALS['dbName'];
            if(mysqli_query($mysqli, $sqlQuery))
                return Array(true);
            else
                return Array(false, "Can't create database (" . mysqli_error($mysqli) . ")");
        }

        mysqli_close($mysqli);

        /*$mysqli = mysqli_connect("127.0.0.1", "root", "", $dbName);
        if (!$mysqli)
            return Array(false, mysqli_connect_error());
        else*/
            
    }

    function databaseConnect()
    {
        $mysqli = mysqli_connect($GLOBALS['hostname'], $GLOBALS['username'], $GLOBALS['password'], $GLOBALS['dbName']);
        if (!$mysqli)
            return Array(false, mysqli_connect_error());
        else
            return Array(true, $mysqli);
    }

    function databaseInsertRowQuery($databaseConnection, $tableName, $columns, $values)
    {
        $sqlQuery = "INSERT INTO " . $tableName . " (" . implode(",", $columns) . ") VALUES (" . implode(",", $values) . ")";
        if(mysqli_query($databaseConnection, $sqlQuery))
            return Array(true);
        else
            return Array(false, mysqli_error($databaseConnection));
    }

    function databaseSelectQuery($databaseConnection, $tableName, $columns, $whereCondition)
    {
        $sqlQuery = "SELECT " . implode(",", $columns) . " FROM " . $tableName;
        if(isset($whereCondition))
            $sqlQuery .= " WHERE " . $whereCondition;
        
        $result = mysqli_query($databaseConnection, $sqlQuery);

        if($result)
        {
            if(mysqli_num_rows($result) > 0)
            {
                $returnArr = Array();
                while($row = mysqli_fetch_assoc($result))
                    array_push($returnArr, $row);

                return Array(true, $returnArr);
            }
            else
            {
                return Array(false, "No results");
            }
        }    
        else
        {
            return Array(false, mysqli_error($databaseConnection));
        }
    }

    $requestType = $_POST["type"];

    if(isset($requestType))
    {
        if($requestType == "initDatabase")
        {
            $operation = databaseInit();
            if($operation[0])
            {
                respond(201, "Database created"); //Created
            }
            else
            {
                respond(500, "An error has occurred: " . $operation[1]); //Internal server error
            }
        }
        else if($requestType == "listAllBooks")
        {
            $conn = databaseConnect();
        }
        elseif($requestType == "authenticateUser")
        {
            respond(501, "Not implemented yet"); //Not implemented
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