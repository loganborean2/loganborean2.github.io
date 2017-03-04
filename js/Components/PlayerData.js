/**
 * Created by Deric on 2016-05-19.
 */

/**
 *
 * @constructor
 */
function PlayerData(){

    this.loggedInState =  false;
    this.userName =  "";
    this.highScores =  new Array(10);
    this.id = null;

    this.achievements =  new Array(3);
    this.achievements[0] = false;
    this.achievements[1] = false;
    this.achievements[2] = false;

    this.achievName = new Array(3);
    this.achievName[0] = "Meet the Witch!";
    this.achievName[1] = "High Energy!";
    this.achievName[2] = "Make America Great Again!";
    
    this.soundStatus = true;
}


/**
 * Sets the player data on login.
 * @param obj
 */
PlayerData.prototype.login = function(obj){
    this.loggedInState = true;
    this.userName = obj.username;
    this.id = obj.id;
};


PlayerData.prototype.setAchievements = function(obj){

    if(obj[0].a1 == 1){
        this.achievements[0] = true;
    }
    if(obj[0].a2 == 1){
        this.achievements[1] = true;
    }
    if(obj[0].a3 == 1){
        this.achievements[2] = true;
    }
};




/**
 *
 * @param number
 * @returns {boolean}
 */
PlayerData.prototype.giveAchievement = function(number){

    if(!this.loggedInState){
        return false;
    }

    if(this.achievements[number]){
        return false;
    }

    this.achievements[number] = true;

    $.post("php/update_achievement.php", {
        id: this.id,
        achNo: number + 1
    });

    return true;
};



/**
 * Adds a score to the users high score history.
 *      -keeps the highest score at index 0.
 *      -Cuts off any array elements beyond index 9.
 * @param score
 */
PlayerData.prototype.addToHighScores = function(score){
    for(var i = 0; i < this.highScores.length;i++){
        if(score > this.highScores[i] ) {
            this.highScores.splice(i, 0, score);
            this.highScores.slice(0, 10);
        }
    }
};

/**
 * merge the scores from the current game session with Users score history after login.
 *      -puts the current sessions score
 * @param scoreHistory
 */
PlayerData.prototype.mergeScores = function(scoreHistory){
    var currentScores = this.highScores;
    this.highScores = scoreHistory;
    for(var i = 0; i < currentScores.length; i++){
        this.addToHighScores(currentScores);
    }
};


/**
 *
 * @param id
 */
PlayerData.prototype.setId = function(id) {
    this.id = id;
};

/**
 *
 * @returns {*|null}
 */
PlayerData.prototype.getId = function() {
    return this.id;
};

/**
 *
 * @param state
 */
PlayerData.prototype.setLoggedInState = function(state){
    this.loggedInState = state;
};

/**
 *
 * @returns {boolean|*}
 */
PlayerData.prototype.getLoggedInState = function(){
    return this.loggedInState;
};

/**
 *
 * @param user
 */
PlayerData.prototype.setUserName = function(user){
    this.userName = user;
};

/**
 *
 * @returns {*|string}
 */
PlayerData.prototype.getUserName = function(){
    return this.userName;
};





