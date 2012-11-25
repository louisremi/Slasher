(function(Crafty) {

	Crafty.c('Slasher',{
		init:function() {
			this.requires('Multiway');
		},

		slasher: function(speed) {
	        this.multiway(speed, {W: -90, S: 90, D: 0, A: 180})
	        return this;
    	},
    }

	});

})(Crafty)