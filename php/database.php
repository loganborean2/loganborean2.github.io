<?php 

require_once("config.php");

/**
 * The following class was originally written for a lynda.com tutorial course
 * Class MySQLDatabase
 * Sets up a new database connection to the server
 * Contains methods for Database queries
 */
class MySQLDatabase {
	private $connection;
	function __construct() {
		$this->open_connection();
	}


	public function open_connection() {
		$this->connection = mysqli_connect(DB_SERVER, DB_USER, DB_PASS, DB_NAME);
		
		if(mysqli_connect_errno()) {
			die("Database connection failed" . 
				mysqli_connect_error() .
				" (" . mysqli_connect_errno() 
					. ")"
			);
		}
	}

	public function  close_connection() {
		if(isset($this->connection)) {
			mysql_close($this->connection);
			unset($this->connection);
		}
	}

	public function query($sql) {
		//$result = mysql_query($this->connection,$sql);
		$result = mysqli_query($this->connection,$sql);

		$this->confirm_query($result);

		return $result;
	}

	private function confirm_query($result) {
		if(!$result){
			die("database query failed.");
		}		
	}

	public function escape_value($string) {
		$escaped_string = mysqli_real_escape_string(
			$this->connection,$string);
		return $escaped_string;
	} 

	public function fetch_array($result_set) {
		return mysqli_fetch_array($result_set);
	}

	public function num_rows($result_set) {
		return mysqli_num_rows($result_set);
	}

	public function insert_id() {
		return mysqli_insert_id($this->connection);
	}

	public function affected_rows() {
		return mysqli_affected_rows($this->connection);
	}

}

/*
 * a MySQLDatabase object created to be used GLOBALLY
 * */
$database = new MySQLDatabase();

/*
 * pointer to the database object
 *
 * */
$db =& $database;

?>