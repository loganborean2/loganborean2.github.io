/**
 * Holds entity objects and draws them onto a canvas
 * in the form of a grid. Entity objects include Donald
 * Trump, mines, and the whitehouse.
 *
 * @param {Canvas} canvas to paint grid to.
 */
function Grid() {
	/**
	 * An array of strings that represent levels
	 *
	 * The strings currently are set for a 5 x 7 grid
	 *
	 * 'x' denotes an empty cell
	 * '*' denotes a mine
	 * 'w' denotes the white house
	 * 't' denotes trump
	 *
	 * @type {string[]}
	 */
	var levels = [
		["xxwxx", "xxx*x", "xxxxx", "x*xxx", "xxxxx", "xxxxx", "xtxxx"],
		["*xxxx", "wx*xx", "*xxxx", "xxx*x", "xxxxx", "xxxxt", "xxxxx"],
		["xxxxx", "xw*xx", "x*xxx", "xxxxx", "xx*xx", "x*t*x", "xxxxx"],
		["xwxxx", "****x", "xxxxx", "x****", "xxxxx", "****x", "xtxxx"],
		["*wxxx", "x**xx", "xxxx*", "**xx*", "xxx*x", "txxxx", "xxxxx"],
		["xxxxx", "x*w**", "xx*x*", "xxxx*", "***xx", "*txxx", "xxxxx"],
		["x*wxx", "x***x", "xxxxx", "*xx**", "xxx*x", "xx*tx", "xxxxx"],
		["xw**x", "xxx*x", "**xxx", "xx*xx", "xxxxx", "x****", "xxxtx"],
		["*xxxw", "xx**x", "*xxx*", "x*x*x", "xxxx*", "*x*xx", "xxxxt"],
		["*xxx*", "xx*xx", "xxw*x", "x**xx", "x*t*x", "*xx*x", "xxxxx"],

		["xxtxx", "xxxxx", "xx*xx", "*x*x*", "xx*xx", "x*x*x", "px*xw"],
		["*xxxx", "xxx*x", "x**wx", "xxt**", "xxx*p", "x*xxx", "xxxx*"],
		["xx*wx", "xxxx*", "xxx*x", "**xxx", "xxxxx", "x***x", "xtxxx"],
		["*xxw*", "s*xxx", "xx*xx", "*x*x*", "xx*xx", "x*xxx", "xxxxt"],
		["**xwx", "cxx*x", "x*xxx", "xxxxx", "*x*xx", "xxxxx", "txx*x"],
		["wx*xx", "*x*x*", "xxxxx", "xx*xx", "**t*x", "xxxxx", "x*x*x"],
		["xxtxx", "x***x", "*xxxx", "xxxxx", "x**xx", "xx*xx", "*xw*p"],
		["sx*xw", "xx*xx", "*xxx*", "x*xxx", "xx*xx", "xxx*x", "t*xxx"],
		["*x*x*", "xxxxx", "x*x*x", "x*x*x", "x*c*x", "xx*wx", "*xt*x"],
		["xtx*x", "x*xxx", "xxx*x", "*xxx*", "xx*xx", "x***x", "xxwxx"],
		["x*xxx", "x*x*w", "xxx*x", "*xxx*", "t*xxx", "x*x*x", "xxx*x"],
		["wx**p", "xxx*x", "*xxxx", "*x*x*", "xxxxx", "xxx*x", "x*xxt"],
		["xxxx*", "*x*xx", "xx*xw", "x****", "xxx*t", "**xxx", "sxxx*"],
		["t*xxx", "x*x*x", "xxx*p", "*xxx*", "c*xxx", "x*x*x", "xxx*w"],
		["*xw*x", "xx*xx", "x**xx", "xx**t", "*x*xx", "xx*xx", "*xxx*"],
		["txxxx", "*xx*x", "xxxxx", "x**x*", "xxxxx", "xxx*x", "*xxxw"],
		["xxxxx", "*x*x*", "xxxxx", "x*w*x", "xx*xx", "*xxx*", "txxxx"],
		["*xwx*", "*x*x*", "xxxxx", "x***x", "xx*xx", "*x*x*", "*xtx*"],
		["xtxx*", "***xx", "s*xx*", "xxxxx", "x*x*x", "xx***", "*xxwx"],
		["w*xxx", "xxx*x", "x***x", "xx*xx", "*x*x*", "xx*xx", "c*xxt"],
		["wxx**", "x*xxx", "***xx", "xxxx*", "x***x", "x***x", "xxtxx"],
		["x*xtx", "xxxx*", "*x*xx", "*xxxx", "xx*xx", "x*w*x", "xxxx*"],
		["xxxxw", "p*xx*", "*t*xx", "xxx*x", "x*x*x", "c*x*x", "*xxxx"],
		["w*xxx", "xx*xx", "*xxxx", "xxx**", "x*xxx", "*x*xx", "txxx*"],
		["*xxx*", "xw*xx", "**xxx", "xxxx*", "*x***", "xx*tx", "*xxx*"],
		["xxx*x", "w*xx*", "*t*xx", "xxx*x", "*xx*x", "x*xxx", "*xx*x"],

		["pxxwxx", "*x***x", "xx*xxx", "*xxxx*", "***xxx", "xxxxxx", "x***xx", "xxtx**"],
		["txxxxx", "xx*xx*", "xxx*xs", "xxxx*x", "x*xxx*", "xx*xxx", "xxx*xx", "*xxp*w"],
		["x*xxx*", "xxx*xs", "x*****", "xxxxxx", "x*xx*x", "wxx**t", "x*xx*x", "x**xxx"],
		["*xwxxx", "c*xxxx", "xx**xx", "*xx*xx", "x*x*x*", "xxx*xx", "xx*xxx", "xxtxxx"],
		["*xxx*s", "xx*xxx", "*xxxx*", "xxt**x", "xx*wxx", "x*xxx*", "xxx*xx", "x*xxx*"],
		["xwxx**", "**xxxx", "**x**x", "xxx**x", "**xxxx", "**x**x", "xxx**x", "**xxtx"],
		["cx*xxw", "*x*x*x", "xx*xxx", "x*xxx*", "xx**xx", "*x*p*x", "xxxxxx", "txx**x"],

		["px*xxx", "*x*x*w", "xxxx**", "xxxxxx", "****xx", "***xx*", "**xx**", "*txxxx"],
		["x*x*s*", "x*x*xx", "x*xx*x", "xxtxxx", "x***xx", "xxxxxx", "**x***", "xxxxwx"],
		["w**xxc", "x*xx*x", "xxx*xx", "*xxxx*", "*x**x*", "xxxxxx", "x*xx*x", "x*tx*p"],
		["sx*xxx", "*xxx*x", "xxx*wx", "xt*xxx", "x*xxx*", "xxxx*x", "xxx*xx", "xx*xxx"],
		["*xs*tx", "*x*x*x", "xxx*xx", "xx*xxx", "x*xxx*", "xxxx*x", "xxw*xx", "xx*xxx"],
		["xxxtx*", "*x***c", "xxx**x", "*xxx*x", "**xxxx", "xxx**x", "xxx**x", "*wxxxx"],
		["xxxw**", "xxx***", "**xxx*", "xxxxx*", "xx****", "xxxxx*", "***xxx", "txxxxx"]
	];

	var fenceWidth;
	var fenceDepth;
	var fenceHeight;


	var trump = new Trump(this, 0, 0, RESOURCES.getImage("trump"));
	var whitehouse = new WhiteHouse(this, 0, 0, RESOURCES.getImage("whitehouse"));
	var mines = [];
	var sprays = [];
	var certs = [];
	var stars = [];

	var mostMines = 0;
	var mostSprays = 0;
	var mostCerts = 0;
	var mostStars = 0;
	var mineCount = 0;
	var sprayCount = 0;
	var certCount = 0;
	var starCount = 0;

	var columns = 5;
	var rows = 7;
	var perc = 0.7;
	var width;
	var height;
	var xCoord;
	var yCoord;
	var entities;
	var sectionWidth;
	var sectionHeight;

	var lastFrameTimeMs = 0,
		delta = 0,
		fps = 60,
		lastFpsUpdate = 0,
		framesThisSecond = 0,
		timestep = 1000 / 60,  //time for one step
		frameID = 0,
		maxFPS = 60,
		started = false,
		running = false;

	var getMine = function(column, row) {
		return mines[mineCount++];
	};

	var getSpray = function(column, row) {
		return sprays[sprayCount++];
	};

	var getCert = function(column, row) {
		return certs[certCount++];
	};

	var getStar = function(column, row) {
		return stars[starCount++];
	};
	
	this.getTrump = function() {
		return trump;
	};

	this.end = function() {
		console.log("why");
		trump.settleTrump();
		trump.toggleListener(false);
		this.clearGrid();
		this.stop();
	};

	/**
	 * Read the specified level string and returns
	 * an array of objects to be displayed on the grid for the level.
	 *
	 * @param {Grid} grid         :  the grid that will be given to the trump object
	 * @param {number} level_num  :  level_num
	 * @returns {Array}           :  The array of objects to be displayed.
	 */
	this.readLevel = function(levelNum) {
		mineCount = certCount = starCount = sprayCount = 0;
		var level = [];
		for (var i = 0; i < levels[levelNum].length; i++) {
			level[i] = [];
			for (var j = 0; j < levels[levelNum][i].length; j++) {
				var ch = levels[levelNum][i].charAt(j);
				if (ch == 'x') {
					level[i][j] = null;
				} else if (ch == 'w') {
					level[i][j] = whitehouse;
				} else if (ch == 't') {
					level[i][j] = trump;
				} else if (ch == '*') {
					level[i][j] = getMine();
				} else if (ch == 'p') {
					level[i][j] = getSpray();
				} else if (ch == 's') {
					level[i][j] = getStar();
				} else if (ch == 'c') {
					level[i][j] = getCert();
				} else {
					alert("There was a problem");
				}
				if(level[i][j] != null) {
					level[i][j].setColumn(j);
					level[i][j].setRow(i);
				}
			}
		}
		entities = level;
	};

	/**
	 * Sets all entity references in the grid's array to null
	 * in order to clear the grid of any entities.
	 */
	this.clearGrid = function() {
		for(var i = 0; i < entities.length; i++) {
			for(var j = 0; j < entities.length[0]; j++) {
				entities[i][j] = null;
			}
		}
	};

	/**
	 * Returns the entity at a certain column and row.
	 *
	 * @param {number} column : the column that the entity is in
	 * @param {number} row    : the column that the entity is in
	 */
	this.getSectionAt = function(column, row){
		return entities[row][column];
	};

	/**
	 * Sets an entity in a specific section of the grid.
	 *
	 * @param {number} column : the column of the section the entity is to be placed in
	 * @param {number} row    : the row of the section the entity is to be placed in
	 * @param {Entity} entity : the entity to be placed on the grid
	 */
	this.setSectionAt = function(column, row, entity) {
		entities[row][column] = entity;
	};

	/**
	 * Determines the coordinates needed to draw the grid.
	 */
	this.setDimensions = function() {
		fenceWidth = WIDTH * 0.05;
		fenceDepth = fenceWidth * 0.9;
		fenceHeight = fenceWidth * 2 + fenceDepth + height;
		width = WIDTH * perc;
		height = width * rows / columns;
		if(height > HEIGHT - 125) {
			height = HEIGHT - 125;
			width = height * columns / rows;
		}
		xCoord = (WIDTH / 2) - (width / 2);
		yCoord = (HEIGHT / 2) - (height / 2);
		sectionWidth = width / columns;
		sectionHeight = height / rows;
		trump.setDimensions();
	};

	/**
	 * Sets the contents of the grid.
	 *
	 * @param {number} level : the number of the level to be drawn on the grid
	 */
	this.populateLevel = function(level) {
		this.readLevel(level);
		rows = entities.length;
		columns = entities[0].length;
		this.setDimensions();
		this.drawGrass();
	};

	/**
	 * Initializes the level, calling the tutorial if it's the first level (i.e. level 0)
	 * and the tutorial hasn't run before.
	 *
	 * @param {number} level : the number of the level to be initialized
	 */
	this.initializeLevel = function(level) {
		trump.toggleListener(false);
        initialVisibility();
		if(level == 0 && (TUTORIAL.checkCookie() == false && TUTORIAL.firstRun == true)){
            trump.setVisibility(true);
            whitehouse.setVisibility(true);
		    TUTORIAL.setVisibility(true);
			TUTORIAL.setCookie(true,365);
		}
		else {
			this.levelFadeIn();
		}
	};

	/**
	 * Carries out the fading of the mines and other elements while showing Trump
	 * and the White House, by calling the appropriate methods at a certain time
	 * interval.
	 */
	this.levelFadeIn = function(){
		initialVisibility();
		setTimeout(function() {
			trump.toggleListener(true);
			ingameVisibility();
		}.bind(this), 2000);
	};

	/**
	 * Sets the visibility property of the mines to the visible
	 * parameter and Trump and the WhiteHouse to the opposite
	 * of the visible parameter.
	 *
	 * @param {boolean} visible Used to set visibility property of entities.
	 */
	var initialVisibility = function() {
		for(var i = 0; i < entities.length; i++) {
			for(var j = 0; j < entities[0].length; j++) {
				if(entities[i][j] != null) {
					entities[i][j].setCoords();
					if(entities[i][j] instanceof Trump || entities[i][j] instanceof WhiteHouse) {
						entities[i][j].setVisibility(false);
					} else {
						entities[i][j].setVisibility(true);
					}
				}
			}
		}
	};

	/**
	 * Sets the in-game visibility of Trump, the White House, and other elements.
	 *
	 * @param {boolean} visibility
	 */
	var ingameVisibility = function(visibility) {
		for(var i = 0; i < entities.length; i++) {
			for(var j = 0; j < entities[0].length; j++) {
				if(entities[i][j] != null) {
					entities[i][j].setCoords();
					if(entities[i][j] instanceof Trump || entities[i][j] instanceof WhiteHouse) {
						entities[i][j].setVisibility(true);
					} else {
						entities[i][j].setVisibility(false);
					}
				}
			}
		}
	};

	/**
	 * Updates the x-y coordinates of each entity on the canvas.
	 */
	this.updateGrid = function() {
		for(var i = 0; i < rows; i++) {
			for(var j = 0; j < columns; j++) {
				if(entities[i][j] != null) {
					entities[i][j].setCoords();
				}
			}
		}
	};

	/**
	 * Draws the elements of the grid.
	 */
	this.draw = function() {
		for(var i = 0; i < rows; i++) {
			for (var j = 0; j < columns; j++) {
				if (entities[i][j] != null) {
					entities[i][j].draw();
				}
			}
		}
	};

	/**
	 * Draws the grass.
	 */
	this.drawGrass = function() {
		CANVAS_MANAGER.backgroundCanvas.getContext().fillStyle = "#5DCB3A";
		CANVAS_MANAGER.backgroundCanvas.getContext().fillRect(0, 0, WIDTH, HEIGHT);
		var grass = false;
		var xOffset = xCoord;
		var yOffset = yCoord;
		for(var i = 0; i < rows; i++) {
			for(var j = 0; j < columns; j++) {
				if(grass) {
					CANVAS_MANAGER.gameCanvas.getContext().drawImage(
						RESOURCES.getImage("grass1"), xOffset, yOffset - 15, sectionWidth, sectionHeight + 15);

					grass = false;
					//CANVAS_MANAGER.backgroundCanvas.getContext().fillStyle = "#3CBF13";
				}
				else {
					CANVAS_MANAGER.gameCanvas.getContext().drawImage(
						RESOURCES.getImage("grass2"), xOffset, yOffset - 15, sectionWidth, sectionHeight + 15);
					grass = true;
					//CANVAS_MANAGER.backgroundCanvas.getContext().fillStyle = "#2A9708";
				}
				//CANVAS_MANAGER.backgroundCanvas.getContext().fillRect(xOffset, yOffset, sectionWidth, sectionHeight);
				xOffset += sectionWidth;
			}
			xOffset = xCoord;
			yOffset += sectionHeight;
		}
		var context = CANVAS_MANAGER.gameCanvas.getContext();
		context.globalAlpha = 0.3;
		context.fillRect(xCoord, yCoord-10, width, fenceDepth);
		context.globalAlpha = 1;
	};

	/**
	 * Returns the number of columns.
	 *
	 * @returns {number} number of columns.
	 */
	this.getColumns = function() {
		return columns;
	};

	/**
	 * Returns the number of rows.
	 *
	 * @returns {number} number of rows.
	 */
	this.getRows = function() {
		return rows;
	};

	/**
	 * Returns the width of the grid.
	 *
	 * @returns {number} The width of the grid.
	 */
	this.getWidth = function() {
		return width;
	};

	/**
	 * Returns the height of the grid.
	 *
	 * @returns {number} The height of the grid.
	 */
	this.getHeight = function() {
		return height;
	};

	/**
	 * Returns the x coordinate of the grid.
	 *
	 * @returns {number} The x coordinate of the grid.
	 */
	this.getXCoord = function() {
		return xCoord;
	};

	/**
	 * Returns the y coordinate of the grid.
	 *
	 * @returns {number} The y coordinate of the grid.
	 */
	this.getYCoord = function() {
		return yCoord;
	};

	/**
	 * @returns {number} sectionWidth Width of individual grid section.
	 */
	this.getSectionWidth = function() {
		return sectionWidth;
	};

	/**
	 * @returns {number} sectionHeight Width of individual grid section.
	 */
	this.getSectionHeight = function() {
		return sectionHeight;
	};

	/**
	 * Updates game based on elapsed time
	 */
	var update = function(delta) {
		for(var i = 0; i < entities.length; i++) {
			for(var j = 0; j < entities[0].length; j++) {
				if(entities[i][j] != null) {
					entities[i][j].updateEntity(delta);
				}
			}
		}
	};

	/**
	 * Throttles the game when we updating too frequently
	 */
	var panic = function() {

	};

	this.drawFence = function() {
		var context = CANVAS_MANAGER.gameCanvas.getContext();


		context.fillStyle = "#92ac93";
		context.fillRect(xCoord - fenceWidth, yCoord - fenceWidth - fenceDepth, fenceWidth,  fenceHeight);
		context.fillRect(xCoord + width, yCoord - fenceWidth - fenceDepth, fenceWidth, fenceHeight);
		context.fillRect(xCoord - 1, yCoord - fenceWidth - fenceDepth, width + 2, fenceWidth);

		/*the thing*/context.fillRect(xCoord - 1, yCoord + height, width + 2, fenceWidth);
		context.fillStyle = "#374837";
		context.fillRect(xCoord - fenceWidth, yCoord + height + fenceWidth, width + fenceWidth * 2, fenceDepth);
		context.fillRect(xCoord, yCoord - fenceDepth, width, fenceDepth);
		context.globalAlpha = 0.3;
		context.fillRect(xCoord - fenceWidth, yCoord + height + fenceWidth + fenceDepth, width + fenceWidth *2, fenceDepth);
		context.globalAlpha = 1;
	};


	/**
	 * Renders the game display
	 */
	this.render = function(interpolatedTime) {
		if(running) {

			CANVAS_MANAGER.gameCanvas.clear();
			this.drawFence();
			this.drawGrass();
			for (var i = 0; i < entities.length; i++) {
				for (var j = 0; j < entities[0].length; j++) {
					if (entities[i][j] != null) {
						entities[i][j].drawEntity();
					}
				}
			}
			GAME.scoreTracker.draw();
		}
	};
	/**
	 * Starts animation
	 */
	this.start = function() {
		if (!started) {
			started = true;
			// Your code to render the initial state goes here
			frameID = requestAnimationFrame(function(timestamp) {
				this.render(1);
				running = true;
				lastFrameTimeMs = timestamp;
				lastFpsUpdate = timestamp;
				framesThisSecond = 0;
				frameID = requestAnimationFrame(mainGameLoop);
			}.bind(this));
		}
	};

	/**
	 * Stops animation
	 */
	this.stop = function() {
		running = false;
		started = false;
		cancelAnimationFrame(frameID);
	};

	/**
	 * Sample game loop
	 */
	var mainGameLoop = function(timestamp) {
		// Throttle the frame rate.
		if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
			frameID = requestAnimationFrame(mainGameLoop);
			return;
		}
		delta += timestamp - lastFrameTimeMs;
		lastFrameTimeMs = timestamp;

		if (timestamp > lastFpsUpdate + 1000) {
			fps = 0.25 * framesThisSecond + 0.75 * fps;

			lastFpsUpdate = timestamp;
			framesThisSecond = 0;
		}
		framesThisSecond++;

		var numUpdateSteps = 0;

		while (delta >= timestep) {

			update(timestep);

			delta -= timestep;
			if (++numUpdateSteps >= 240) {
				panic();
				break;
			}
		}

		this.render(delta / timestep);

		frameID = requestAnimationFrame(mainGameLoop);
	}.bind(this);

	this.createEntityPool = function() {
		for(var i = 0; i < levels.length; i++) {
			mineCount = 0;
			sprayCount = 0;
			certCount = 0;
			starCount = 0;
			for(var j = 0; j < levels[i].length; j++) {
				for(var k = 0; k < levels[i][j].length; k++) {
					if(levels[i][j][k] == '*') {
						mineCount++;
					} else if(levels[i][j][k] == 'p') {
						sprayCount++;
					} else if(levels[i][j][k] == 'c') {
						certCount++;
					} else if(levels[i][j][k] == 's') {
						starCount++;
					}
				}
			}
			if(mineCount > mostMines)
				mostMines = mineCount;
			if(sprayCount > mostSprays)
				mostSprays = sprayCount;
			if(certCount > mostCerts)
				mostCerts = certCount;
			if(starCount > mostStars)
				mostStars = starCount;
		}
		mineCount = sprayCount = certCount = starCount = 0;

		for(i = 0; i < mostMines; i++)
			mines[i] = new Mine(this, 0, 0, RESOURCES.getImage("mine"));
		for(i = 0; i < mostSprays; i++)
			sprays[i] = new SprayTan(this, 0, 0, RESOURCES.getImage("spraytan"));
		for(i = 0; i < mostCerts; i++)
			certs[i] = new Certificate(this, 0, 0, RESOURCES.getImage("certificate"));
		for(i = 0; i < mostStars; i++)
			stars[i] = new Star(this, 0, 0, RESOURCES.getImage("star"));
	};
	this.createEntityPool();
}
