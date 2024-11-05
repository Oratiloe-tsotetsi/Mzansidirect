<?php

// Define database credentials
		$servername = "YASAAR_LAPTOP"; // Your SQL server address
		$username = "developers"; // Your SQL username
		$password = "Project_Mz@nsi"; // Your SQL password
		$dbname = "Project_Mzansi"; // Your database name
		
// Create a connection to the database using sqlsrv
		$connectionInfo = array("Database" => $dbname, "UID" => $username, "PWD" => $password);
		$conn = sqlsrv_connect($servername, $connectionInfo);
		
// Check if the connection is successful
		if ($conn === false) {
			die(print_r(sqlsrv_errors(), true));
		}
		
// Retrieve form data safely
			$name = $_POST['name'];
			$surname = $_POST['surname'];
			$email = $_POST['email'];
			$pass = $_POST['password'];
			
// Prepare and execute the SQL statement
			$sql = "INSERT INTO users1 (FirstName, LastName, EmailAddress, Password) VALUES (?, ?, ?, ?)";
			$params = array($name, $surname, $email, $pass);
			
// Use prepared statements to prevent SQL injection
			$stmt = sqlsrv_query($conn, $sql, $params);
			if ($stmt === false) {
				die(print_r(sqlsrv_errors(), true));
			} else {
		header ("Location:shop.html");
			}
			
// Close the connection
sqlsrv_close($conn);
?>