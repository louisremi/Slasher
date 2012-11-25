(function(Crafty) {
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
        },

        searchEscape: function(direction,tile) {
        var newTiles;
        if ('w') {
          var newTiles = Crafty.PathFinder.tiles[this._tileX-1][this._tileY]
        } else if ('e')
          var newTiles = Crafty.PathFinder.tiles[this._tileX+1][this._tileY]
        else if ('s')
          var newTiles = Crafty.PathFinder.tiles[this._tileX][this._tileY+1]
        else if ('n')
          var newTiles = Crafty.PathFinder.tiles[this._tileX-1][this._tileY-1]

        if(!newTiles || newTiles.__c('blocked')) {
          return tile;
        } else {
          return [tile,this.searchEscape(direction,newTiles)];
        }
      }
    });

})(Crafty);