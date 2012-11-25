(function(Crafty) {

var menuItemSize = 100;

Crafty.c("Inventory", {

	basicOffset: 40,

	init: function() {
		//this.requires('2D,DOM');

		this.inventory = [];

		this.setupInventory();
	},

	setupInventory:function() {
		/*this.color("#999")
			.attr({w:this.width,h:this.height,z:50});*/

		var offset = 0;

		var self = this;

		$.each( Crafty.Inventory, function( key, data ) {
			var trapSprite = {},
				menuItemSprite = {};
			
			trapSprite[ key + "Sprite" ] = [ 0, data.offsetY ];
			menuItemSprite[ key + "MenuSprite" ] = [ 0, data.offsetY ];
			
			Crafty.sprite(Crafty.tileSize,"assets/sprites/traps.png", trapSprite );
			Crafty.sprite(108,"assets/sprites/trapmenu.png", menuItemSprite );

			var menuItem = Crafty.e( ["2D", "DOM", key + "MenuSprite" ].join() )
				.attr({w: menuItemSize, h: menuItemSize+8, x: 0, y: offset * menuItemSize, z: 50 });

			while( data.available-- ) {
				var trap = Crafty.e( [ "Trap", key + "Sprite" ].join() )
					.attr({
						w: Crafty.tileSize,
						h: Crafty.tileSize,
						x: menuItem._x + 18,
						y: menuItem._y + 18,
						z:menuItem._z + 1
					})
					.saveOrigin()
					.attr({offset: data.offset, effect: data.effect, name: key});

				// ugly hack, means we're going fast
				trap._element.style.opacity = 0;
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
	Wolf: {
		available: 3,
		offsetY: 0,
		effect: "wolfed"
	},
	Acid: {
		available: 3,
		offsetY: 1,
		effect: "acided"
	},
	Trap: {
		available: 3,
		offsetY: 2,
		effect: "trapped"
	},
	Pikes: {
		available: 3,
		offsetY: 3,
		effect: "piked"
	},
	Gaz: {
		available: 3,
		offsetY: 4,
		effect: "gazzed"
	}
};

Crafty.TrapsLeft = 15;

})(Crafty);