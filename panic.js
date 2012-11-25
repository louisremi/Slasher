(function(Crafty) {

	var createSlasher = function() {
		Crafty.Slasher = Crafty.e('Slasher,2D,Multiway,DOM')
	};

	Crafty.enterPanicMode = function() {
		this.screen = Crafty.e("2D, DOM, Text, Color,Tween").attr({ w: 1024, h: 600, x: 0, y: 0, z: 990 })
                 .color("#ddd")
                 .text("PANIC THE FUCK OUT")
                 .textColor("#000")
                 .css({ "text-align": "center"
                    , "padding-top": "250px"
                    , "font-size": "64pt"})
                 .tween({alpha:0.0},300);

        Jeu.musique.panic();

        Crafty.PathFinder.enterPanicMode();

        //Bouger tous les teenages vers le bord
        Crafty.npc.each(function(teenager) {
        	var dest = tiles[0][0];

        	if(Math.round(Math.random())) {
        		dest = tiles[0][Math.floor(Math.random()*Crafty.mapSize.h)];
        	} else {
				dest = tiles[Math.floor(Math.random()*Crafty.mapSize.w)][0];
        	}

        	var locationIsBlocked = false;
			if(dest.__c['blocked']) {
				locationIsBlocked = 'blocked';
				dest.removeComponent('blocked');
			} else if (dest.__c['window']) {
				locationIsBlocked = 'window';
				dest.removeComponent('window');
			}

			Crafty.PathFinder.calculatePath(])
			if (!!locationIsBlocked){
				dest.addComponent(locationIsBlocked)
				path.pop();
			}
			teenager.setMovePath(path);
			teenager.moveTo();
        })
    };

})(Crafty)