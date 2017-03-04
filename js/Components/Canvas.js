
/**
 Creates a canvas and inserts it into the container div in index.html.
 */
function Canvas(id) {
    this.width = WIDTH;
    this.height = HEIGHT;
    this.drawables = [];
    this.canvas = document.createElement("canvas");

    this.canvas.style.position = "absolute";

    this.canvas.setAttribute('width', this.width);
    this.canvas.setAttribute('height', this.height);

    this.canvas.id = id;
    this.context = this.canvas.getContext("2d");
}


Canvas.prototype = {

    /**
     * Clears the canvas of all of its drawings.
     */
    clear: function() {
        this.context.clearRect(0, 0, this.width, this.height);
    },
	
	/**
	* Returns width.
	* @returns {number}
	*/
	getWidth: function() {
		return this.width;
	},

    /**
    * Returns height.
    * @returns {number}
    */
    getHeight: function() {
        return this.height;
    },
	
    /**
     * Return context.
     * @returns {CanvasRenderingContext2D}
     */
    getContext: function() {
        return this.context;
    },

    /**
     * Return canvas.
     * @returns {Element}
     */
    getCanvas: function () {
        return this.canvas;
    },


    /**
     Adds a drawable to the end of the drawables array.

     PARAM drawable: The drawable to be added.
     */
    insertDrawable: function(drawable) {
        this.drawables.push(drawable);

    },

    /**
     Calls the draw method on all the drawables in the
     drawables array, which draws them all to the context
     of this canvas.
     */
    draw: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (var i = 0; i < this.drawables.length; i++) {
            this.drawables[i].draw();
        }
    }

};