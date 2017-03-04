<?php
/*
 * Logs the score to the database
 * On success: returns a message "success"
 * On failure: returns a message "failure"
 * */
require_once("userscore.php");

$score = $_POST['score'];
$id = $_POST['id'];

$new_score = new UserScore();

$new_score->id = $id;
$new_score->score = $score;
$new_score->playtime;

/*
 * Try to inject the object into the database
 * */
if($new_score->create()) {
  echo "success";
} else {
  echo "failure";
}




