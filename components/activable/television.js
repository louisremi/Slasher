(function(Crafty) {
	Crafty.c('Television',{
		init:function() {
			this.requires('Activable')
				.bind('zob',function() {
					this._action();
				});
		},

		_action: function() {
			Crafty.e('2D,Tween,Image,DOM')
				.attr({x:this._x+32-140,y:this._y-120,h:120,w:2500,z:this._x+1})
				.image('assets/sprites/uiTV.png')
				//.textColor('#0F0')
				.tween({alpha:'0.0'},70);
			Jeu.musique.leurres.television.play();

			this.attract();
			
			return this;
		}
	})
})(Crafty)