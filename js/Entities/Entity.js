/**
 * Entity is a super class for Mines, Trump, and the WhiteHouse.
 *
 * @param {Grid} _grid: Grid the entity is on.
 * @param {number} _column: Column of the entity.
 * @param {number} _row: Row of the entity.
 * @param {Image} _image: Image that represents the entity.
 */
function Entity(_grid, _column, _row, _image, _visible) {
	var grid = _grid;
	this.column = _column;
	this.row = _row;
	this.image = _image;
	this.visible = _visible;
	this.xCoord = 0;
	this.yCoord = 0;

	/**
	 * Draws the image that represents the entity.
	 */
	this.drawEntity = function() {
		if (this.visible == true) {
			CANVAS_MANAGER.gameCanvas.getContext().drawImage(this.image
				, this.xCoord, this.yCoord, grid.getSectionWidth(), grid.getSectionHeight());
		}
	};

	/**
	 * Updates an entity's coordinates on the grid.
	 */
	this.updateEntity = function(delta) {
		this.setCoords();
	};

	/**
	 * Sets the x-y dimensions of the Entity on the grid, depending on
	 * the size of the grid's sections.
	 */
	this.setDimensions = function() {
		this.width = grid.getSectionWidth();
		this.height = grid.getSectionHeight();
	};

	/**
	 * Sets the visibility property of this Fadable.
	 *
	 * @param visibility
	 */
	this.setVisibility = function(visibility) {
		this.visible = visibility;
	};

	/**
	 * @returns {number} row: Trump's row.
	 */
	this.getRow = function() {
		return this.row;
	};

	/**
	 * @returns {number} column: Trump's column.
	 */
	this.getColumn = function() {
		return this.column;
	};

	/**
	 * Sets the column of the Entity.
	 *
	 * @param {number} _column : the column the entity is to be placed in
	 */
	this.setColumn = function(_column) {
		this.column = _column;
	};

	/**
	 * Sets the row of the Entity.
	 *
	 * @param {number} _row : the row the entity is to be placed in
	 */
	this.setRow = function(_row) {
		this.row = _row;
	};

	/**
	 * @returns {number} the x coordinate of the Entity
	 */
	this.getXCoord = function() {
		return this.xCoord;
	};

	/**
	 * @returns {number} the y coordinate of the Entity
	 */
	this.getYCoord = function() {
		return this.yCoord;
	};

	/**
	 * Sets the Entity's coordinates according to the current column value,
	 * the size of a grid's section, and the coordinates of the Entity's
	 * grid section.
	 */
	this.setCoords = function() {
		this.xCoord = this.column * grid.getSectionWidth() + grid.getXCoord();
		this.yCoord = this.row * grid.getSectionHeight() + grid.getYCoord();
	};
};