/**
 * Created by Deric on 2016-05-18.
 */

/**
 * High score page.
 * @constructor
 */
function HighScore() {
    Page.call(this);

    this.page = document.createElement("div");
    this.page.id = "high-score";
    this.page.className = "page";

    //build
    var title = document.createElement("h1");
    title.innerHTML = "High Score";

    var wrapper = document.createElement("div");
    wrapper.className  = "wrapper";


    var home = document.createElement("div");
    home.className = "home-button";
    home.addEventListener('click', function(){
        HIGH_SCORE.setVisibility(false);
        MENU.setVisibility(true);
    });


    this.table = document.createElement("table");
    this.table.className = "infobox";

    this.header = document.createElement("tr");

    var place = document.createElement("th");
    place.appendChild(document.createTextNode("Place"));

    var name = document.createElement("th");
    name.appendChild(document.createTextNode("User Name"));

    var score = document.createElement("th");
    score.appendChild(document.createTextNode("Score"));


    var achievements = document.createElement("button");
    achievements.appendChild(document.createTextNode("Achievements"));
    achievements.addEventListener('click', function(){
        HIGH_SCORE.setVisibility(false);
        ACHIEVEMENTS.build();
        ACHIEVEMENTS.setVisibility(true);
    });


    this.page.appendChild(title);

    this.header.appendChild(place);
    this.header.appendChild(name);
    this.header.appendChild(score);

    wrapper.appendChild(this.table);
    wrapper.appendChild(achievements);

    this.page.appendChild(wrapper);
    this.page.appendChild(home);

}


//inheritance stuff
HighScore.prototype = Object.create(Page.prototype);
HighScore.prototype.constructor = HighScore;




/**
 * Pulls the highscores from the server and returns them.
 * @return JSON object containing the highscores
 */
HighScore.prototype.build = function(){
    var url = "php/highscore.php"; // the script where you handle the form input.

    var myThis = this;
    $.ajax({
        type: "POST",
        url: url,
        success: function(data) {
            var obj = JSON.parse(data);
            myThis.buildScore(obj);
        }
    });
};


/**\
 * Builds the score table and appends it to the screen.
 *
 */
HighScore.prototype.buildScore = function(obj) {

    while (this.table.firstChild) {
        this.table.removeChild(this.table.firstChild);
    }
    this.table.appendChild(this.header);

    for(var i = 0; i < obj.length; i++){

        var row = document.createElement("tr");

        var place = document.createElement("td");
        place.appendChild(document.createTextNode("" + (i + 1)));

        var name = document.createElement("td");
        name.appendChild(document.createTextNode(obj[i].username));

        var score = document.createElement("td");
        score.appendChild(document.createTextNode(obj[i].score));

        row.appendChild(place);
        row.appendChild(name);
        row.appendChild(score);

        this.table.appendChild(row);
    }
};







