window.Jeu = null;
window.onload = function () {

    //start crafty
    Crafty.init(1024, 640);
    //Crafty.canvas.init();
    
    var mapSize = 32;
    var tileSize = 32;

    Crafty.mapSize = {w:32,h:20};
    Crafty.tileSize = 32;

	function finicharger() {
		var map = [];
		for( i=0;i<  mapSize; i++)
			map[i] = [];
		Crafty("MapTile").each(function(){
			map[this._x/tileSize][this._y/tileSize] = this.tilePos(); 
		});
		
		/*Crafty.PathFinder = Crafty.e('AStar, PathFinder').setTiles(map);

        var move = true;
        Crafty('Teenager').each(function() {
            this.moveRandom();
        })*/

        Crafty('telephone').each(function() {
            this.addComponent('Telephone, Range, Mouse')
                .range(5)
                .bind('Click', function() {
                    this.selectEntity(this.addButton.bind(this));
                });
        });

        Crafty('door').each(function() {
            this.addComponent('Door, Range, Mouse')
                .range(5)
                .bind('Click', function() {
                    this.selectEntity(this.addButton.bind(this));
                });
        });

        Crafty('chiotte').each(function() {
            this.addComponent('Chiotte, Range, Mouse')
                .range(5)
                .bind('Click', function() {
                    this.selectEntity(this.addButton.bind(this));
                });
        });


        Crafty('window').each(function() {
            this.addComponent('Fenetre, Range, Mouse')
                .range(5)
                .bind('Click', function() {
                    this.selectEntity(this.addButton.bind(this));
                });
        });
	}

    //method to generate the map
    function generateWorld() {
        Crafty.e("TiledLevel, Input").tiledLevel('assets/map.json?v'+ (Math.random() * 1E9 |0) ,'DOM',finicharger)
        	.bind('KeyDown', function (e) { 
			  	if (e.key == Crafty.keys['ESC']) 
			  		Jeu.Pause(); 
			  });;
    }

	Crafty.sprite( 54, "assets/sprites/perso.png", {
		perso1: [0,0],
		perso2: [1,0]
    });
    
    //the loading screen that will display while our assets load
    Crafty.scene("loading", function () {

    	Crafty.load(['assets/sprites/perso.png','assets/sprites/traps.png'],function() {
    		
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
    	Jeu.musique = Crafty.e("Musique");
    	Jeu.musique.jeu();
    	
        generateWorld();

        createTrap();

        //createNight();
        
        //create our player entity with some premade components
        
    })

    //automatically play the loading scene
    Crafty.scene("loading");
};