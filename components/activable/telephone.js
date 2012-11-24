(function(Crafty) {
	Crafty.c('Telephone',{
		init:function() {
			this.requires('Activable')
				.bind('zob',function() {
					this._action();
				});
		},

		_action: function() {
			Crafty.e('2D,Tween,Text,DOM')
				.attr({x:this._x+50,y:this._y-20,h:30,w:90,z:this._x+1})
				.text('Dring !')
				.textColor('#0F0')
				.tween({alpha:'0.0'},70);
			Jeu.musique.leurres.telephone.play();

				return this;
		}
	})
})(Crafty)