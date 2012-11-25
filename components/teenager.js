(function(Crafty) {

	Crafty.c("Teenager",{
		movePath:[],
		dead:false,
		init: function() {

			this.requires('2D, DOM, Move, TilePos, Tween, Delay, Afraidable, SpriteAnimation')
				.bind("piked", function() {
					this.switchSprite("Piked");
					this.die( true );
				})
				.bind("wolfed", function() {
					this.switchSprite("Wolfed");
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
			this.addComponent( this.name + state + "Sprite" );

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
				Jeu.musique.morts.fille1.play();
		    } else if( this.name == "Cheerleader" ) {
				Jeu.musique.morts.fille2.play();
		    } else if( this.name == "Geek" ) {
				Jeu.musique.morts.mec1.play();
		    } else if( this.name == "Quarterback" ) {
				Jeu.musique.morts.mec2.play();
		    } else {
				Jeu.musique.morts.mec3.play();
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
						Jeu.musique.peurs.fille1.play();
		    } else if( this.name == "Cheerleader" ) {
						Jeu.musique.peurs.fille2.play();
		    } else if( this.name == "Geek" ) {
						Jeu.musique.peurs.mec1.play();
		    } else if( this.name == "Quarterback" ) {
						Jeu.musique.peurs.mec2.play();
		    } else {
						Jeu.musique.morts.mec3.play();
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

				if(Crafty.panic) {
					this.destroy();
					Crafty.trigger('NpcEscape');
				}
			}

			return this;
		}
	});

})(Crafty);