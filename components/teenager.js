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
		},

		moveRandom: function() {
			this.tilePos();

			this.movePath = Crafty.PathFinder.calculatePath(this,Crafty.PathFinder.tiles[3][3]);

			for (var self in this.movePath) {
				Crafty.e('2D,DOM,Color')
					.color('#f00')
					.attr({x:self._x,y:self._y,w:32,h:32,z:140});
			}

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

				this.delay(this.initiateMovement,500);
			} else 
				return
		}
	});
})(Crafty);