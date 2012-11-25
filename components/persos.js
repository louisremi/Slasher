(function(Crafty) {

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
      this._posX = this._posTileX * tileSize - this._originX;
      this._posY = this._posTileY * tileSize - this._originY;
      this.attr({x:this._posX});
      this.attr({y:this._posY});
      return this;
    },

    init:function(){
      this.requires("2D");
    }
  });

  Crafty.c("TilePos",{
        _tileX:0,
        _tileY:0,
        _tile: null,
        blocked: false,
        setBlocked: function( item ) {
          if( item )
          blocked = item.blocked;
            return this;
        },
        tilePos:function(){
            this._tileX = (this._x / Crafty.tileSize)|0;
            this._tileY = (this._y / Crafty.tileSize)|0;
            return this;
        },
        init:function(){
            this.requires("2D");
        }
    });

})(Crafty);