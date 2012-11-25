(function(Crafty) {

Crafty.c("Teenagers", {
	init: function() {
		$.each( Crafty.Teenagers, function( key, data ) {
			var sprites = {};
			sprites[ key + "Sprite" ] = [ 0, data.offsetY ];
			sprites[ key + "SmokedSprite" ] = [ 1, data.offsetY ];
			sprites[ key + "PikedSprite" ] = [ 2, data.offsetY ];
			sprites[ key + "TrappedSprite" ] = [ 3, data.offsetY ];
			sprites[ key + "DeadSprite" ] = [ 4, data.offsetY ];

			Crafty.sprite(104, "assets/sprites/teenagers.png", sprites );

			var teenager = Crafty.e( [ "Teenager", key + "Sprite" ].join() )
				.attr({
					w: 104,
					h: 104,
					x: data.initialPosition[0] * Crafty.tileSize-16,
					y: data.initialPosition[1] * Crafty.tileSize-32,
					z: 20,
					name: key,
					offsetY: data.offsetY
				}).tilePos();
		});

		// Don't forget the corroded sprite
		Crafty.sprite(104, "assets/sprites/teenagers.png", {
			CorrodedSprite: [0,6]
		});
	}
});

Crafty.Teenagers = {
	Quarterback: {
		initialPosition: [12,6],
		offsetY: 0
	},
	Cheerleader: {
		initialPosition: [10,8],
		offsetY: 1
	},
	Geek: {
		initialPosition: [11,8],
		offsetY: 2
	},
	Emo: {
		initialPosition: [11,7],
		offsetY: 3
	},
	Gangsta: {
		initialPosition: [12,7],
		offsetY: 4
	}
};

})(Crafty);