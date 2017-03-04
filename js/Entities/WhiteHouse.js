/**
 * WhiteHouse.
 *
 * @param {Grid} grid: Grid the WhiteHouse is on.
 * @param {number} column: Column of the WhiteHouse.
 * @param {number} row: Row of the WhiteHouse.
 * @param {Image} image: Image that represents the WhiteHouse.
 */
function WhiteHouse(grid, column, row, image) {
	Entity.call(this, grid, column, row, image, false);

	this.drawEntity = function() {
		if (this.visible == true) {
			CANVAS_MANAGER.gameCanvas.getContext().drawImage(this.image
				, this.xCoord, this.yCoord - grid.getSectionHeight() *0.25, grid.getSectionWidth(), grid.getSectionHeight());
		}
	}
}

//inheritance stuff
WhiteHouse.prototype = Object.create(Entity.prototype);
WhiteHouse.prototype.constructor = WhiteHouse;