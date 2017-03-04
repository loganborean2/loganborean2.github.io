/**
 * Created by Deric on 2016-05-26.
 */

function Achievements() {
    Page.call(this);

    this.page = document.createElement("div");
    this.page.id = "high-score";
    this.page.className = "page";

    //build
    var title = document.createElement("h1");
    title.innerHTML = "Achievements";

    var wrapper = document.createElement("div");
    wrapper.className  = "wrapper infobox";



    var home = document.createElement("div");
    home.className = "home-button";
    home.addEventListener('click', function(){
        ACHIEVEMENTS.setVisibility(false);
        MENU.setVisibility(true);
    });


    this.details = document.createElement("div");
    this.details.id = "achievement-details";
    this.achievements = document.createElement("div");

    this.page.appendChild(title);

    wrapper.appendChild(this.details);
    wrapper.appendChild(this.achievements);

    this.page.appendChild(wrapper);
    this.page.appendChild(home);



    
}


//inheritance stuff
Achievements.prototype = Object.create(Page.prototype);
Achievements.prototype.constructor = Achievements;


Achievements.prototype.build = function(){

    var myThis = this;
    //don't build achievements if no one is logged in.
    if(PLAYER_DATA.loggedInState){
        var url = "php/get_achievement.php"; // the script where you handle the form input.
        $.ajax({
            type: "POST",
            url: url,
            data: { id : PLAYER_DATA.id},
            success: function(data) {
                var obj = JSON.parse(data);

                PLAYER_DATA.setAchievements(obj);

                myThis.buildAchievements();

            }
        });
    }
    else{
        this.buildAchievements();
    }
};




/**
 * Build the trophies
 */
Achievements.prototype.buildAchievements = function(){

    //remove
    while (this.achievements.firstChild) {
        this.achievements.removeChild(this.achievements.firstChild);
    }

    var myThis = this;

    var trophy0 = document.createElement("a");
    trophy0.className = "trophy left";
    this.toggleActive(0, trophy0);
    trophy0.id = "trophy0";
    trophy0.href = "javascript:;";
    trophy0.setAttribute("description", PLAYER_DATA.achievName[0]);
    trophy0.addEventListener('click', function(){
        myThis.details.innerHTML = PLAYER_DATA.achievName[0];
    });


    var trophy1 = document.createElement("a");
    trophy1.className = "trophy center";
    this.toggleActive(1, trophy1);
    trophy1.id = "trophy1";
    trophy1.href = "javascript:;";
    trophy1.setAttribute("description", PLAYER_DATA.achievName[1]);
    trophy1.addEventListener('click', function(){
        myThis.details.innerHTML = PLAYER_DATA.achievName[1];
    });


    var trophy2 = document.createElement("a");
    trophy2.className = "trophy right";
    this.toggleActive(2, trophy2);
    trophy2.id = "trophy2";
    trophy2.href = "javascript:;";
    trophy2.setAttribute("description", PLAYER_DATA.achievName[2]);
    trophy2.addEventListener('click', function(){
        myThis.details.innerHTML = PLAYER_DATA.achievName[2];
    });

    this.achievements.appendChild(trophy0);
    this.achievements.appendChild(trophy1);
    this.achievements.appendChild(trophy2);


};

Achievements.prototype.toggleActive = function(i, trophy){
    if(PLAYER_DATA.achievements[i]){
        trophy.className += " active";
    }
    else{
        trophy.className += " inactive";
    }
};


