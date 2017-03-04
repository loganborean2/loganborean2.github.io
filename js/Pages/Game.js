/**
 * The main game object that sets up and plays the game.
 */
function Game() {
    Page.call(this);
    
    this.page.id = "game-page";
    this.page.className = "game";

    this.level = 0;
    this.scoreTracker = new ScoringSystem(CANVAS_MANAGER.gameCanvas);
    this.grid = new Grid();

    CANVAS_MANAGER.gameCanvas.insertDrawable(this.grid);
    CANVAS_MANAGER.gameCanvas.insertDrawable(this.scoreTracker);

    var home = document.createElement("div");
    home.className = "home-button";
    home.addEventListener('click', function(){
        GAME.setVisibility(false);
        MENU.setVisibility(true);
    });


    this.achievement = document.createElement("div");
    this.achievement.id = "achievement-popup";




    this.page.appendChild(CANVAS_MANAGER.orientCanvas.canvas);
    this.page.appendChild(CANVAS_MANAGER.backgroundCanvas.canvas);
    this.page.appendChild(CANVAS_MANAGER.gameCanvas.canvas);
    this.page.appendChild(CANVAS_MANAGER.uiCanvas.canvas);
    this.page.appendChild(home);
    this.page.appendChild(this.achievement);
    
    
}

//inheritance stuff
Game.prototype = Object.create(Page.prototype);
Game.prototype.constructor = Game;





/**
 * Initializes a new game.
 */
Game.prototype.newGame = function() {
    this.level = 0;
    this.scoreTracker.resetScore();
    this.scoreTracker.clearFail();
    // this.grid.trump.resetLives();
    this.setupLevel(null);
    RESOURCES.playSound("make_america_great");
    this.grid.start();
};


/**
 * Sets up the next level to be played
 *
 * @param {boolean} passed  :  whether or not the previous
 *                             level was passed.
 */
Game.prototype.setupLevel = function(passed) {
    if(passed) {
        RESOURCES.playSound(RESOURCES.getNextWinSound());
        this.scoreTracker.addToScore(this.level);

        if (this.scoreTracker.getScore() > 1500 && PLAYER_DATA.giveAchievement(1)) {
            GAME.popup("ACHIEVEMENT UNLOCKED: HIGH ENERGY");
        } else if (this.scoreTracker.getScore() > 100000 && PLAYER_DATA.giveAchievement(2)) {
            GAME.popup("ACHIEVEMENT UNLOCKED: MAKE AMERICA GREAT AGAIN");
        }

        this.scoreTracker.clearFail();
        this.level++;
    } else if (passed == false) {
        this.scoreTracker.incrementFail();
    }
    if(this.level == 0 && passed === false) {
        if (PLAYER_DATA.giveAchievement(0)) {
            GAME.popup("ACHIEVEMENT UNLOCKED: MEET THE WITCH");
            
        }
        this.grid.getTrump().toggleListener(false);
        CANVAS_MANAGER.uiCanvas.getContext().drawImage(RESOURCES.getImage("snake"), this.grid.getXCoord(), this.grid.getYCoord() - WIDTH * 0.05 *0.9, this.grid.getWidth(), this.grid.getHeight() + WIDTH *0.05*0.9);
        RESOURCES.playSound("snake_woman");
        setTimeout(function() {
            CANVAS_MANAGER.uiCanvas.clear();
            this.setupLevelPartDos();
        }.bind(this), 3000);
    } else
        this.setupLevelPartDos();
};

/**
 * 
 */
Game.prototype.setupLevelPartDos = function() {
    this.grid.populateLevel(this.level);
    this.grid.initializeLevel(this.level);

    if (this.level != 50) {
		//from 1st level to 50th level
		this.grid.populateLevel(this.level);
		this.grid.initializeLevel(this.level);
	} else {
		//VICTORY!
        this.grid.getTrump().toggleListener(false);
        setTimeout(function() {
            this.grid.end();
        }.bind(this), RESOURCES.getAnimation("explosion").length * 15 + 1000);
		if (PLAYER_DATA.getLoggedInState()) {
			this.logScore();
		}
		this.grid.getTrump().resetLives();
        VICTORY.setVisibility(true);
	}
};

/**
 * Adds the user's score to the database.
 */
Game.prototype.logScore = function() {
    //console.log("log score is commented out");
    
    var finalScore = this.scoreTracker.getScore();
    $.post("php/logscore.php", {score: finalScore, id: PLAYER_DATA.getId()});
    
};

/**
 * Changes the text of the achievement div when an achievement is earned.
 *
 * @param {String} text : the text to be displayed
 */
Game.prototype.popup = function(text){
    this.achievement.innerHTML = text;
    this.achievement.style.display = "block";
    setTimeout(function(){
        $("#achievement-popup").fadeOut("slow");
    }, 2000);
};
