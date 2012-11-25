(function(Crafty) {

Crafty.c("Pikes", {
	init: function() {
		this.spriteURL = "assets/sprites/zob.png";

		this.requires("Trap");

		this.event = "piked";
	},

	trapAnimation: function( onPikesUp, onPikesDown ) {
		onPikesUp();
		onPikesDown();
	}
});

})(Crafty);