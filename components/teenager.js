(function(Crafty) {

	Crafty.c("Teenager",{
		init: function() {
			this.requires('Move');
			this.requires('TilePos');
			this.requires('Tween');
			this.requires('Delay');
			this.bind("piked", function() {
				console.log("piked")
			});

			this.requires('Collision')
				.collision()
				.onHit("Trap", function( trap ) {
					var self = this;
					trap[0].obj.each(function() {
						this.trigger("trigger", self);
					});
				})
		},

		moveRandom: function() {
			this.tilePos();

			this.movePath = Crafty.PathFinder.calculatePath(this,Crafty.PathFinder.tiles[3][3]);

			if (this.movePath.length > 0)
				this.movePath.splice(0,1);

			this.initiateMovement();

			return this;
		},

		initiateMovement: function() {
			if (this.movePath.length > 0) {
				
				var dest = this.movePath[0];

				this.tween({x:dest._x,y:dest._y},30);

				/*if (dest._x < this._x)
					this.tween({x:dest._x},30);
				else if (dest._x > this._x)
					this.tween({x:this._x + 1*Crafty.tileSize},30);
				else if (dest._y > this._y)
					this.tween({y:this._y - 1*Crafty.tileSize},30);
				else if (dest._y > this._y)
					this.tween({y:this._y + 1*Crafty.tileSize},30);*/

				this.movePath.splice(0,1);

				this.delay(this.initiateMovement,700);
			} else 
				return
		}
	});
})(Crafty);