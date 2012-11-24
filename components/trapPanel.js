(function(Crafty) {

	var inventoryCoor = {x:10,y=10}

	Crafty.c("Trap",{
		init: function() {

		},


	})

	Crafty.c("Inventory"), {
		init: function() {

		},

		setupInventory(inventory) {
			this.inventory = Crafty
		}
	});


})(Crafty);

Crafty.sprite(32,"traps.png",{
	floorTrap:[0,0],
	pieux:[0,0],
	marijuana:[0,0],
	wolfTrap:[0,0],
	acid:[0,0],
}

var inventory = {
	floorTrap: 3,
	pieux: 3,
	marijuana:3,
	wolfTrap:3,
	acid:3,
}

function createTrap() {
	for()
}