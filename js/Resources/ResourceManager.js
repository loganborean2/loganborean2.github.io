
function ResourceManager() {
    var images = {};
    var imageSources = {
        mine: "Images/land_mine.png",
        trump: "Images/trump.png",
        whitehouse: "Images/whitehouse.png",
        snake: "Images/snakeWoman.jpg",
        orientlistener: "Images/orientlistener.png",
        spraytan: "Images/spraytan.png",
        star: "Images/star.png",
        grass1: "Images/grass1.png",
        grass2: "Images/grass2.png",
        certificate: "Images/certificate.png"
    };

    var loadedImages = 0;
    var numImages = 0;

    var sounds = {};
    var soundSources = {
		chime : "Sounds/chime.mp3",
        explosion : "Sounds/mine_explosion.mp3",
		spraytan : "Sounds/spraytan.mp3",
		star : "Sounds/star.mp3",
		certificate : "Sounds/certificate.mp3",
		
        snake_woman : "Sounds/snake_woman.mp3",
        low_energy : "Sounds/low_energy.mp3",
        neverbegreat : "Sounds/neverbegreat.mp3",
        make_america_great : "Sounds/make_america_great.mp3",

        build_wall : "Sounds/build_wall.mp3",
        im_rich : "Sounds/im_rich.mp3",
        nobody_builds : "Sounds/nobody_builds.mp3",
        mexico_pay : "Sounds/mexico_pay.mp3",
        im_smart : "Sounds/im_smart.mp3",
    
		art_of_the_deal : "Sounds/art_of_the_deal.mp3",
		handsome : "Sounds/handsome.mp3",
		having_fun : "Sounds/having_fun.mp3",
		insane : "Sounds/insane.mp3",
		lets_go_on : "Sounds/lets_go_on.mp3",
		like_in_a_war : "Sounds/like_in_a_war.mp3",
		more_energy_tonight : "Sounds/more_energy_tonight.mp3",
        
        anthem : "Sounds/anthem.mp3"
    };

    var animations = {};
    var animationSources = {
        explosion : [
            "Images/explosion/0.gif",
            "Images/explosion/1.gif",
            "Images/explosion/2.gif",
            "Images/explosion/3.gif",
            "Images/explosion/4.gif",
            "Images/explosion/5.gif",
            "Images/explosion/6.gif",
            "Images/explosion/7.gif",
            "Images/explosion/8.gif",
            "Images/explosion/9.gif",
            "Images/explosion/10.gif",
            "Images/explosion/11.gif",
            "Images/explosion/12.gif",
            "Images/explosion/13.gif",
            "Images/explosion/14.gif",
            "Images/explosion/15.gif",
            "Images/explosion/16.gif",
            "Images/explosion/17.gif",
            "Images/explosion/18.gif",
            "Images/explosion/19.gif",
            "Images/explosion/20.gif",
            "Images/explosion/21.gif",
            "Images/explosion/22.gif",
            "Images/explosion/23.gif",
            "Images/explosion/24.gif"
        ],
        rage : [
            "Images/rage/0.gif",
            "Images/rage/1.gif",
            "Images/rage/2.gif",
            "Images/rage/3.gif",
            "Images/rage/4.gif",
            "Images/rage/5.gif",
            "Images/rage/6.gif",
            "Images/rage/7.gif",
            "Images/rage/8.gif",
            "Images/rage/9.gif",
            "Images/rage/10.gif",
            "Images/rage/11.gif",
            "Images/rage/12.gif",
            "Images/rage/13.gif",
            "Images/rage/14.gif",
            "Images/rage/15.gif",
            "Images/rage/16.gif",
            "Images/rage/17.gif"
        ]
    };


    
    var winSounds = ["build_wall", "im_rich", "nobody_builds", "mexico_pay", "im_smart", "handsome", "having_fun", "insane", "lets_go_on", "like_in_a_war", "more_energy_tonight", "art_of_the_deal"];
    var chooser = 0;
    
    this.getNextWinSound = function() {
        if (chooser === winSounds.length) {
            chooser = 0;
        }
        return winSounds[chooser++];
    };


    var loadAnimations = function(main) {
        numImages = 0;
        loadedImages = 0;
        for(var animation in animationSources) {
            for(var src in animationSources[animation]) {
                numImages++;
            }
        }

        for(var animation in animationSources) {
            animations[animation] = [];
            var idx = 0;
            for(var i = 0; i < animationSources[animation].length; i++) {
                animations[animation][i] = new Image();
                animations[animation][i].onload = function() {
                    if(++loadedImages == numImages) {
                        main.init();
                    }
                };
                animations[animation][i].src = animationSources[animation][i];
            }
        }
    };

    this.getAnimation = function(name) {
        return animations[name];
    };

    this.loadImages = function(main) {
        for(var src in imageSources) {
            numImages++;
        }

        for(var src in imageSources) {
            images[src] = new Image();
            images[src].id = src;
            images[src].onload = function() {
                if(++loadedImages >= numImages) {
                    //proved images loaded here.
                    console.log(main);
                    loadAnimations(main);

                }
            };
            images[src].src = imageSources[src];
        }
    };

    this.getImage = function(name) {
        return images[name];
    };
    
    this.loadSounds = function() {
        for(var src in soundSources) {
            sounds[src] = document.createElement("audio");
            sounds[src].setAttribute("src", soundSources[src]);
            sounds[src].setAttribute("type", "audio/mp3");
            
            if (src == "anthem") {
                sounds[src].setAttribute("loop", "");
            }
        }
    };

    this.playSound = function(name) {
        if (PLAYER_DATA.soundStatus) {
            sounds[name].currentTime = 0;
            sounds[name].play();
        }
    };

    this.pauseSound = function(name) {
        sounds[name].pause();
    };
    
    this.checkSound = function() {
        if (PLAYER_DATA.soundStatus) {
            $(".mute-button").css("background-image", "url(Images/yessound.png)");
        } else {
            //turn it on
            $(".mute-button").css("background-image", "url(Images/nosound.png)");
        }

    }
}
