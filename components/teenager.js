(function(Crafty) {

	Crafty.c("Teenager",{
		movePath:[],
		dead:false,
		speed: 1,
		init: function() {

			this.requires('2D, DOM, Move, TilePos, Tween, Delay, Afraidable, SpriteAnimation')
				.bind("piked", function() {
					this.switchSprite( this.name + "Piked");
					this.die( true );
				})
				.bind("wolfed", function() {
					this.switchSprite( this.name + "Wolfed");
					this.die( true );
				})
				.bind("trapped", function() {
					//this.attr({x: this._x + 16, y: this._y + 32, w: 64, h: 64});
					this.switchSprite( "Trapped" );
					this.die( true );
					// gros hack
					this._element.style.left = "16px";
					this._element.style.top = "32px";
				})
				.bind("gazzed", function() {
					this.switchSprite( this.name + "Gazzed");
					this.speed = .5;
					//this.die( true );
				})
				.bind("acided", function() {
					this.switchSprite("Acided");
					this.die( true );
				})
				.bind('teenMoved',function() {
					this.checkFriend();
					if (this.panic) {
						this.checkSlasher();
					}
				});

			this.requires('Collision')

				.collision([1+16,63+32],[63+16,63+32],[63+16,1+32],[1+16,1+32])	
				.onHit("TrapActive", function( trap ) {
					if ( -trap[0].overlap > ( Crafty.tileSize * 0.75 ) ) {
						var self = this;
						trap[0].obj.each(function() {
							//console.log( "Hit", this._element );
							this.trigger( "trigger", self );
						});
					}
				})
				.onHit("Slasher",function() {
					if (!this.dead) {
						this.dieAHorribleDeath();
					}
				});
		},

		switchSprite: function( state ) {
			this.removeComponent( this.name );
			this.addComponent( state + "Sprite" );

			return this;
		},

		die: function( roundTile ) {
			this.dead = true;
			this.movePath = [];
			
			if ( roundTile ) {
				this.attr({
					x: Math.round( this._x / Crafty.tileSize ),
					y: Math.round( this._y / Crafty.tileSize )
				});
			}
			if( this.name == "Emo") {
				musique.morts.fille1.play();
		    } else if( this.name == "Cheerleader" ) {
				musique.morts.fille2.play();
		    } else if( this.name == "Geek" ) {
				musique.morts.mec1.play();
		    } else if( this.name == "Quarterback" ) {
				musique.morts.mec2.play();
		    } else {
				musique.morts.mec3.play();
		    }

			Crafty.trigger('NpcDead');

			return this;
		},

		dieAHorribleDeath: function() {
			this.animate('deathBySlasher', 3, this.offsetY, 6).animate('deathBySlasher',300,0);
			this.removeComponent(this.name+'Sprite');
			this.die();
			this.stop().addComponent(this.name+'DeadSprite');

			return this;
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

			return this;
		},

		checkSlasher: function() {
			var self = this;
			Crafty('Slasher').forEach(function(slasher) {
				if (Crafty.RayTracer.isVisible('blocked',Crafty.RayTracer.trace(self,teenager))) {
					
			if( this.name == "Emo") {
						musique.peurs.fille1.play();
		    } else if( this.name == "Cheerleader" ) {
						musique.peurs.fille2.play();
		    } else if( this.name == "Geek" ) {
						musique.peurs.mec1.play();
		    } else if( this.name == "Quarterback" ) {
						musique.peurs.mec2.play();
		    } else {
						musique.morts.mec3.play();
				    }

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

			return this;
		},

		enterPanicMode: function() {
			this.panic = true;

			return this;
		},

		setMovePath: function (path) {
			this.movePath = path;

			return this;
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

				this.tween({x:dest._x-16,y:dest._y-32},30 / this.speed);

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

				this.delay(this.initiateMovement,700 / this.speed);
			} else {
				this.tilePos();
				this.isMoving = false;

				if(Crafty.panic) {
					this.destroy();
					Crafty.trigger('NpcEscape');
				}
			}

			return this;
		}
	});

})(Crafty);