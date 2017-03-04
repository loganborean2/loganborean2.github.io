<?php
/**
 * Class Achievement
 * Defines the achievements of a user
 * and contains methods for creating, deleting, and updating achievements
 * of a user in in the database
 * a1 == MAKE AMERICA GREAT AGAIN (beat the game)
 * a2 == MEET THE WITCH (meet hilary clinton @ level 1)
 * a3 == HIGH ENERGY (score >= 25_000)
 */
require_once('database.php');
class Achievement {
	public $id;
	public $a1;
	public $a2;
	public $a3;

	protected static $table_name = "achievement"; 
	protected static $db_fields = array('id','a1','a2','a3');

	public static function find_by_id($id=0) {
    $result_array = self::find_by_sql("SELECT * FROM ".self::$table_name." WHERE id={$id}");
		return !empty($result_array) ? $result_array : false;
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

  	public function create() {
		global $database;
		$attributes = $this->attributes();
	  $sql = "INSERT INTO " .self::$table_name." (";
		$sql .= join(", ", array_keys($attributes));
	  $sql .= ") VALUES ('";
		$sql .= join("', '", array_values($attributes));
		$sql .= "')";
	  if($database->query($sql)) {
	    //$this->id = $database->insert_id();
	    return true;
	  } else {
	    return false;
	  }
	}

	public static function update_achievement($id, $number, $value) {
		global $database;

		$sql = "UPDATE achievement SET ";
		$sql .= "a" . $number ." = " . $value;
		$sql .= " WHERE id= " . $id; 
		
		$database->query($sql);	  	
	}
}