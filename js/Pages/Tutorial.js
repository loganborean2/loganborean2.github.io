/**
 * Creates a tutorial object.
 */
function Tutorial() {
	Page.call(this);

    this.page.id = "tutorial-page";
    this.page.className = "game";

    var width = WIDTH;
    var height = HEIGHT;

    this.canvas = document.createElement("canvas");

    this.canvas.style.position = "absolute";
    this.canvas.setAttribute('width', width);
    this.canvas.setAttribute('height', height);

    this.ctx = this.canvas.getContext("2d");
    this.firstRun = true;

    this.reset(width, height);

    this.page.appendChild(this.canvas);
}
//inheritance stuff
Tutorial.prototype = Object.create(Page.prototype);
Tutorial.prototype.constructor = Tutorial;


/**
 * Runs the tutorial.
 *
 * @param {number} width  : the width of the container
 * @param {number} height : the height of the container
 */
Tutorial.prototype.reset = function(width, height){
    var end = false;
    this.ctx.clearRect(0,0, width, height);
    this.drawArrow(width, height);
    var myThis = this;
    this.canvas.onmousedown = function() {
        myThis.ctx.clearRect(0,0, width, height);
        myThis.showTriangles(myThis.ctx, width, height);
        if(end){
            TUTORIAL.setVisibility(false);
            GAME.grid.levelFadeIn();
            myThis.firstRun = false;

        }
        end = true;
    };
};






/**
 * Sets a cookie once the tutorial on-boarding has been completed.
 * @param done boolean whether the tutorial has been completed
 * @param exdays the number of days until the cookie expires
 */
Tutorial.prototype.setCookie = function(done, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = "tutorialDone=" + done + "; " + expires;
};

/**
 * Determines whether a cookie exists, to determine whether
 * the tutorial should be run.
 */
Tutorial.prototype.checkCookie = function() {
 	return !!document.cookie;
};



/**
 * Draws the first step of the tutorial, involving an arrow from Trump
 * to the White House of the first level, as well as some text.
 */
Tutorial.prototype.drawArrow = function(width, height) {
    this.ctx.strokeStyle="#FFFFFF";
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(width / 2, height * 0.75);
    this.ctx.quadraticCurveTo(width * 0.75, height * 0.8, width / 2, height * 0.3);
    this.ctx.stroke();
    this.ctx.lineTo(width * 0.4, height * 0.4);
    this.ctx.stroke();
    this.ctx.moveTo(width / 2, height * 0.3);
    this.ctx.lineTo(width * 0.65, height * 0.4);
    this.ctx.stroke();
    this.ctx.font = (HEIGHT * 0.02) + "px Arial";
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.fillText("Get Trump to the WhiteHouse!", WIDTH * 0.12, HEIGHT * 0.6);
    this.ctx.fillText("...click to continue", WIDTH * 0.12, HEIGHT * 0.65);
};

/**
 * Draws the second step of the tutorial, involving triangles corresponding
 * to the areas that Trump is moved with.
 */
Tutorial.prototype.showTriangles = function(ctx, width, height) {
	ctx.font = (HEIGHT * 0.05) + "px Arial";
	ctx.globalAlpha=0.5;
	
	//UP triangle
	ctx.fillStyle = "#FF0";
	ctx.beginPath();
	ctx.moveTo(width * 0.1, height * 0.15);
	ctx.lineTo(width * 0.9, height * 0.15);
	ctx.lineTo(width * 0.5, height * 0.49);
	ctx.closePath();
	ctx.fill();
	ctx.fillStyle = "#000";
	ctx.fillText("UP", width * 0.43, height * 0.3);
	
	//LEFT triangle
	ctx.fillStyle = "#FF0";
	ctx.beginPath();
	ctx.moveTo(width * 0.08, height * 0.15);
	ctx.lineTo(width * 0.08, height * 0.83);
	ctx.lineTo(width * 0.49, height * 0.5);
	ctx.closePath();
	ctx.fill();
	ctx.fillStyle = "#000";
	ctx.fillText("LEFT", width * 0.15, height * 0.5);
	
	//RIGHT triangle
	ctx.fillStyle = "#FF0";
	ctx.beginPath();
	ctx.moveTo(width * 0.92, height * 0.15);
	ctx.lineTo(width * 0.92, height * 0.83);
	ctx.lineTo(width * 0.51, height * 0.5);
	ctx.closePath();
	ctx.fill();
	ctx.fillStyle = "#000";
	ctx.fillText("RIGHT", width * 0.57, height * 0.5);
	
	//DOWN triangle
	ctx.fillStyle = "#FF0";
	ctx.beginPath();
	ctx.moveTo(width * 0.1, height * 0.83);
	ctx.lineTo(width * 0.90, height * 0.83);
	ctx.lineTo(width * 0.5, height * 0.51);
	ctx.closePath();
	ctx.fill();
	ctx.fillStyle = "#000";
	ctx.fillText("DOWN", width * 0.36, height * 0.75);
	
	ctx.globalAlpha=1;
};