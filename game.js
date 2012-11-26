
window.onload = function () {

    //start crafty
    Crafty.init(1408, 896);

    Crafty.mapSize = {w:22,h:14};
    Crafty.tileSize = 64;
    Crafty.npc = [];

    musique= Crafty.e("Musique");

	function finicharger() {
        musique = Crafty.e("Musique");
        musique.jeu();

		var map = [];
		for( i=0;i<  Crafty.mapSize.w; i++)
			map[i] = [];
		Crafty("MapTile").each(function(){
			map[this._x/Crafty.tileSize][this._y/Crafty.tileSize] = this.tilePos(); 
		});

        Crafty('blocked').each(function() {
            this.addComponent('Collision');
            this.collision([0,64],[64,64],[64,0],[0,0]);
        })


        Crafty.PathFinder = Crafty.e('AStar, PathFinder').setTiles(map);
        Crafty.RayTracer = Crafty.e('RayTracing');
        
        Crafty('Teenager').each(function() {
            Crafty.npc.push(this);
        })

        Crafty('Teenager').each(function() {
            this.checkFriend();
        })

        
        

	}

    function enterPanicMode() {
        Crafty.enterPanicMode();
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
            'assets/sprites/ecran-accueil.png',
            'assets/sprites/ecran-credits.png',
            'assets/sprites/ecran-scores.png',
            'assets/sprites/texture64.png',
            'assets/sprites/teenagers.png',
            'assets/map.json',
            'assets/sprites/barreEmpty.png',
            'assets/sprites/barreFull.png',
            'assets/sprites/slasher.png',
            'assets/sprites/onoClac.png',
            'assets/sprites/onoPsht.png',
            'assets/sprites/onoFlush.png',
            'assets/sprites/onoDring.png',
            'assets/sprites/traps.png'
            ],function() {

    		
    		Crafty.scene("ecran");
    		
    	});

        //black background with some loading text
        Crafty.background("#fff");
        Crafty.e("2D, DOM, Text, color").attr({ w: 100, h: 20, x: 150, y: 120 })
                .text("Loading")
                .css({ "text-align": "center" });
    });


    Crafty.scene("ecran", function () {
        
        musique.peur();

        Crafty.e("2D, DOM, Image, Mouse").attr({ w: 1440, h: 900, x: 0, y: 0 })
                .image("assets/sprites/ecran-accueil.png")
                ;
                Crafty.e( "2D, DOM,Mouse").attr({ w: 1440, h: 450, x: 0, y: 0 }).bind("Click", function() {

                    musique.stop();
                    Crafty.scene("main");
                });
                Crafty.e( "2D,DOM, Mouse").attr({ w: 1440, h: 450, x: 0, y: 450 }).bind("Click", function() {
                    musique.stop();
                    Crafty.scene("credits");
                });

        //createNight();
        
        //create our player entity with some premade components
    });

    Crafty.scene("credits", function () {
        musique.doubt();
        Crafty.e("2D, DOM, Image, Mouse").attr({ w: 1440, h: 900, x: 0, y: 0 })
                .image("assets/sprites/ecran-credits.png").bind("Click", function() {
                    musique.stop();
                    Crafty.scene("ecran");
                });

        //createNight();
        
        //create our player entity with some premade components
    });

    Crafty.scene("over", function () {
        musique.doubt();
        Crafty.e("2D, DOM, Image, Mouse").attr({ w: 1440, h: 900, x: 0, y: 0 })
                .image("assets/sprites/ecran-scores.png").bind("Click", function() {
                    musique.stop();
                    Crafty.scene("ecran");
                });

        //createNight();
        
        //create our player entity with some premade components
    });

    Crafty.scene("main", function () {

        Crafty.trapLefts = 5;
        Crafty.panic = false;
        Crafty.deaths = 0;
        Crafty.escaped = 0;

        InventoryLoad();
        Crafty.e("Inventory");
        Crafty.e("Teenagers");

        generateWorld();

        //createNight();
        
        //create our player entity with some premade components
    });
    Crafty.bind('NpcDead', function() {
        Crafty.deaths++;
        if(Crafty.deaths+Crafty.escaped >=5) {
            Crafty.scene("over");
        }
    });

    Crafty.bind('NpcEscape', function() {
        Crafty.escaped++;
        if(Crafty.deaths+Crafty.escaped >=5) {
            Crafty.scene("over");
        }
    })

    Crafty.bind('PANIC',enterPanicMode);

    //automatically play the loading scene
    Crafty.scene("loading");
};