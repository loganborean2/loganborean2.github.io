/**
 * Created by Deric on 2016-05-19.
 */

/**
 * Parent class of each page.
 * @constructor
 */
function Page() {
    this.page = document.createElement("div");
}

/**
 * Adds or removes the page from the container div in index.html
 * @param visibility
 */
Page.prototype.setVisibility = function(visibility){
    var container = document.getElementById("container");
    if(visibility == true){
        // setTimeout( function() {
        //     RESOURCES.playSound("anthem");
        // } , 10);
        container.appendChild(this.page);
    }
    else {
        container.removeChild(this.page);
        // RESOURCES.pauseSound("anthem");
    }
};