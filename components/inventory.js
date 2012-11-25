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
		});/*

		Crafty.Traps.forEach(function( name ) {

		});

		$.each(traps,function(key,value) {

			var trap = Crafty.e('2D, DOM, Trap, Mouse, '+key+', Selectable')
					.attr({x:16,y:offset*self.basicOffset,z:self._z+1})
					.postNumber(value.value)
					.setEffect(value.callback)
					.bind('Click',function(e){
						this.selectEntity(function() {});
					});

			self.inventory.push(trap);
			offset++;
		});*/

		return this;
	}
});

Crafty.sprite(32,"assets/sprites/zob.png",{
	PikesSprite:[0,0],
	HoleSprite:[0,1]/*,
	SmokeSprite:[2,0],
	WolfTrapSprite:[3,0],
	AcidSprite:[4,0]*/
});

Crafty.Inventory = {
	Pikes: 3/*,
	Hole: 3,
	Smoke: 3,
	WolfTrap: 3,
	Acid: 3*/
};

})(Crafty);