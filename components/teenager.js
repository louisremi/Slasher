(function(Crafty) {

Crafty.c("Teenager", {
	init: function() {
		var self = this;

		this.bind("piked", function() {
			console.log("piked")
		});
	}
});

})(Crafty);