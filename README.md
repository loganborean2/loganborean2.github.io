COMP2910_PROJECT: Trump Runner

This is a browser based game made by a group of BCIT students for
the class COMP2910.

View it @:
www.trumprunner.lol

Readme.docx contains the team and product information below, as well as a user
guide with screenshots and the network graph for sprint 3.

///////////////////////////////////////////////////////////////////////////////

== Team Information ==

Group: 29

Members:
Borean, Logan
Jamaly, M A M Nasim
McCadden, Deric
McCrone, Brody
Montes, Renato

== Project Overview ==

Title: Trump Runner

Description:
Trump Runner is a brain game combining memory recollection and political
satire. Navigate Trump to the White House while avoiding hidden mines and
collecting items such as spraytans, stars and birth certificates. The minefield
is revealed for only a couple seconds at the beginning of each level.

== Code structure ==

The code is divided according to the language used:

HTML: top level, in a single "index.html" file
CSS: "style" subfolder, in a single "trumprunner.css" file
JavaScript/jQuery: "js" subfolder
PHP: "php" subfolder

-- JavaScript/jQuery "js" subfolder --

The "js" subfolder contains four subfolders of its own:

Components: elements drawn on the pages that are not
            individual objects on the grid
 
Entities:   objects drawable on the grid along with their
            behaviour methods

Libraries:  unused
			
Pages:      scripts for initializing and viewing the various
            screens of the game

Resources:  resource managers through which the image and sound
            resources as well as the canvases are accessed


== Technologies used ==

Languages and markup: HTML, CSS, JavaScript, jQuery, PHP.
IDEs: Webstorm, phpStorm.

== Issues/Problems encountered ==

Product:
-Responsiveness could be better: by no means it works on all devices. This
     also means elements do not always appear in their correct position.
-Log-in does not work appropriately: apostrophes are not well handled,
     unhelpful messages appear when something is wrong.
	 
Process:
-Initial design could've been much more detailed in terms of intended
     code structure, using, for example, UML to list the scripts' methods.
-Tasks were not properly broken down initially, and misestimation of the
     time each task required continued throughout.
-There were communication problems involving who was working on what, even
     when present in the same room, largely solved with the use of Trello.

Team:
-Inexperience with CSS, JavaScript, jQuery and PHP.
-Inexperience with working in a coding project of 5 people, particularly
     in terms of merging code.

///////////////////////////////////////////////////////////////////////////////

Sources of sound files licensed under the CC Sampling+ License:
chime.mp3
"Wind Chime Crunch" by freesound.org user "GnoteSoundz"
http://www.freesound.org/people/GnoteSoundz/sounds/169854/

explosion.mp3
"fireworks_close_explosion.wav" by freesound.org user "Syna-Max"
http://www.freesound.org/people/Syna-Max/sounds/56598/

spraytan.mp3
"spraycan1.wav" by freesound.org user "HerbertBoland"
http://www.freesound.org/people/HerbertBoland/sounds/28542/

star.mp3
"Ceramic Bell 02" by freesound.org user "Jagadamba"
http://www.freesound.org/people/Jagadamba/sounds/254756/