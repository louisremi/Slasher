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

		$.each( Crafty.Inventory, function( key, value ) {
			while( value-- ) {
				var trap = Crafty.e( [ key, key + "Sprite" ].join() )
					.attr({w: Crafty.tileSize, h: Crafty.tileSize, x:16 + value * 3,y:offset*self.basicOffset + value * 3,z:self._z+1})
					.saveOrigin();
			}
			offset++;
		});

		return this;
	}
});

Crafty.sprite(32,"assets/sprites/zob.png",{
	PikesSprite:[0,0],
	WolftrapSprite:[0,1]/*,
	HoleSprite:[0,1],
	SmokeSprite:[2,0],
	AcidSprite:[4,0]*/
});

Crafty.Inventory = {
	Pikes: 3,
	Wolftrap: 3/*,
	Hole: 3,
	Smoke: 3,
	Acid: 3*/
};

})(Crafty);