<?php 
/*Process Request to return the current user's achievment status*/
require_once('achievement.php');

$id = $_POST['id'];

$user_achievement = Achievement::find_by_id($id);

echo json_encode($user_achievement);

