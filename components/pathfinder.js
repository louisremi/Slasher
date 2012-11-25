(function(Crafty) {

	Crafty.c('PathFinder',{
		init :function() {
		},

		_heuristic: function(a,b,start) {
			var c = Math.abs(a._tileX - b._tileX);
          	var l = Math.abs(a._tileY - b._tileY);
           
           	var dx1 = a._tileX - b._tileX;
           	var dy1 = a._tileY - b._tileY;
           	var dx2 = start.tile._tileX - b._tileX;
           	var dy2 = start.tile._tileY - b._tileY;
           	var cross = Math.abs(dx1*dy2 - dx2*dy1);
            
           	return l+c+cross*0.0001;
		},

		ignore : function(a,b){
            //@param a: The current tile.
            //@param b: One of a's adjacents.
            //@return: false if the tile can be a part of the path, true if the
            //    the algorithm should ignore it (walls for instance). 
            if(b.__c['blocked'] || b.__c['window']) 
                return true;
            if(a._posC != b._posC && a._posL != b._posL) //we ignore diagonals
                return true;
            return false;
        },

        enterPanicMode: function() {
        	this.ignore = function(a,b) {

        	if(b.__c['blocked']) 
                return true;
            if(a._posC != b._posC && a._posL != b._posL) //we ignore diagonals
                return true;
            return false;
        	}

        	this.weighted = function(a,b) {
        		if (b.__c['window'])
        			return 4;

        		return 0;
        	}
        },
	            
        weighted: function(a,b){
            return 0;
        },

		_findAdjacent: function(e) {
			result = []

			for (var i = -1;i<=1;i++) {
				if (i+e._tileX >= 0 && i+e._tileX < Crafty.mapSize.w)
					for (var j = -1;j<=1;j++) {
						if ((j+i == 0 && j!=i) || j+i == 2 || j+i == -2) 
							continue;
						if (j+e._tileY >= 0 && j+e._tileY < Crafty.mapSize.h)
							result.push(this.tiles[i+e._tileX][j+e._tileY]);
					}
			}

			return result
		},

		setTiles: function(tiles) {
			this.tiles = tiles;
			return this;
		},

		calculatePath:function(origin,dest) {
			return this.findPath(this.ignore,this.weighted,origin,dest);
		},
	});
})(Crafty)