Crafty.c("Jeu",{
			menu: null,
			bouton: null,
			teens: null,
			slasher: null,
			musique: null,
			panique: null,
			paused: false,
			tour: "pnj",
			tourPnjStarted: false,
			tourPnjNbMouvementsFinis: 0,
			stimulis: null,

			Pause:function(){
				if( this.menu )
			  		this.menu.css({ "display": "block" });
				if( this.bouton )
			  		this.bouton.css({ "display": "block" });
				if( this.teens )
			  		for( i in this.teens)
			  			if( this.teens[i] && this.teens[i].pause )
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
			  //Crafty.pause();
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

				this.paused = false;
				this.teens = Crafty.npc;
				var addMvtFini = function() {
					this.tourPnjNbMouvementsFinis++;
					//si tous les teens ont bougés c'est au tour du joueur
					if( this.tourPnjNbMouvementsFinis == this.teens.length ){
						this.tour = "joueur";
						this.tourPnjStarted = false;
						this.tourPnjNbMouvementsFinis = 0;
					}
				};
				
				
				
				var destPossibles = [];
				Crafty('Chiotte').each(function(){
					destPossibles[destPossibles.length] = this;
				});
				Crafty('Door').each(function(){
					destPossibles[destPossibles.length] = this;
				});
				Crafty('Telephone').each(function(){
					destPossibles[destPossibles.length] = this;
				});
				Crafty('Fenetre').each(function(){
					destPossibles[destPossibles.length] = this;
				});
				//dans la cuisine
				destPossibles[destPossibles.length] = Crafty.PathFinder.tiles[11][7];
				//dans la chambre
				destPossibles[destPossibles.length] = Crafty.PathFinder.tiles[21][6];
				//devant le canapé
				destPossibles[destPossibles.length] = Crafty.PathFinder.tiles[16][11];

				var pasfini = false
				//boucle sur les teens
				for( var t in this.teens ) {
					if( this.teens[t].movePath.length != 0 ){
						pasfini = true;
						continue;
					}
					//on copie les destinations (dans le doute)
					var tempDest = destPossibles;
					var destRestantes = [];
					
					//on ajoute les destinations qui n'ont pas été enlevés de la liste
					for( var d in tempDest ) {
						if( tempDest[d] != null ) {
							destRestantes[destRestantes.length] = tempDest[d];
						}
					}
					
					//on cherche notre destination dans le restant
					var dest = destRestantes[parseInt(Math.floor(Math.random()*destRestantes.length))];
					
					//on l'enleve de la liste pour le teen suivant
					for( var d in destPossibles )
						if( destPossibles[d] && destPossibles[d].x == dest.x && destPossibles[d].y == dest.y )
							destPossibles[d] = null;
					
					//le teen y va(et modifie son trajet si il y a collision avec une zone d'effet d'une action du joueur
					var locationIsBlocked = false;
					if(dest.__c['blocked']) {
						locationIsBlocked = 'blocked';
						dest.removeComponent('blocked');
					} else if (dest.__c['window']) {
						locationIsBlocked = 'window';
						dest.removeComponent('window');
					}

					var path = Crafty.PathFinder.calculatePath(this.teens[t],dest);
					if (!!locationIsBlocked){
						dest.addComponent(locationIsBlocked)
						path.pop();
					}
					this.teens[t].setMovePath(path);
					this.teens[t].moveTo();
				}

				if( pasfini )
					setTimeout( this.TourPNJ().bind( this), 5000 );
				
				this.tourPnjStarted = true;
				
				
				if( this.teens )
			  		for( i in this.teens){
			  			if( this.teens[i] && this.teens[i].resume)
			  			this.teens[i].resume();
			  		}
				if( this.slasher )
			  		this.slasher.resume();
			  	//animations des actions contre les teens
				if( this.animations )
			  		this.animations.resume();
				if( this.panique )
			  		this.panique.resume();
			  //Crafty.pause();
			  return this;
			},
			TourJoueur:function(){
			  this.paused = false;
			  
			  //apparition du bouton pour valider les actions du tour
			  
			  //enregistrement des actions du tour
			  var addStimuli = function( stimuli ) {
				  this.stimulis[this.stimulis.length] = stimuli;
			  };
			  
			  return this;
			},
			
			init:function(){
			  var _this = this;
			  this.requires("2D");
			  this.teens = [];
			  this.stimulis = [];
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
				  	if( this.nbpanique > 100 ) {
				  		this.nbpanique = 100;
				  		Crafty.trigger('PANIC');
				  	}
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

			  //Début du jeu
			  this.TourPNJ();

			}

		});
