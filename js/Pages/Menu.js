/**
 * Menu page.
 * @constructor
 */
function Menu() {
    Page.call(this);
    
    this.page.id = "menu";
    this.page.className = "page";

    //build
    var title = document.createElement("h1");
    title.innerHTML = "Trump Runner";

    this.wrapper = document.createElement("div");
    this.wrapper.className  = "wrapper";

    var play = document.createElement("button");
    play.appendChild(document.createTextNode("Play"));
    play.addEventListener('click', function(){
        MENU.setVisibility(false);
        GAME.setVisibility(true);
        GAME.newGame();
    });

    var score = document.createElement("button");
    score.appendChild(document.createTextNode("High Score"));
    score.addEventListener('click', function(){
        MENU.setVisibility(false);
        HIGH_SCORE.build();
        HIGH_SCORE.setVisibility(true);
    });



    /* CODE FOR FACEBOOK LOGIN BUTTON*/
    /*
    var login = document.createElement("div");
    login.id = "button-login";
    login.setAttribute("class", "fb-login-button");
    login.setAttribute("data-max-rows", "1");
    login.setAttribute("data-size", "xlarge");
    login.setAttribute("data-show-faces", "false");
    login.setAttribute("data-auto-logout-link", "false");
    */

    this.login = document.createElement("button");
    this.login.appendChild(document.createTextNode("Login"));
    this.login.addEventListener('click', function(){
        MENU.setVisibility(false);
        LOGIN.setVisibility(true);
    });


    this.logout = document.createElement("button");
    this.logout.appendChild(document.createTextNode("logout"));
    this.logout.addEventListener('click', function(){
        PLAYER_DATA = new PlayerData();
        MENU.toggleLoginButton(false);
    });

    this.page.appendChild(title);

    this.wrapper.appendChild(play);
    this.wrapper.appendChild(score);
    this.wrapper.appendChild(this.login);

    this.page.appendChild(this.wrapper);
}

//inheritance stuff
Menu.prototype = Object.create(Page.prototype);
Menu.prototype.constructor = Menu;


Menu.prototype.toggleLoginButton = function(state){
    if(state){
        this.wrapper.removeChild(this.login);
        this.wrapper.appendChild(this.logout);
    }
    else {
        this.wrapper.removeChild(this.logout);
        this.wrapper.appendChild(this.login);
    }
};






