<?php
/*
 * Brings back the top ten Global high-scores from the database
 * ON success: sends the top ten score-username combinations as
 * an array.
 * */
require_once('userscore.php');

$top_ten = UsernameScore::find_top_ten();

echo json_encode($top_ten);
