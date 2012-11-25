(function(Crafty) {

	var inventoryCoord = {x:0,y:0}, inventorySize = {w:100,h:640};

	Crafty.c("Trap",{
		numberOffset:40,

		init: function() {
			this.requires("2D, DOM, Color, Draggable");

			this.bind("trigger", function( teenager ) {
				if ( this.preventTrigger ) { return; }

				this.unbind("trigger");

				// play animation
				this.requires("SpriteAnimation")
					.animate("deploy", this.offset[0], this.offset[1], 3)
					.animate("deploy", 30, 0)
					.bind("AnimationEnd", function() {
				    	//teenager.trigger( eventName || "die" );
				    	this.destroy();
				    });
			});

			this.bind("StartDrag", function() {
				this.preventTrigger = true;
			});

			// a dropped trap should be adjusted to fit on a tile
			this.bind("StopDrag", function() {
				var adjustedDrop = {
						x: Math.round( this._x / Crafty.tileSize ),
						y: Math.round( this._y / Crafty.tileSize )
					},
					droppedOnTile = Crafty.PathFinder.tiles[ adjustedDrop.x ][ adjustedDrop.y ].__c;

				if ( droppedOnTile.blocked || droppedOnTile.window ) {
					this.restoreOrigin();
				
				} else {
					this.attr({
						x: adjustedDrop.x * Crafty.tileSize,
						y: adjustedDrop.y * Crafty.tileSize
					});

					this.preventTrigger = false;
				}
				
			});
		},

		saveOrigin: function() {
			this.origin = {
				x: this._x,
				y: this._y
			};

			return this;
		},

		restoreOrigin: function() {
			this.attr(this.origin);
		}/*,

		setEffect: function(callback) {
			this.effectCallback = callback;
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
		},*/
	});


})(Crafty);