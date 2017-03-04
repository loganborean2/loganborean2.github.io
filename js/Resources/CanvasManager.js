/**
 * A canvas manager that generates all the necessary canvases.
 * Object that contains all the canvases to draw to.
 */
function CanvasManager() {
    this.orientCanvas = new Canvas();
    this.backgroundCanvas = new Canvas();
    this.gameCanvas = new Canvas("canvas-game");
    this.uiCanvas =  new Canvas("canvas-ui");
    
}