(function(Crafty) {

Crafty.c("Pikes", {
	init: function() {
		this.requires("Trap");

		this.event = "piked";
	},

	trapAnimation: function( onPikesUp, onPikesDown ) {
		onPikesUp();
		onPikesDown();
	}
});

})(Crafty);