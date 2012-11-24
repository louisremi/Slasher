Crafty.c("Personnage",{
			_height: 54,
			_width: 54,
			_originX: 50,
			_originY: 27,
			_posTileX: 0,
			_posTileY: 0,
			_posX: 0,
			_posY: 0,
			MoveToTile:function(x,y){
			  this._posTileX = x;
			  this._posTileY = y;
			  this._posX = this._posTileX * Crafty.tileSize - this._originX;
			  this._posY = this._posTileY * Crafty.tileSize - this._originY;
			  this.attr({x:this._posX});
			  this.attr({y:this._posY});
			  return this;
			},
			init:function(){
			  this.requires("2D");
			}
		});