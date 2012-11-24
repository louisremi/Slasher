var initPersos = function(map) {
    var mapSize = 30;
    var tileSize = 32;
    
        var perso1 = Crafty.e("2D, DOM, Ape, Personnage, perso1")
                .MoveToTile(5, 2);
        
        var perso2 = Crafty.e("2D, DOM, Ape, Personnage, perso2")
                .MoveToTile(4, 10);
                
    Crafty.c("TilePos",{
        _posL:0,
        _posC:0,
        _tile: null,
        blocked: false,
        setBlocked: function( item ) {
        	if( item )
        	blocked = item.blocked;
            return this;
        },
        tilePos:function(l,c){
            this._posL = l;
            this._posC = c;
            this.attr({x:this._posC * tileSize});
            this.attr({y:this._posL * tileSize});
            return this;
        },
        init:function(){
            this.requires("2D");
        }
    })
    var end;
    
    for(var l = 0;l < map.length;l++){
        for(var c = 0;c < map[l].length;c++) {
        	
        end = Crafty.e("TilePos, 2D, Canvas, Color, Mouse, AStar")
       /*.color(Math.random()*100>80?"#000":Math.random()*100>10?"#0af":"#aaf")
       .attr({w:tileSize-1,h:tileSize-1})*/
       .tilePos(l,c)
       .setBlocked( map[l][c] )
       .findAdjacent(function(e){
           //@param e : The central tile to find adjacent ones.
           //@return: An array with the adjacent tiles.
           var resultCoord = [];
           for(var c = e._posC-1;c <= e._posC+1;c++)
            for(var l = e._posL-1;l <= e._posL+1;l++){
                //if you don't want diagonals:
                //if(c != e._posC && l != e._posL) continue;
                if(!(c == e._posC && l == e._posL))
                 if(c >= 0 && c < mapSize && l >= 0 && l < mapSize)
                     resultCoord.push({c:c,l:l});
            }
           
           var result = [];
           //Yes, this is slow, but it's just an example, you should probably use
           // a multidimensional array on your code or a hash table instead of calling
           // Crafty and looping your tiles.
           Crafty("TilePos").each(function(e){
               for(var i in resultCoord)
                   if(this._posC == resultCoord[i].c && this._posL == resultCoord[i].l)
                       result.push(this);
           });
           return result;
       })
       .heuristic(function(a,b){
           //@param a: The current tile the algorithm is checking
           //@param b: The destination tile (where you want to the path to go)
           //@return: The distance between the current tile and the destination tile
           //    on your coordinate system.
           var l = Math.abs(a._posL - b._posC);
           var c = Math.abs(a._posC - b._posC);
           
           var dx1 = a._posC - b._posC; //Tiebreaker code, to increase performance when
           var dy1 = a._posL - b._posL; // many paths with the same length are avaible
           var dx2 = this._posC - b._posC;
           var dy2 = this._posL - b._posL;
           var cross = Math.abs(dx1*dy2 - dx2*dy1);
           
           /*
            * If you allow diagonals use this:
            * return Math.max(l,c)+cross*0.0001;
            * 
            * If you won't allow diagonals, use this:
            * return l+c+cross*0.0001;
            */
            
           return l+c+cross*0.0001;
       });
       if( map[l][c] != null ){
	       map[l][c].bind("Click",function(){
	       	Crafty.e("2D,Color,DOM").color("#0F0").attr({x:this.x,y:this.y,w:32,h:32,z:this._z+1});
	            Crafty("TilePos").each(function(){
	            	this.alpha=1;
	            })
	            
	            var ignore = function(a,b){
	                //@param a: The current tile.
	                //@param b: One of a's adjacents.
	                //@return: false if the tile can be a part of the path, true if the
	                //    the algorithm should ignore it (walls for instance). 
	                if(b.__c['blocked']) 
	                    return true;
	                if(a._posC != b._posC && a._posL != b._posL) //we ignore diagonals
	                    return true;
	                return false;
	            }
	            
	            var weighted = function(a,b){
	                //@param a: The current tile.
	                //@param b: One of a's adjacents.
	                //@return: the extra weight that should be added to the tile or
	                //    the value it takes from one normal tile to another.
	                if(b._color == "#aaf"){
	                    return 10;
	                }
	                return 0;
	            }
	            
	            //findPath(ignore function, weighted function, beggining of path, end of path)
	            //@return: array of your tile objects with the path from beggining to end or
	            //    an empty array if it couldnt find a path.
	            //perso
	            var r = end.findPath(ignore,weighted,map[3][3].astar,this.astar);
	            console.log( r);
	            for(var i in r)
	            	Crafty.e("2D,Color,DOM").color("#f00").attr({x: r[i].y,y: r[i].x,w:32,h:32,z: r[i]._z+1});
	               
	        });
	        map[l][c].astar = end;
	       }
        }
    }
};