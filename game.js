window.Jeu = null;
window.onload = function () {

    //start crafty
    Crafty.init(1024, 640);
    //Crafty.canvas.init();
    
    var mapSize = 32;
    var tileSize = 32;
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
		
		
		
	function finicharger() {
		var map = [];
		for( i=0;i<  mapSize; i++)
			map[i] = [];
		Crafty("MapTile").each(function(){
			map[this._x/tileSize][this._y/tileSize] = this; 
		});
		
		initPersos(map);
		
	}

    //method to generate the map
    function generateWorld() {
        Crafty.e("TiledLevel, Input").tiledLevel('assets/map.json','DOM',finicharger)
        	.bind('KeyDown', function (e) { 
			  	if (e.key == Crafty.keys['ESC']) 
			  		Jeu.Pause(); 
			  });;
    }

	Crafty.sprite( 54, "perso.png", {
		perso1: [0,0],
		perso2: [1,0]
    });
    
    //the loading screen that will display while our assets load
    Crafty.scene("loading", function () {
    	
    	Crafty.load(['perso.png','assets/sprites/traps.png'],function() {
    		
    		Crafty.scene("main");
    		
    	});

        //black background with some loading text
        Crafty.background("#fff");
        Crafty.e("2D, DOM, Text, color").attr({ w: 100, h: 20, x: 150, y: 120 })
                .text("Loading")
                .css({ "text-align": "center" });
    });


    Crafty.scene("main", function () {
    	Jeu = Crafty.e("Jeu");
        generateWorld();

        createTrap();

        createNight();
        
        //create our player entity with some premade components
        
    })

    //automatically play the loading scene
    Crafty.scene("loading");
};