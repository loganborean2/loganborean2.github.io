/**
 * Created by Deric on 2016-05-16.
 */

/**
 * Loading screen page.
 * @constructor
 */
function LoadingScreen() {
    Page.call(this);

    this.page.id = "loading_screen";
    this.page.class = "page";
}

//inheritance stuff
LoadingScreen.prototype = Object.create(Page.prototype);
LoadingScreen.prototype.constructor = LoadingScreen;
