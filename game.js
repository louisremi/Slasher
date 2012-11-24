window.onload = function () {

    //start crafty
    Crafty.init(400, 336);
    //Crafty.canvas.init();
    
    var mapSize = 32;
    var tileSize = 20;
    /*
    var persos = {
    	perso1: {
    		height: 54,
    		width: 54,
    		origin: 50,
    		width: 27,
    	},
    	perso2: {
    		height: 54,
    		width: 54,
    		origin: 50,
    		width: 27,
    	}];
*/
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
            })

	function finicharger() {
		var map = [];
		for( i=0;i<  mapSize; i++)
			map[i] = [];
		Crafty("MapTile").each(function(){map[this._x/20][this._y/20] = this; });
		
		initPersos(map);
		
	}

    //method to generate the map
    function generateWorld() {
        Crafty.e("TiledLevel").tiledLevel('map-test.json','DOM', finicharger);
    }

	Crafty.sprite( 54, "perso.png", {
		perso1: [0,0],
		perso2: [1,0]
	});
    //the loading screen that will display while our assets load
    Crafty.scene("loading", function () {
    	
    	Crafty.load(['perso.png'],function() {
    		
    		Crafty.scene("main");
    	});

        //black background with some loading text
        Crafty.background("#007");
        Crafty.e("2D, DOM, Text").attr({ w: 100, h: 20, x: 150, y: 120 })
                .text("Loading")
                .css({ "text-align": "center" });
    });



    Crafty.scene("main", function () {
        generateWorld();
        
        
    });

    //automatically play the loading scene
    Crafty.scene("loading");
};