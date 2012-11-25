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
					this.addComponent("PikesSprite");
				})
				.bind("trapped", function() {
					this.addComponent("WolftrapSprite");
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
						this.trigger( "trigger", self );
					});
				});
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
		},

		checkSlasher: function() {
			Crafty('Slasher').forEach(function(slasher) {
				if (Crafty.RayTracer.isVisible('blocked',Crafty.RayTracer.trace(self,teenager))) {
					Jeu.musique.panic();
					var direction;
					if(slasher._x > this._x)
						direction = 'w';
					if(slasher._x < this._x)
						direction = 'e';
					if(slasher._y > this._y)
						direction = 'n';
					if(slasher._y < this._y)
						direction = 's';

					if(!!direction) {
						this.setMovePath(searchEscape(direction,this))
						this.moveTo();
					}
				}
			});
		},

		enterPanicMode: function() {
			this.panic = true;
		},

		setMovePath: function (path) {
			this.movePath = path;
		},

		moveTo: function() {
			if (this.movePath.length > 0)
				this.movePath.splice(0,1);
			if(!this.isMoving)
				this.initiateMovement();

			return this;
		},

		initiateMovement: function() {

			this.tilePos();
			if (this.movePath.length > 0) {

				this.isMoving = true;
				
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

				this.delay( function(){ this.movePath.splice(0,1);}.bind(this), 30 );

				this.trigger('teenMoved');

				this.delay(this.initiateMovement,700);
			} else {
				this.tilePos();
				this.isMoving = false;
			}

			return this;
		}
	});

})(Crafty);