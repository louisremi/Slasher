(function(Crafty) {

	Crafty.c("Teenager",{
		movePath:[],
		init: function() {
			this.requires('Move')
				.requires('TilePos')
				.requires('Tween')
				.requires('Delay')
				.requires('Afraidable')
				.bind("piked", function() {
					console.log("piked")
				})
				.bind('teenMoved',function() {
					this.checkFriend();
				});

			this.requires('Collision')
				.collision()
				.onHit("Trap", function( trap ) {
					console.log('Hit');
					var self = this;
					trap[0].obj.each(function() {
						this.triggerTrap(self);
					});
				})
		},

		checkFriend: function() {
			var self = this;
			Crafty.npc.forEach(function(teenager) {
				if (teenager !== self) {
					if (Crafty.RayTracer.isVisible('blocked',Crafty.RayTracer.trace(self,teenager)))
						console.log(self[0]+" sees "+teenager[0]);
					else
						console.log(self[0]+" does not see "+teenager[0]);
				}
			});
		},

		setMovePath: function (path) {
			this.movePath = path;
		},

		moveTo: function() {

			if (this.movePath.length > 0)
				this.movePath.splice(0,1);

			this.initiateMovement();

			return this;
		},

		initiateMovement: function() {

			this.tilePos();
			if (this.movePath.length > 0) {
				
				var dest = this.movePath[0];

				this.tween({x:dest._x,y:dest._y},30);

				/*if (dest._x < this._x)
					this.move('w',Crafty.tileSize);
				else if (dest._x > this._x)
					this.move('e',Crafty.tileSize);
				else if (dest._y < this._y)
					this.move('n',Crafty.tileSize);
				else if (dest._y > this._y)
					this.move('s',Crafty.tileSize);*/

				this.movePath.splice(0,1);

				this.trigger('teenMoved');

				this.delay(this.initiateMovement,700);
			} else {
				this.tilePos();
			}

			return this;
		}
	});
})(Crafty);