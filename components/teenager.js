(function(Crafty) {

	Crafty.c("Teenager",{
		movePath:[],
		init: function() {

			this.requires('2D, DOM, Move, TilePos, Tween, Delay, Afraidable')
				.bind("piked", function() {
					this.switchSprite("Piked");
					this.dead = true;
					this.movePath = [];
					this.stop();
				})
				.bind("wolfed", function() {
					this.switchSprite("Wolfed");
					this.dead = true;
					this.movePath = [];
					this.stop();
				})
				.bind('teenMoved',function() {
					this.checkFriend();
					if (this.panic) {
						this.checkSlasher();
					}
				});

			this.requires('Collision')
				.collision()
				.onHit("TrapActive", function( trap ) {
					//if ( trap && ( trap[0].overlap > ( Crafty.tileSize * 0.75 ) ) ) {
						var self = this;
						trap[0].obj.each(function() {
							//console.log( "Hit", this._element );
							this.trigger( "trigger", self );
						});
					//}
				});
		},

		switchSprite: function( state ) {
			this.removeComponent( this.name );
			this.addComponent( this.name + state + "Sprite" );
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
			var self = this;
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
						self.setMovePath(searchEscape(direction,self));
						self.moveTo();
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
			if ( this.dead ) { return; }

			if (this.movePath.length > 0)
				this.movePath.splice(0,1);
			if(!this.isMoving)
				this.initiateMovement();

			return this;
		},

		initiateMovement: function() {
			if ( this.dead ) { return; }

			this.tilePos();
			if (this.movePath.length > 0) {

				this.isMoving = true;
				
				var dest = this.movePath[0];

				this.tween({x:dest._x-16,y:dest._y-32},30);

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