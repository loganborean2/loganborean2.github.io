<?php
require_once('achievement.php');
/*Processes request for updating an achievement
-achievement 1 : Make America Great Again (beat the game) 
-achievement 2 : Meet the witch (Hilary Clinton)
-achievement 3 : High Energy (score >= 25_000)
*/

$id = $_POST['id'];
$achievement_number = $_POST['achNo']; 
$value = 1;

Achievement::update_achievement($id,$achievement_number,$value);