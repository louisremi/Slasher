(function(Crafty) {

Crafty.c("Teenagers", {
	init: function() {
		$.each( Crafty.Teenagers, function( key, data ) {
			var sprites = {};
			sprites[ key + "Sprite" ] = [ 0, data.offsetY ];
			sprites[ key + "SmokedSprite" ] = [ 1, data.offsetY ];
			sprites[ key + "PikedSprite" ] = [ 1, data.offsetY ];
			sprites[ key + "TrappedSprite" ] = [ 1, data.offsetY ];
			sprites[ key + "DeadSprite" ] = [ 1, data.offsetY ];

			Crafty.sprite(104, "assets/sprites/teenagers.png", sprites )

			Crafty.e( [ "Teenager", key + "Sprite" ].join() )
				.attr({w: Crafty.tileSize, h: Crafty.tileSize, x: data.initialPosition[0] * Crafty.tileSize, y: data.initialPosition[1] * Crafty.tileSize})
				.crop(20,20,64,64)
		});

		// Don't forget the corroded sprite
		Crafty.sprite(104, "assets/sprites/teenagers.png", {
			CorrodedSprite: [0,6]
		});
	}
});

Crafty.Teenagers = {
	Quarterback: {
		initialPosition: [5,2],
		offsetY: 0
	},
	Cheerleader: {
		initialPosition: [5,3],
		offsetY: 1
	},
	Geek: {
		initialPosition: [5,4],
		offsetY: 2
	},
	Emo: {
		initialPosition: [5,5],
		offsetY: 3
	},
	Gangsta: {
		initialPosition: [5,6],
		offsetY: 4
	}
};

})(Crafty);