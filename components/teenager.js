(function(Crafty) {

	Crafty.c("Teenager",{
		init: function() {
			this.requires('Move');
			this.requires('TilePos');
			this.requires('Tween');
			this.requires('Delay');
			this.bind("piked", function() {
				console.log("piked")
			})
				.bind('checkFriendOver',function() {
					this.delay(this.checkFriend,4000);
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

		checkFriend: function() {
			var self = this;
			Crafty.npc.forEach(function(teenager) {
				if (teenager !== self) {
					/*if (Crafty.RayTracer.isVisible('blocked',Crafty.RayTracer.trace(self,teenager)))
						console.log(self[0]+" sees "+teenager[0]);
					else
						console.log(self[0]+" does not see "+teenager[0]);*/
				}
			});

			this.trigger('checkFriendOver');
		},

		setMovePath: function (path) {
			this.movePath = path;
		},

		moveTo: function() {
			this.tilePos();

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
			} else {
				this.tilePos();
			}

			return this;
		}
	});
})(Crafty);