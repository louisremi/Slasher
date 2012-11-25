(function(Crafty) {
	Crafty.c('Fenetre',{
		init:function() {
			this.requires('Activable,Collision')
				.bind('zob',function() {
					this._action();
				})
				.onHit('Teenager',function() {
					this.changeSprite();
				})
				.onHit('Slasher',function() {
					this.changeSprite();
				});
		},

		changeSprite : function() {
			if (this.__c['tileSprite14']) {
				this.removeComponent('tileSprite14');
				this.addComponent('upWindowBreak');
				Crafty.PathFinder.tiles[this._tileX][this._tileY+1].removeComponent('tileSprite24');
				Crafty.PathFinder.tiles[this._tileX][this._tileY+1].addComponent('downWindowBreak');
			}

			return this;
		},

		_action: function() {
			Crafty.e('2D,Tween,Image,DOM')
				.attr({x:this._x+32-68,y:this._y-82,h:30,w:100,z:this._x+1})
				.image('assets/sprites/onoClac.png')
				//.textColor('#0F0')
				.tween({alpha:'0.0'},70);
			Jeu.musique.leurres.fenetre.play();


			this.attract();
			
			return this;
		}
	})
})(Crafty)