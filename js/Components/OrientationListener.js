function OrientationListener() {
    console.log("orientationlistener is commented out");
    window.addEventListener("orientationchange", orientationCheck, false);

    function orientationCheck() {
        if (screen.orientation.angle == 0) {
            
        } else if (screen.orientation.angle == 90) {
            GAME.setVisibility(false);
        }
    }
}