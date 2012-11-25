Crafty.c("Jeu",{
			menu: null,
			bouton: null,
			teens: null,
			slasher: null,
			musique: null,
			panique: null,
			paused: false,
			tour: "pnj",
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
				if( this.panique )
			  		this.panique.pause();
			  this.paused = true;
			  Crafty.pause();
			  return this;
			},
			Resume:function(){
				if( this.musique )
			  		this.musique.jeu();
				if( this.menu )
			  		this.menu.css({ "display": "none" });
				if( this.bouton )
			  		this.bouton.css({ "display": "none" });
				if( this.tour == "pnj" )
				{
					this.TourPNJ();
				} else {
					this.TourJoueur();
				}
			  return this;
			},
			TourPNJ:function(){
				if( this.teens )
			  		for( i in this.teens){
			  			if( this.teens[i])
			  			this.teens[i].resume();
			  		}
				if( this.slasher )
			  		this.slasher.resume();
				if( this.animations )
			  		this.animations.resume();
				if( this.panique )
			  		this.panique.resume();
			  this.paused = false;
			  Crafty.pause();
			  return this;
			},
			TourJoueur:function(){
			  this.paused = false;
			  
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
			  
			  // Panique barre et gestion
			  this.panique = { 
			  	  nbpanique: 0,
			  	  //_timeoutpanik : null,
				  resume: function(){
				  	
				  }, 
				  pause: function() {
				  	
				  },
				  addPanique: function( pourcent ) {
				  	this.nbpanique += pourcent;
				  	if( this.nbpanique < 0 )
				  		this.nbpanique = 0;
				  	if( this.nbpanique > 100 )
				  		this.nbpanique = 100;
				  	//clearTimeout( this._timeoutpanik );
				  	this.refreshPanique();
				  },
				  refreshPanique: function() {
				  	this.reglette.w = parseInt(this.barre.w/(100/this.nbpanique));
				  	/*this._timeoutpanik = setTimeout( function() {
				  		this.addPanique( -1 );
				  	}.bind( this), 1000 );*/
				  },
				  barre: Crafty.e("2D, DOM, Image")
		             .attr({w: 481, h: 45, x: 80, y: 0, z: 50})
		             .image("assets/barrepanik.png")
		          ,
				  reglette: Crafty.e("2D, DOM, Color")
		             .attr({w: 0, h: 15, x: 80, y: 15, z: 50})
		             .color("#00F")
		          };
			  }
		});
