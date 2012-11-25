(function(Crafty) {

Crafty.c("Teenagers", {
	init: function() {
		$.each( Crafty.Teenagers, function( key, data ) {
			var sprites = {};
			sprite[ key + "Sprite" ] = [ 0, data.offsetY ];
			sprite[ key + "SmokedSprite" ] = [ 1, data.offsetY ];
			sprite[ key + "PikedSprite" ] = [ 1, data.offsetY ];
			sprite[ key + "TrappedSprite" ] = [ 1, data.offsetY ];
			sprite[ key + "DeadSprite" ] = [ 1, data.offsetY ];

			Crafty.sprite(104, "assets/sprites/teenagers.png", sprite )

			Crafty.e( [ "Teenager", key + "Sprite" ].join() )
				.attr({w: Crafty.tileSize, h: Crafty.tileSize, x: initialPosition[0] * Crafty.tileSize, y: initialPosition[1] * Crafty.tileSize})
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
		initialPosition: [1,2],
		offsetY: 0
	},
	Cheerleader: {
		initialPosition: [1,3],
		offsetY: 1
	},
	Geek: {
		initialPosition: [1,4],
		offsetY: 2
	},
	Emo: {
		initialPosition: [1,5],
		offsetY: 3
	},
	Gangsta: {
		initialPosition: [1,6],
		offsetY: 4
	}
};

})(Crafty);