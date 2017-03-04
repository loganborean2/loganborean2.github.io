<?php 
/**
 * Processes request for creating an account
 * Takes in Potential username and password
 * If the username and password pass the validation functions:
 * Username and Password is saved into the database and user is 'registered'
 * On failure: Return an appropriate message
 */
require_once("database.php");
require_once("user.php");
require_once("achievement.php");

if(isset($_POST['username']) 
	&& isset($_POST['password']) 
	&& isset($_POST['confirm_password'])
	&& $_POST['password'] == $_POST['confirm_password']){
	
	$username = trim($_POST['username']);
	$password = trim($_POST['password']);
	
	$user = new User();

	//set the user attributes
	$user->username = $database->escape_value($username);
	$user->password = $database->escape_value($password);

	//inject the user into the database
	if($user->create()) {
		//create a row in the achievement table for this user
		$achievement = new Achievement();
		$achievement->id = $user->id;
		//set all the achievement status to zero == false 
		$achievement->a1 = 0;
		$achievement->a2 = 0;
		$achievement->a3 = 0;
		$achievement->create();
		//$achievement->update_achievement(2,1);
		//send this back to JS
		echo "success";
	} else {
		//send this back to JS
		echo "failure";
	}
} else {
	echo "failure";
}
