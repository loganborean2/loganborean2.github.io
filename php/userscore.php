
<?php
require_once('database.php');
/**
 * Class UserScore
 * Defines an object containing user id and user score
 * Contains methods to Create, Record, Delete and Update the database
 */
class UserScore{
	
	protected static $table_name="userscore";
	protected static $db_fields = array('id', 'score','playtime');

	public $id;
	public $score;
	public $playtime;
	public static function find_all() {
		return self::find_by_sql("SELECT * FROM ".self::$table_name);
  	}
  
  	public static function find_by_id($id=0) {
    $result_array = self::find_by_sql("SELECT * FROM ".self::$table_name." WHERE id={$id}");
		return !empty($result_array) ? $result_array : false;
  	}
  
  	public static function find_by_sql($sql="") {
    	global $database;
    	$result_set = $database->query($sql);
    	$object_array = array();
    	while ($row = $database->fetch_array($result_set)) {
      		$object_array[] = self::instantiate($row);
    	}
    	return $object_array;
  	}

	public static function count_all() {
	  global $database;
	  $sql = "SELECT COUNT(*) FROM ".self::$table_name;
      $result_set = $database->query($sql);
	  $row = $database->fetch_array($result_set);
      return array_shift($row);
	}

	private static function instantiate($record) {
	$object = new self;
		foreach($record as $attribute=>$value){
		  if($object->has_attribute($attribute)) {
		    $object->$attribute = $value;
		  }
		}
		return $object;
	}
	
	private function has_attribute($attribute) {
	  return array_key_exists($attribute, $this->attributes());
	}

	protected function attributes() { 
		// return an array of attribute names and their values
	  $attributes = array();
	  foreach(self::$db_fields as $field) {
	    if(property_exists($this, $field)) {
	      $attributes[$field] = $this->$field;
	    }
	  }
	  return $attributes;
	}
	
	protected function sanitized_attributes() {
	  global $database;
	  $clean_attributes = array();
	  // sanitize the values before submitting
	  foreach($this->attributes() as $key => $value){
	    $clean_attributes[$key] = $database->escape_value($value);
	  }
	  return $clean_attributes;
	}
	
	public function save() {
	  // A new record won't have an id yet.
	  return isset($this->id) ? $this->update() : $this->create();
	}
	
	public function create() {
		global $database;
		$attributes = $this->sanitized_attributes();
	  $sql = "INSERT INTO " .self::$table_name." (";
		$sql .= join(", ", array_keys($attributes));
	  $sql .= ") VALUES ('";
		$sql .= join("', '", array_values($attributes));
		$sql .= "')";
	  if($database->query($sql)) {
	    $this->id = $database->insert_id();
	    return true;
	  } else {
	    return false;
	  }
	}

	public function update() {
	  global $database;
		$attributes = $this->sanitized_attributes();
		$attribute_pairs = array();
		foreach($attributes as $key => $value) {
		  $attribute_pairs[] = "{$key}='{$value}'";
		}
		$sql = "UPDATE ".self::$table_name." SET ";
		$sql .= join(", ", $attribute_pairs);
		$sql .= " WHERE id=". $database->escape_value($this->id);
	  $database->query($sql);
	  return ($database->affected_rows() == 1) ? true : false;
	}

	public function delete() {
		global $database;
	  	$sql = "DELETE FROM ".self::$table_name;
	  	$sql .= " WHERE id=". $database->escape_value($this->id);
	  	$sql .= " LIMIT 1";
	  	$database->query($sql);
	  	return ($database->affected_rows() == 1) ? true : false;
	} 
}

/**
 * Class UsernameScore
 * Defines an Object containing username and score
 * Has methods for creating, and updating scores of the individual User
 */
Class UsernameScore {

	public $username;
	public $score;

	protected static $db_fields = array('username','score');

	protected function attributes() { 
		// return an array of attribute names and their values
	  $attributes = array();
	  foreach(self::$db_fields as $field) {
	    if(property_exists($this, $field)) {
	      $attributes[$field] = $this->$field;
	    }
	  }
	  return $attributes;
	}

	private function has_attribute($attribute) {
	  return array_key_exists($attribute, $this->attributes());
	}

	private static function instantiate($record) {
		$object = new self;
		foreach($record as $attribute=>$value){
		  if($object->has_attribute($attribute)) {
		    $object->$attribute = $value;
		  }
		}
		return $object;
	}

	public static function find_by_sql($sql="") {
    	global $database;
    	$result_set = $database->query($sql);
    	$object_array = array();
    	while ($row = $database->fetch_array($result_set)) {
      		$object_array[] = self::instantiate($row);
    	}
    return $object_array;
  	}

	public static function find_top_ten() {
		$sql  = "SELECT t1.username, t2.score ";
		$sql .= "FROM user AS t1 INNER JOIN userscore AS t2 ";
		$sql .= "ON t1.id = t2.id ";
		$sql .= "ORDER BY t2.score DESC, t2.playtime DESC ";
		$sql .= "LIMIT 10";	

		$result_array =	self::find_by_sql($sql);

		return $result_array;
	}


}
