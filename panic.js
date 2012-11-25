(function(Crafty) {

	var createSlasher = function() {
		Crafty.Slasher = Crafty.e('Slasher,2D,Multiway,DOM')
	};

	Crafty.enterPanicMode = function() {

		this.screen = Crafty.e("2D, DOM, Image, Tween, Delay").attr({ w: 1071, h: 460, x: 120, y: 200, z: 990 })
                .image("assets/sprites/uiPanic.png");
        this.screen.tween({alpha:1.0},200).tween({alpha:0.0},200).tween({x: 0},50).tween({x: 300},50);

        Jeu.musique.panik();
        //Jeu.musique.tronconneuse.play();

        Crafty.panic = true;

        Crafty.sprite(104, "assets/sprites/teenagers.png", {
        	SlasherSprite:[1,5],
        });

        Crafty.sprite(64, "assets/sprites/texture.png", {
            upWindowBreak:[4,4],
            downWindowBreak:[4,5],
        });

        Crafty.PathFinder.enterPanicMode();

        var position = {x:9*Crafty.tileSize,y:9*Crafty.tileSize,z:40};
        Crafty('Door').each(function(door) {
        	position.x = door._x;
        	position.y = door._y;
        })

        Crafty.e('2D,DOM,Slasher, SlasherSprite,Keyboard,Collision')
        	.attr(position)
        	.slasher(4)
        	.collision(
        		new Crafty.polygon([1+16,63+32],[63+16,63+32],[63+16,1+32],[1+16,1+32]))
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