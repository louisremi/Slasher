(function(Crafty) {

	var inventoryCoord = {x:0,y:0}, inventorySize = {w:100,h:640};

	Crafty.c("Trap",{
		numberOffset:40,

		init: function() {

			this.numberOfTraps = 0;				
		},

		setEffect: function(callback) {
			this.effectCallback = callback;
			return this;
		},

		triggerTrap: function( teenager ) {//console.log(teenagers, Object.keys(teenagers[0]))
			var self = this;

			this.trapAnimation(function() {
				//teenager.trigger( self.event || "die" );
			}, function() {
				self.destroy();
			});

			return this;
		},

		postNumber: function(value) {
			this.numberOfTraps = value;
			this._drawNumber();
			return this;
		},

		consume: function() {
			this.numberOfTraps--;
			this._drawNumber();

			return this;
		},

		trapAnimation: function(callback1,callback2) {
			callback1();
			callback2();
		},

		_drawNumber: function() {
			if(this.numberEntity)
				this.numberEntity.destroy();

			this.numberEntity = Crafty.e('2D, DOM, Text')
				.attr({w:100,h:100,x:this._x+this.numberOffset,y:this._y+10,z:this._z+1})
				.textColor('#000')
				.text('x '+this.numberOfTraps);
		},
	});

	Crafty.c("Inventory", {

		basicOffset: 40,

		init: function() {
			this.requires('2D,DOM,Color');
			this.inventory = [];
		},

		setupInventory:function(traps) {
			this.color("#999")
				.attr({w:inventorySize.w,h:inventorySize.h,z:50});

			var offset = 1;

			var self = this;

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
	floorTrap: {value:3,callback:function() {}},
	pieux: {value:3,callback:function() {}},
	marijuana:{value:3,callback:function() {}},
	wolfTrap:{value:3,callback:function() {}},
	acid:{value:3,callback:function() {}},
};

function createTrap() {
	Crafty.e('Inventory')
		.setupInventory(inventory);
};