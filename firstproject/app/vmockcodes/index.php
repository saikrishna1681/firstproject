<?php
	session_start();

	 include("connection.php");
	 include("functions.php");

	 $user_data = check_login($con); 

	 if (isset($_POST['create'])) {
	 	$username = $_POST['user_name'];
	 	$password = $_POST['password'];
	 	if(!empty($username) && !empty($password)){

	 		$user_id = random_num(20);
	 		$query = "insert into users_data (name,password) values ('$username','$password')";

	 		mysqli_query($con, $query);

	 	}
	 	else{
	 		echo "Enter valid information";
	 	}
	 }
	 elseif (isset($_POST['delete'])) {
	 	$username = $_POST['user_name'];
	 	$query = "delete from users where user_name = '$username'";
	 	mysqli_query($con, $query);
	 }
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Home</title>
	<style type="text/css">
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
                font-size: 20px;
                float: left;
                
            }
        #btn {
			margin-left: 100px;
			font-size: 25px;
		}
		a{
			text-decoration: none;
		}
		button {
			float: right;
			height: 40px;
			width: 60px;
		}
	</style>
</head>
<body>
	<button><a href="logout.php">logout</a></button>
	<h1>Hello <?php echo $user_data['user_name']?>;</h1>
	<p>Here are users of this page</p>
	<?php
		$query = "select user_id,user_name from users";
		$result = mysqli_query($con,$query);
		if(mysqli_num_rows($result)>0){
			while ($row = mysqli_fetch_assoc($result)) {
				echo "user_id:" .$row['user_id']. " user_name:" .$row['user_name']. "<br>";
			}
		}
		else{
			echo "no users";
		}
	?>

	<h2>Create New Users</h2>
	<form method="post">
		<label for="user_name">Username</label>
		<input type="text" name="user_name" class="textInput"><br>
		<label for="password">Password</label>
		<input type="password" name="password" class="textInput">
		<input type="submit" name="create" value="Create">
	</form>
	<h2>Delete User</h2>
	<form method="post">
		<label for="user_name">Username</label>
		<input type="text" name="user_name" class="textInput"><br>
		<input type="submit" name="delete" value="Delete">
	</form>
</body>
</html>
