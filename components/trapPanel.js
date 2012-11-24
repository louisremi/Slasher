(function(Crafty) {

	var inventoryCoord = {x:0,y:0}, inventorySize = {w:64,h:640};

	Crafty.c("Trap",{
		init: function() {

		},


	})

	Crafty.c("Inventory", {

		basicOffset: 40,

		init: function() {
			this.requires('2D,DOM,Color');
			this.inventory = [];
		},

		setupInventory:function(traps) {
			this.color("#999")
				.attr({w:inventorySize.w,h:inventorySize.h,z:2});

			var offset = 1;

			var self = this;
				
			console.log(traps);
			$.each(traps,function(key,value) {

				console.log('key:'+key+',value:'+value);
				var trap = {
					trapEntity:Crafty.e('2D, DOM, Trap, Mouse, '+key+',Selectable')
						.attr({x:16,y:offset*self.basicOffset,z:3})
						.bind('Click',function(e){
							this.selectEntity();
						}),
					number:value,
				};
				self.inventory.push(trap);
				offset++;
			});

			return this;
		}
	});


})(Crafty);

Crafty.sprite(32,"assets/sprites/traps.png",{
	floorTrap:[0,0],
	pieux:[1,0],
	marijuana:[2,0],
	wolfTrap:[3,0],
	acid:[4,0],
});

var inventory = {
	floorTrap: 3,
	pieux: 3,
	marijuana:3,
	wolfTrap:3,
	acid:3,
};

function createTrap() {
	Crafty.e('Inventory')
		.setupInventory(inventory);
};