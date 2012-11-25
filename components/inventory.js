(function(Crafty) {

Crafty.c("Inventory", {

	basicOffset: 40,
	width: 100,
	height: 640,

	init: function() {
		this.requires('2D,DOM,Color');
		this.inventory = [];

		this.setupInventory();
	},

	setupInventory:function() {
		this.color("#999")
			.attr({w:this.width,h:this.height,z:50});

		var offset = 1;

		var self = this;

		$.each( Crafty.Inventory, function( key, data ) {
			var sprite = {};
			sprite[ key + "Sprite" ] = data.offset;
			Crafty.sprite(Crafty.tileSize,"assets/sprites/zob.png", sprite );

			while( data.available-- ) {
				var trap = Crafty.e( [ "Trap", key + "Sprite" ].join() )
					.attr({w: Crafty.tileSize, h: Crafty.tileSize, x:16 + data.available * 3,y:offset*self.basicOffset + data.available * 3,z:self._z+1})
					.saveOrigin()
					.attr({offset: data.offset, effect: data.effect});
			}
			offset++;
		});

		return this;
	}
});

/*Crafty.sprite(32,"assets/sprites/zob.png",{
	PikesSprite:[0,0],
	WolftrapSprite:[0,1],
	HoleSprite:[0,1],
	SmokeSprite:[2,0],
	AcidSprite:[4,0]
});*/

Crafty.Inventory = {
	Pikes: {
		available: 3,
		offset: [0,0],
		effect: "piked"
	},
	Wolftrap: {
		available: 3,
		offset: [0,1],
		effect: "trapped"
	}/*,
	Hole: 3,
	Smoke: 3,
	Acid: 3*/
};

})(Crafty);