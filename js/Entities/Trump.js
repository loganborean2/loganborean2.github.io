/**
 * Donald Trump.
 *
 * @param {Grid} grid: Grid that Trump is on.
 * @param {number} column: Column of Trump.
 * @param {number} row: Row of Trump.
 * @param {Image} image: Image that represents Trump.
 * @param {Game} game: The game.
 */
function Trump(grid, column, row, image) {
    Entity.call(this, grid, column, row, image, false);
    var maxLives = 3;
    var lives = maxLives;
    var centerX;
    var centerY;
    var leftX;
    var rightX;
    var topY;
    var bottomY;
    var keySwitch = false;
    var xVel = 0;
    var yVel = 0;
    var vel = 0.6;
    var flyingVel = 0.02;
    var moving = false;
    var collided = false;
    var dead = false;
    var rotating = false;
    var rotation = 0;

    var frames = RESOURCES.getAnimation("rage");
    var frame = 0;
    var timer;

	/**
	 * Sets the timer to run Trump's animation.
	 */
    this.animate = function() {
        timer = setInterval(this.animation, 30);
    };

	/**
	 * Runs the animation of Trump.
	 */
    this.animation = function() {
        this.image = frames[frame];
        if(frames[++frame] == undefined) {
            frame = 0;
        }
    }.bind(this);

	/**
	 * Checks the state of Trump upon collision with another Entity, calling the methods
	 * for the needed effect.
	 */
    this.checkState = function () {
        var ctx = CANVAS_MANAGER.gameCanvas.getContext();
        
        if (moving && collided == false && grid.getSectionAt(this.column, this.row) != null) {
            if (grid.getSectionAt(this.column, this.row) instanceof Mine) {
                if (distanceBetween(
                        this.xCoord + (grid.getSectionWidth() / 2),
                        this.yCoord + (grid.getSectionHeight() / 2),
                        grid.getSectionAt(this.column, this.row).getXCoord() + grid.getSectionHeight(),
                        grid.getSectionAt(this.column, this.row).getYCoord() + grid.getSectionHeight()
                    ) <= grid.getSectionWidth() * 1.4) {
                    this.hitAMine();
                }
            } else if (grid.getSectionAt(this.column, this.row) instanceof WhiteHouse) {
                if (distanceBetween(
                        this.xCoord + (grid.getSectionWidth() / 2),
                        this.yCoord + (grid.getSectionHeight() / 2),
                        grid.getSectionAt(this.column, this.row).getXCoord(),
                        grid.getSectionAt(this.column, this.row).getYCoord()
                    ) <= grid.getSectionWidth() * 0.7
                    ||
                    distanceBetween(
                        this.xCoord + (grid.getSectionWidth() / 2),
                        this.yCoord + (grid.getSectionHeight() / 2),
                        grid.getSectionAt(this.column, this.row).getXCoord() + grid.getSectionHeight(),
                        grid.getSectionAt(this.column, this.row).getYCoord() + grid.getSectionHeight()
                    ) <= grid.getSectionWidth() * 0.7
                    ||
                    distanceBetween(
                        this.xCoord + (grid.getSectionWidth() / 2),
                        this.yCoord + (grid.getSectionHeight() / 2),
                        grid.getSectionAt(this.column, this.row).getXCoord() + grid.getSectionWidth(),
                        grid.getSectionAt(this.column, this.row).getYCoord() + grid.getSectionWidth()
                    ) <= grid.getSectionWidth() * 0.7
                    ||
                    distanceBetween(
                        this.xCoord + (grid.getSectionWidth() / 2),
                        this.yCoord + (grid.getSectionHeight() / 2),
                        grid.getSectionAt(this.column, this.row).getXCoord() + grid.getSectionWidth() + grid.getSectionHeight(),
                        grid.getSectionAt(this.column, this.row).getYCoord() + grid.getSectionWidth() + grid.getSectionHeight()
                    ) <= grid.getSectionWidth() * 0.7
                ) {
                    this.hitTheWhiteHouse();
                }
            } else if (grid.getSectionAt(this.column, this.row) instanceof Star) {
                RESOURCES.playSound("star");
                GAME.scoreTracker.giveScore(300);
            } else if (grid.getSectionAt(this.column, this.row) instanceof Certificate) {
                RESOURCES.playSound("certificate");
                GAME.scoreTracker.giveScore(400);
                
            } else if (grid.getSectionAt(this.column, this.row) instanceof SprayTan) {
                RESOURCES.playSound("spraytan");
                GAME.scoreTracker.giveScore(50);
            }
        }
    };

	/**
	 * Draws Trump on the game canvas, if the variable "visible" is true.
	 */
    this.drawEntity = function() {
        if (this.visible == true) {
            CANVAS_MANAGER.gameCanvas.getContext().drawImage(this.image,
                this.xCoord, this.yCoord, grid.getSectionWidth(), grid.getSectionHeight());

        }
    };
    
	/**
	 * @returns {number} the number of lives Trump has
	 */
    this.getLives = function() {
        return lives;
    };

	/**
	 * @returns {number} the distance between two x-y coordinates
	 */
    var distanceBetween = function (x1, y1, x2, y2) {
        return (Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)));
    };

	/**
	 * Carries out the effects of Trump hitting a mine.
	 */
    this.hitAMine = function () {
        dead = true;
        rotating = true;
        collided = true;
        RESOURCES.playSound("explosion");
        grid.getSectionAt(this.column, this.row).animate();
        lives--;
        setTimeout(function() {
            this.settleTrump();
            if (lives != 0) {
                GAME.setupLevel(false);
            } else {
                grid.end();
                if (PLAYER_DATA.getLoggedInState()) {
                    GAME.logScore();
                }
                this.resetLives();
                RESOURCES.playSound("neverbegreat");
                DEFEAT.setVisibility(true);
            }
        }.bind(this), RESOURCES.getAnimation("explosion").length * 15 + 1000);
    };

	/**
	 * Carries out the effects of Trump arriving at the White House.
	 */
    this.hitTheWhiteHouse = function () {
        collided = true;
        GAME.setupLevel(true);
    };

	/**
	 * Resets the number of Trump's lives to the maximum.
	 */
    this.resetLives = function () {
        lives = maxLives;
    };

	/**
	 * Updates Trump's position for the animation.
	 *
	 * @param {number} delta : how long the last frame lasts
	 */
    this.updateEntity = function(delta) {
        this.xCoord += xVel * delta;
        this.yCoord += yVel * delta;
        if(rotating) {
            rotation += 1 * delta;
        }
        if(moving) {
            if (dead) {
                if(xVel != 0) {
                    yVel = Math.random() / 10;
                    if (Math.random() - 0.05 >= 0) {
                        var vl = -yVel;
                        yVel = vl;
                    }
                    if (xVel > 0)
                        xVel = -flyingVel * delta;
                    else
                        xVel = flyingVel * delta;
                } else {
                    xVel = Math.random() / 10;
                    if (Math.random() - 0.05 >= 0) {
                        var vl = -xVel;
                        xVel = vl;
                    }
                    if (yVel >= 0)
                        yVel = -flyingVel * delta;
                    else
                        yVel = flyingVel * delta;
                }
                dead = false;
                this.animate();
            } else {
                this.checkState();
                if (xVel == -vel) {
                    if (this.xCoord <= this.column * grid.getSectionWidth() + grid.getXCoord()
                        && this.yCoord == this.row * grid.getSectionHeight() + grid.getYCoord()) {
                        this.settleTrump();
                    }
                } else if (xVel == vel) {
                    if (this.xCoord >= this.column * grid.getSectionWidth() + grid.getXCoord()
                        && this.yCoord == this.row * grid.getSectionHeight() + grid.getYCoord()) {
                        this.settleTrump();
                    }
                } else if (yVel == -vel) {
                    if (this.xCoord == this.column * grid.getSectionWidth() + grid.getXCoord()
                        && this.yCoord <= this.row * grid.getSectionHeight() + grid.getYCoord()) {
                        this.settleTrump();
                    }
                } else if (yVel == vel) {
                    if (this.xCoord == this.column * grid.getSectionWidth() + grid.getXCoord()
                        && this.yCoord >= this.row * grid.getSectionHeight() + grid.getYCoord()) {
                        this.settleTrump();
                    }
                }
            }
        }
    };

	/**
	 * Settles Trump's image to its initial state.
	 */
    this.settleTrump = function() {
        clearInterval(timer);
        this.image = RESOURCES.getImage("trump");
        rotating = false;
        moving = false;
        collided = false;
        rotation = 0;
        xVel = 0;
        yVel = 0;
        this.setCoords();
    };

    /**
     * Determines the coordinates needed to draw the X over
     * the grid.
     */
    this.setDimensions = function() {
        centerX = WIDTH / 2;
        centerY = HEIGHT / 2;
        leftX = grid.getXCoord();
        rightX = grid.getXCoord() + grid.getWidth();
        topY = grid.getYCoord();
        bottomY = grid.getYCoord() + grid.getHeight();
    };

    /**
     * Moves trump in the specified direction. (called by the mouse listener)
     *
     * @param {event} event
     */
    this.moveMe = function(event) {
        if(keySwitch && moving == false) {
            var code = event.keyCode ? event.keyCode : event.which;
            var x = event.pageX - CANVAS_MANAGER.uiCanvas.getCanvas().offsetLeft;
            var y = event.pageY - CANVAS_MANAGER.uiCanvas.getCanvas().offsetTop;
            if (code == 38 || this.isInside(grid.getXCoord(), grid.getYCoord(), centerX, centerY, rightX, grid.getXCoord(), x, y)) {
                //up
                if(this.row != 0) {
                    yVel = -vel;
                    this.row--;
                    moving = true;
                }
            } else if (code == 39 || this.isInside(rightX, grid.getYCoord(), centerX, centerY, rightX, bottomY, x, y)) {
                //right
                if(this.column != grid.getColumns() - 1) {
                    xVel = vel;
                    this.column++;
                    moving = true;
                }
            } else if (code == 40 || this.isInside(rightX, bottomY, centerX, centerY, grid.getXCoord(), bottomY, x, y)) {
                //down
                if(this.row != grid.getRows() - 1) {
                    yVel = vel;
                    this.row++;
                    moving = true;
                }
            } else if (code == 37 || this.isInside(grid.getXCoord(), grid.getYCoord(), centerX, centerY, grid.getXCoord(), bottomY, x, y)) {
                //left
                if(this.column != 0) {
                    xVel = -vel;
                    this.column--;
                    moving = true;
                }
            }
        }
    }.bind(this);


    /**
     * Draws the movement X.
     */
    this.drawMovementX = function() {
        this.setDimensions();
        /*
         var context = CANVAS_MANAGER.uiCanvas.getContext();
         context.beginPath();
         context.fillStyle = "#FFF";
         context.moveTo(xCoord, yCoord);
         context.lineTo(centerX, centerY);
         context.lineTo(rightX, yCoord);
         context.closePath();
         context.stroke();

         context.beginPath();
         context.moveTo(centerX, centerY);
         context.lineTo(rightX, bottomY);
         context.closePath();
         context.stroke();

         context.beginPath();
         context.moveTo(centerX, centerY);
         context.lineTo(xCoord, bottomY);
         context.closePath();
         context.stroke();

         */
    };

    /**
     * Turns the listeners for arrow keys presses and movement X
     * off so the user canot move trump.
     *
     * @param switcher
     */
    this.toggleListener = function (switcher) {
        keySwitch = switcher;
    };

    /**
     * checks whether point P(x, y) lies inside the triangle formed
     * by A(x1, y1), B(x2, y2) and C(x3, y3)
     *
     * @param x1  :  x coordinate of the first triangle point
     * @param y1  :  y coordinate of the first triangle point
     * @param x2  :  x coordinate of the second triangle point
     * @param y2  :  y coordinate of the second triangle point
     * @param x3  :  x coordinate of the third triangle point
     * @param y3  :  y coordinate of the third triangle point
     * @param x   :  x coordinate of the clicked point
     * @param y   :  y coordinate of the clicked point
     * @returns {boolean}  :  whether the clicked point is inside the triangle
     */
    this.isInside = function (x1, y1, x2, y2, x3, y3, x, y) {
        x1 += WINDOW_WIDTH;
        x2 += WINDOW_WIDTH;
        x3 += WINDOW_WIDTH;

        // Calculate area of triangle ABC
        var A = area(x1, y1, x2, y2, x3, y3);

        // Calculate area of triangle PBC
        var A1 = area(x, y, x2, y2, x3, y3);

        // Calculate area of triangle PAC
        var A2 = area(x1, y1, x, y, x3, y3);

        // Calculate area of triangle PAB
        var A3 = area(x1, y1, x2, y2, x, y);

        // Check if sum of A1, A2 and A3 is same as A
        return (A < (A1 + A2 + A3 + 1) && A > (A1 + A2 + A3 - 1));
    };

    /**
     * Calculates the area of a triangle specified by 3 points.
     *
     * @param x1  :  x coordinate of the first triangle point
     * @param y1  :  y coordinate of the first triangle point
     * @param x2  :  x coordinate of the second triangle point
     * @param y2  :  y coordinate of the second triangle point
     * @param x3  :  x coordinate of the third triangle point
     * @param y3  :  y coordinate of the third triangle point
     * @returns {number}  :  the area of the triangle
     */
    var area = function (x1, y1, x2, y2, x3, y3) {
        return Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2.0);
    };

    /**
     * Sets Trump's lives to the maximum amount of lives.
     */
    this.resetLives = function() {
        lives = maxLives;
    };

    window.onkeydown = this.moveMe;
    CANVAS_MANAGER.uiCanvas.getCanvas().addEventListener("click", this.moveMe, false);
}

//inheritance stuff
Trump.prototype = Object.create(Entity.prototype);
Trump.prototype.constructor = Trump;
