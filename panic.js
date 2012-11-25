(function(Crafty) {

	var createSlasher = function() {
		Crafty.Slasher = Crafty.e('Slasher,2D,Multiway,DOM')
	};

	Crafty.enterPanicMode = function() {

		Crafty.panic = true;
		this.screen = Crafty.e("2D, DOM, Text, Color,Tween").attr({ w: 1024, h: 600, x: 0, y: 0, z: 990 })
                 .color("#ddd")
                 .text("PANIC THE FUCK OUT")
                 .textColor("#000")
                 .css({ "text-align": "center"
                    , "padding-top": "250px"
                    , "font-size": "64pt"})
                 .tween({alpha:0.0},300);

        Jeu.musique.panic();

        Crafty.sprite(104, "assets/sprites/teenagers.png", {
        	SlasherSprite:[1,5],
        });

        Crafty.PathFinder.enterPanicMode();

        var position = {x:0,y:0,z:40};
        Crafty('Door').each(function(door) {
        	position.x = door._x;
        	position.y = door._y;
        })

        Crafty.e('2D,DOM,Slasher, SlasherSprite,Keyboard,Collision,WiredHitBox')
        	.attr(position)
        	.slasher(1)
        	.collision(
        		new Crafty.polygon([0+16,64+32],[64+16,64+32],[64+16,0+32],[0+16,0+32]))
        	.bind('Moved', function(from) {
        		var collision = this.hit('blocked')
			    if(collision){
			        this.attr({x: from.x, y:from.y});
			    }
			});

        //Bouger tous les teenages vers le bord
        Crafty.npc.forEach(function(teenager) {
        	var dest = Crafty.PathFinder.tiles[0][0];

        	if(Math.round(Math.random())) {
        		dest = Crafty.PathFinder.tiles[0][Math.floor(Math.random()*Crafty.mapSize.h)];
        	} else {
				dest = Crafty.PathFinder.tiles[Math.floor(Math.random()*Crafty.mapSize.w)][0];
        	}

        	var locationIsBlocked = false;
			if(dest.__c['blocked']) {
				locationIsBlocked = 'blocked';
				dest.removeComponent('blocked');
			} else if (dest.__c['window']) {
				locationIsBlocked = 'window';
				dest.removeComponent('window');
			}

			var path = Crafty.PathFinder.calculatePath(teenager,dest);
			if (!!locationIsBlocked){
				dest.addComponent(locationIsBlocked)
				path.pop();
			}
			teenager.setMovePath(path);
			teenager.moveTo();
        })
    };

})(Crafty)