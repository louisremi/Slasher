(function(Crafty) {
	Crafty.c('Fenetre',{
		init:function() {
			this.requires('Activable')
				.bind('zob',function() {
					this._action();
				});
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