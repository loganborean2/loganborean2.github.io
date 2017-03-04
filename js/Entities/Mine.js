/**
 * Entity object that can be made invisible.
 *
 * @param {Grid} grid: Grid the entity is on.
 * @param {number} column: Column of the entity.
 * @param {number} row: Row of the entity.
 * @param {Image} image: Image that represents the entity.
 */
function Mine(grid, column, row, image) {
	Entity.call(this, grid, column, row, image, true);

	var frames = RESOURCES.getAnimation("explosion");
	var frame = 0;
	var timer;
	var animationOngoing = false;

	/**
	 * Activates animation of the mine.
	 */
	this.animate = function() {
		timer = setInterval(this.animation, 45);
		animationOngoing = true;
	};

	/**
	 * Draws the mine taking into account whether it's being animated.
	 */
	this.drawEntity = function () {
		if (this.visible == true) {
			if(animationOngoing) {
				CANVAS_MANAGER.gameCanvas.getContext().drawImage(this.image
					, this.xCoord - grid.getSectionWidth() * 0.5, this.yCoord - grid.getSectionHeight() - 7,
					grid.getSectionWidth() * 2, grid.getSectionHeight() * 1.7);
			} else {
				CANVAS_MANAGER.gameCanvas.getContext().drawImage(this.image
					, this.xCoord, this.yCoord - 7, grid.getSectionWidth(), grid.getSectionHeight());
			}
		}
	};

	/**
	 * Runs the animation of the mine.
	 */
	this.animation = function() {
		this.image = frames[frame];
		this.visible = true;
		if(frames[++frame] == undefined) {
			clearInterval(timer);
			animationOngoing = false;
			this.visible = false;
			this.image = RESOURCES.getImage("mine");
			frame = 0;
		}
	}.bind(this);
}

//inheritance stuff
Mine.prototype = Object.create(Entity.prototype);
Mine.prototype.constructor = Mine;