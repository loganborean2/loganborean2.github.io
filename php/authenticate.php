<?php
/**
 * Processes the request for login, gets data from the login form
 * And compares data available in the Database
 * On success: Returns an array of user information and scores
 * On failure : Returns an appropriate message
 **/
require_once("database.php");
require_once("user.php");
require_once("userscore.php");
require_once("achievement.php");

if(isset($_POST['username']) && isset($_POST['password'])){
	$found_user = User::authenticate($_POST['username'],$_POST['password']);
	/*prepare the associative array*/
	if($found_user){
		//$user_scores = UserScore::find_by_id($found_user->id);
		$user_achievement = Achievement::find_by_id($found_user->id);
		$user_array = array(
		"username" => $found_user->username,
		"password" => $found_user->password,
        "id" => $found_user->id,    
		"logged_in" => "true",
		"achievement_array" => $user_achievement //placeholder for now, will hold an array of the top ten scores of this user in future
		);
		echo json_encode($user_array);
	} else {
		echo "Wrong UserName/Password";
	}
		
} else {
	echo "no username or password";
}