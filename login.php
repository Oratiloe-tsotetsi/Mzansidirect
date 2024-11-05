<?php
// Define database credentials
$servername = "YASAAR_LAPTOP"; // Your SQL server address
$username = "developers"; // Your SQL username
$password = "Project_Mz@nsi"; // Your SQL password
$dbname = "Project_Mzansi"; // Your database name

// Create a connection to the database using sqlsrv
$connectionInfo = array("Database"=>$dbname, "UID"=>$username, "PWD"=>$password);
$conn = sqlsrv_connect($servername, $connectionInfo);


// Example of handling a form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Assume your form processing code here (e.g., save details to the database)
    // ...

    // After processing, redirect to the home page
    header("Location: /index.html"); 
    exit();
}



// Check if the connection is successful
if ($conn === false) {
    die(print_r(sqlsrv_errors(), true));
}

// Retrieve form data
$email = $_POST['email'];
$pass = $_POST['password'];

// Prepare the SQL query to check the user credentials
$sql = "SELECT * FROM users1 WHERE emailAddress = ? AND password = ?";
$params = array($email, $pass);

// Execute the query
$stmt = sqlsrv_query($conn, $sql, $params);

if ($stmt === false) {
    die(print_r(sqlsrv_errors(), true));
}

// Check if the user exists
if (sqlsrv_has_rows($stmt)) {
    // If a match is found, the user is logged in successfully
    echo "Login successful! Welcome, " . htmlspecialchars($email);
	header ("Location:about.html");
} else {
    // If no match is found, display an error message
    echo '<a href="http://localhost/Project_Mzansi/signup.php">Invalid email or password. Click Here to sign up</a>';
	//header ("Location: signup.php");
}

// Close the connection
sqlsrv_close($conn);
?>
