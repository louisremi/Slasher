(function(Crafty) {
	Crafty.c('Telephone',{
		init:function() {
			this.requires('Activable');
		},

		_action: function() {
			this.removeButton();
			Crafty.e('2D,Tween,Text,DOM')
				.attr({x:this._x+100,y:this._y+10,h:30,w:90,z:this._x+1})
				.text('Action')
				.textColor('#0F0')
				.tween({alpha:'0.0'},200);
		}
	})
})(Crafty)