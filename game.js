window.Jeu = null;
window.onload = function () {

    //start crafty
    Crafty.init(1408, 896);

    Crafty.mapSize = {w:22,h:14};
    Crafty.tileSize = 64;
    Crafty.npc = [];

	function finicharger() {
		var map = [];
		for( i=0;i<  Crafty.mapSize.w; i++)
			map[i] = [];
		Crafty("MapTile").each(function(){
			map[this._x/Crafty.tileSize][this._y/Crafty.tileSize] = this.tilePos(); 
		});

        Crafty.PathFinder = Crafty.e('AStar, PathFinder').setTiles(map);
        Crafty.RayTracer = Crafty.e('RayTracing');
		
        Crafty('Teenager').each(function() {
            Crafty.npc.push(this);
        })

        Crafty('Teenager').each(function() {
            this.checkFriend();
        })


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

        Crafty('television').each(function() {
            this.addComponent('Television, Range, Mouse')
                .range(5)
                .bind('Click', function() {
                    this.selectEntity(this.addButton.bind(this));
                });
        });

        
        Jeu = Crafty.e("Jeu");
        Jeu.musique = Crafty.e("Musique");
        Jeu.musique.jeu();

	}

    function enterPanicMode() {
        this.screen = Crafty.e("2D, DOM, Text, Color,Tween").attr({ w: 1024, h: 600, x: 0, y: 0, z: 990 })
                 .color("#ddd")
                 .text("PANIC THE FUCK OUT")
                 .css({ "text-align": "center"
                    , "padding-top": "250px"
                    , "font-size": "64pt"})
                 .tween({alpha:0.0},100);

        Jeu.musique.panic();

        //Crafty.Slasher = Crafty.e('Slasher,2D,Multiway,DOM')

        Crafty.PathFinder.enterPanicMode();
    }

    //method to generate the map
    function generateWorld() {
        Crafty.e("TiledLevel, Input").tiledLevel('assets/map.json?v'+ (Math.random() * 1E9 |0) ,'DOM',finicharger)
        	.bind('KeyDown', function (e) { 
			  	if (e.key == Crafty.keys['ESC']) 
			  		if( Jeu.paused )
			  			Jeu.Resume();
			  		else
			  			Jeu.Pause(); 
			  });
    }

    
    //the loading screen that will display while our assets load
    Crafty.scene("loading", function () {

    	Crafty.load([
            'assets/sprites/texture64.png',
            'assets/sprites/textureTeenagers64.png',
            'assets/sprites/zob.png',
            'assets/map.json',
            'assets/sprites/barreEmpty.png',
            'assets/sprites/barreFull.png',
            'assets/sprites/slasher.png',
            'assets/sprites/traps.png'
            ],function() {

    		
    		Crafty.scene("main");
    		
    	});

        //black background with some loading text
        Crafty.background("#fff");
        Crafty.e("2D, DOM, Text, color").attr({ w: 100, h: 20, x: 150, y: 120 })
                .text("Loading")
                .css({ "text-align": "center" });
    });


    Crafty.scene("main", function () {

        generateWorld();

        Crafty.e("Inventory");
        Crafty.e("")

        //createNight();
        
        //create our player entity with some premade components
    });

    Crafty.bind('PANIC',enterPanicMode);

    //automatically play the loading scene
    Crafty.scene("loading");
};