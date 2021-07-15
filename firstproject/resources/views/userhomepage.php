<?php 
	 session_start();

	 //include("connection.php");
	 //include("functions.php");

	 // if ($_SERVER['REQUEST_METHOD'] == "POST") {
	 // 	$username = $_POST['user_name'];
	 // 	$password = $_POST['password'];
	 // 	//$email=$_POST['email'];

	 // 	if(!empty($username) && !empty($password) ){

	 // 			header('/loginuser');
	 		
	 // 	}
	 // 	else{
	 // 		echo "Enter valid information";
	 // 	}
	 // }
	echo 'kk';
	header('/logout');

 ?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Login</title>
	<style type="text/css">
		body {
			font-size: 125%;
		}
		.textInput {

                padding: 5px 5px 12px 5px;
                font-size: 25px;
                border-radius: 5px;
                border: 1px solid grey;
                width:200px;

                }
		label {
                
                position: relative;
                top:12px;
                width:100px;
                float: left;
                
            }
		#wrapper{
			width: 500px;
			margin: 0 auto;
		}
		#btn {
			margin-left: 100px;
			font-size: 25px;
		}
		a{
			text-decoration: none;
			margin-left: 80px;
		}
	</style>
</head>
<body>
	<div id="wrapper">
		<h1>Logout</h1>
		<form method="post" >
			<input type="submit" value="logout" id="btn">
			<a href="signup.php">Signup</a>
		</form>
	</div>
</body>
</html>
