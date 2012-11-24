(function(Crafty) {
	Crafty.c('Chiotte',{
		init:function() {
			this.requires('Activable')
				.bind('zob',function() {
					this._action();
				});
		},

		_action: function() {
			Crafty.e('2D,Tween,Text,DOM')
				.attr({x:this._x+50,y:this._y-20,h:30,w:100,z:this._x+1})
				.text('Fluuuuuuuuussshhh !')
				.textColor('#0F0')
				.tween({alpha:'0.0'},70);

				return this;
		}
	})
})(Crafty)