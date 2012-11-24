window.onload = function () {

    //start crafty
    Crafty.init(400, 336);
    //Crafty.canvas.init();

    //method to generate the map
    function generateWorld() {
        Crafty.e("TiledLevel").tiledLevel('.json','DOM');
    }

    //the loading screen that will display while our assets load
    Crafty.scene("loading", function () {

        //black background with some loading text
        Crafty.background("#000");
        Crafty.e("2D, DOM, Text").attr({ w: 100, h: 20, x: 150, y: 120 })
                .text("Loading")
                .css({ "text-align": "center" });
    });



    Crafty.scene("main", function () {
        generateWorld();
        
        /*//create our player entity with some premade components
        var player1 = Crafty.e("2D, DOM, Ape, player, LeftControls, BombDropper")
                .attr({ x: 16, y: 304, z: 1 })
                .leftControls(1)
                .Ape();
        
        //create our player entity with some premade components
        var player2 = Crafty.e("2D, DOM, Ape, player, RightControls, BombDropper")
                .attr({ x: 368, y: 16, z: 1 })
                .rightControls(1)
                .bombDropper(Crafty.keys.ENTER)
                .Ape();*/
    });

    //automatically play the loading scene
    Crafty.scene("main");
};