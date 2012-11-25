(function(Crafty) {

	var createSlasher() = function() {
		Crafty.Slasher = Crafty.e('Slasher,2D,Multiway,DOM')
	},

	Crafty.enterPanicMode = function() {
		this.screen = Crafty.e("2D, DOM, Text, Color,Tween").attr({ w: 1024, h: 600, x: 0, y: 0, z: 990 })
                 .color("#ddd")
                 .text("PANIC THE FUCK OUT")
                 .textColor("#000")
                 .css({ "text-align": "center"
                    , "padding-top": "250px"
                    , "font-size": "64pt"})
                 .tween({alpha:0.0},300);

        Jeu.musique.panic();

        Crafty.PathFinder.enterPanicMode();
    }

})(Crafty)