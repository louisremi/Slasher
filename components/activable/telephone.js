(function(Crafty) {
	Crafty.c('Telephone',{
		init:function() {
			this.requires('Activable')
				.bind('zob',function() {
					this._action();
				});
		},

		_action: function() {
			Crafty.e('2D,Tween,Image,DOM')
				.attr({x:this._x+32-119,y:this._y-113,h:30,w:90,z:this._x+1})
				.image('assets/sprites/onoDring.png')
				//.textColor('#0F0')
				.tween({alpha:'0.0'},70);
			musique.leurres.telephone.play();

			this.attract();
			return this;
		}
	})
})(Crafty)