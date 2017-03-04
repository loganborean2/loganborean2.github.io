
function ScoringSystem(canvas) {
    this.score = 0;
    this.factor = 0;
    
    
    this.canvas = canvas;
    this.ctx = this.canvas.getContext();
    this.fail = 0;
    
    this.fontSize = 40;
    
    var perc = 0.7;
    var width = WIDTH * perc;
    var height = width * 7 / 5;
    if(height > HEIGHT * perc) {
        height = HEIGHT * perc;
        width = height * 5 / 7;
    }
    var xCoord = (WIDTH / 2) - (width / 2);
    var yCoord = (HEIGHT / 2) + (height / 2) + this.fontSize;
    
    var failFactor = new Array();
    failFactor[0] = 1;
    failFactor[1] = 0.6;
    failFactor[2] = 0.4;

    this.draw = function() {
        /*
        var totalHeight = GAME.grid.getYCoord() - WIDTH * 0.05 - WIDTH * 0.05 * 0.7;
        var height = totalHeight * 0.5;
        var width = GAME.grid.getWidth() + WIDTH * 0.05 * 2;
        var xCoord = GAME.grid.getXCoord() - WIDTH * 0.05;
        var yCoord = totalHeight / 2 - height / 2;
        var textX = GAME.grid.getXCoord();
        var textHeight = HEIGHT * 0.05;
        this.ctx.fillStyle = "#FFF";
        console.log(xCoord, yCoord, width, height);
        this.ctx.fillRect(xCoord, yCoord, width, height);
        this.ctx.fillStyle = "#ffcc99";
        this.ctx.strokeStyle = "#000";*/
        this.ctx.font = (HEIGHT * 0.05) + "px Century Gothic";
        this.ctx.fillText(this.score, GAME.grid.getXCoord(), 35);
        //this.ctx.strokeText(this.score, 30, 75);

        var place = GAME.grid.getXCoord() + GAME.grid.getWidth() - 140;

        //this.ctx.font = (13) + "px Arial";
        //this.ctx.fillText("Lives: ", place - 55, 73);

        for (var i = GAME.grid.getTrump().getLives(); i > 0; i--) {
            // this.ctx.fillStyle = "#CCC";
            // this.ctx.fillRect((place += 35), 50, 30, 30);
            this.ctx.drawImage(RESOURCES.getImage("trump"), (place += 35), 10, 30, 30);
        }


    };
    
    this.clearFail = function() {
        this.fail = 0;
    };
    
    this.incrementFail = function() {
        (this.fail)++;
    };
    
    this.setFactor = function(factor) {
        this.factor = factor;
    };
    
    this.resetScore = function() {
        this.score = 0;
        
    };
    
    this.addToScore = function(level) {
        this.score += ((level + 1) * 100) * failFactor[this.fail] ;
        
    };
    
    this.giveScore = function(amount) {
        console.log("giving " + amount);
        this.score = this.score + amount;
    };
    
    this.getScore = function() {
        return this.score;
        
    };

}