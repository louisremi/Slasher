Crafty.c("Jeu",{
			menu: null,
			bouton: null,
			teens: null,
			slasher: null,
			musique: null,
			paused: false,
			Pause:function(){
				if( this.menu )
			  		this.menu.css({ "display": "block" });
				if( this.bouton )
			  		this.bouton.css({ "display": "block" });
				if( this.teens )
			  		for( i in this.teens)
			  			this.teens[i].pause();
				if( this.slasher )
			  		this.slasher.pause();
				if( this.musique )
			  		this.musique.menu();
				if( this.animations )
			  		this.animations.pause();
			  paused = true;
			  return this;
			},
			Resume:function(){
				if( this.menu )
			  		this.menu.css({ "display": "none" });
				if( this.bouton )
			  		this.bouton.css({ "display": "none" });
				if( this.teens )
			  		for( i in this.teens)
			  			this.teens[i].resume();
				if( this.slasher )
			  		this.slasher.resume();
				if( this.musique )
			  		this.musique.jeu();
				if( this.animations )
			  		this.animations.resume();
			  paused = false;
			  return this;
			},
			init:function(){
			  var _this = this;
			  this.requires("2D");
			  this.teens = [];
			  this.menu = Crafty.e("2D, DOM, Text, Color").attr({ w: 1024, h: 600, x: 0, y: 0, z: 990 })
			  					 .color("#ddd")
				                 .text("Pause")
				                 .css({ "text-align": "center"
				                 	, "padding-top": "250px"
				                 	, "font-size": "64pt"
				                 	,"display": "none" });
			  this.bouton = Crafty.e("2D, DOM, Text, Color, Mouse").attr({ w: 200, h: 40, x: 412, y: 500, z: 991 })
			  					 .color("#4F4")
				                 .text("<p>Revenir au jeu</p>")
				                 .css({ "text-align": "center"
				                 	,"display": "none"})
				                 .bind("Click", function() {
				                 	_this.Resume();
				                 } );
			}
		});
