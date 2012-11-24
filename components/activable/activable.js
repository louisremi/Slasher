(function(Crafty) {
	Crafty.c('Activable',{
		init: function() {
			this.requires('Selectable');
		},

		_action:function() {},

		addButton: function() {
			Crafty.e('Mouse, 2D, DOM, Text, Color')
				.attr({x:this._x+100,y:this._y+10,h:30,w:90,z:this._x+1})
				.color('#666')
				.css({'border':'solid 1px #000'})
				.text('Action')
				.textColor('#000')
				.bind('Click',function() {
					this._action();
				});
		},
	})
})(Crafty)