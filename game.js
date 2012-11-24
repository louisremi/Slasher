window.onload = function () {

    //start crafty
    Crafty.init(1000, 500);
    //Crafty.canvas.init();

    //method to generate the map
    function generateWorld() {
        Crafty.e("TiledLevel").tiledLevel('map-test.json','DOM');
    }

Crafty.sprite( 1, "perso.png", {
	perso: [ 26, 54 ,0,0]
	});
    //the loading screen that will display while our assets load
    Crafty.scene("loading", function () {
    	
    	Crafty.load(['perso.png'],function() {Crafty.scene("main");});

        //black background with some loading text
        Crafty.background("#fff");
        Crafty.e("2D, DOM, Text").attr({ w: 100, h: 20, x: 150, y: 120 })
                .text("Loading")
                .css({ "text-align": "center" });
    });



    Crafty.scene("main", function () {
        generateWorld();
        
        //create our player entity with some premade components
        var perso = Crafty.e("2D, DOM, Ape, perso")
                .attr({ x: 10, y: 10, z: 1 });
        
    });

    //automatically play the loading scene
    Crafty.scene("loading");
};