(function(Crafty) {
	Crafty.c('Activable',{
		init: function() {
			this.requires('Selectable');
		},

		addButton: function() {
			this.trigger('zob');
			return this;
		},
	})
})(Crafty)