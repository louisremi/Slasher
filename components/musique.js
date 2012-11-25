Crafty.c("Musique",{
			ingame: null,
			titre: null,
			peurs: null,
			morts: null,
			gameover: null,
			gamewin: null,
			slasher: null,
			playing: null,
			traps: null,

			panic: function() {
				Crafty.audio.play( "titre", 1, 0.7);
				this.playing[this.playing.length] = "titre";

				return this;
			},
			menu:function( precedent ){
				for( id in this.playing ) {
					Crafty.audio.togglePause(this.playing[id]);
				}
				this.playing = [];
				
				//var musique = this.titre[Math.floor((Math.random()*this.titre.length))]; 
				Crafty.audio.play( "ingame4", 1, 0.5);
				this.playing[this.playing.length] = "ingame4";
				Crafty.audio.play( "titre", 1, 0.7);
				this.playing[this.playing.length] = "titre";
				
				return this;
			},
			jeu:function(){
				for( id in this.playing ) 
					Crafty.audio.togglePause(this.playing[id]);
				this.playing = [];
					
				var musique = this.ingame[Math.floor((Math.random()*this.ingame.length))]; 
				this.playing[this.playing.length] = musique;
				Crafty.audio.play( musique, -1, 1.0);
				
			  return this;
			},
			peur:function(){
				
			  return this;
			},
			mort:function(){
				
			  return this;
			},
			init:function(){
			  var _this = this;
			  this.requires("Audio");
			  this.ingame = [];
			  this.peurs = [];
			  this.morts = [];
			  this.gameover = [];
			  this.gamewin = [];
			  this.slasher = [];
			  this.titre = [];
			  this.playing = [];
			  
			  
			  
			  this.load( "ingame", this.ingame, ["assets/sounds/ingame.wav","assets/sounds/ingame.ogg"] );
			  this.load( "ingame4", this.titre, ["assets/sounds/in game4.wav","assets/sounds/in game4.ogg"] );
			  this.load( "titre", this.titre, ["assets/sounds/Titre.wav","assets/sounds/Titre.ogg"] );
			  
			  
			  
			  this.traps = {
			  		floorTrap:{ 
			  			musique: [], 
			  			play: function(){
							Crafty.audio.play( "floorTrap", 1, 1);
			  			}
			  		},
					pieux:{ 
			  			musique: [], 
			  			play: function(){
							Crafty.audio.play( "pieux", 1, 1);
			  			}
			  		},
					marijuana:{ 
			  			musique: [], 
			  			play: function(){
							Crafty.audio.play( "marijuana", 1, 1);
			  			}
			  		},
					wolfTrap:{ 
			  			musique: [], 
			  			play: function(){
							Crafty.audio.play( "wolfTrap", 1, 1);
			  			}
			  		},
					acid:{ 
			  			musique: [], 
			  			play: function(){
							Crafty.audio.play( "acid", 1, 1);
			  			}
			  		}
			  	
			  }
			  
			  this.load( "floorTrap", this.traps.floorTrap.musique, "assets/sounds/GLASSBRK.WAV" );//["assets/sounds/floorTrap.wav","assets/sounds/floorTrap.ogg"] );
			  this.load( "pieux", this.traps.pieux.musique, "assets/sounds/GLASSBRK.WAV" );//["assets/sounds/pieux.wav","assets/sounds/pieux.ogg"] );
			  this.load( "marijuana", this.traps.marijuana.musique, "assets/sounds/GLASSBRK.WAV" );//["assets/marijuana.wav","assets/sounds/marijuana.ogg"] );
			  this.load( "wolfTrap", this.traps.wolfTrap.musique, "assets/sounds/GLASSBRK.WAV" );//["assets/sounds/wolfTrap.wav","assets/sounds/wolfTrap.ogg"] );
			  this.load( "acid", this.traps.acid.musique, "assets/sounds/GLASSBRK.WAV" );//["assets/sounds/acid.wav","assets/sounds/acid.ogg"] );
			  
			  
			  this.leurres = {
			  		telephone:{ 
			  			musique: [], 
			  			play: function(){
							Crafty.audio.play( "telephone", 1, 1);
			  			}
			  		},
					porte:{ 
			  			musique: [], 
			  			play: function(){
							Crafty.audio.play( "porte", 1, 1);
			  			}
			  		},
					robinet:{ 
			  			musique: [], 
			  			play: function(){
							Crafty.audio.play( "robinet", 1, 1);
			  			}
			  		},
					toilettes:{ 
			  			musique: [], 
			  			play: function(){
							Crafty.audio.play( "toilettes", 1, 1);
			  			}
			  		},
					fenetre:{ 
			  			musique: [], 
			  			play: function(){
							Crafty.audio.play( "fenetre", 1, 1);
			  			}
			  		},
					television:{ 
			  			musique: [], 
			  			play: function(){
							Crafty.audio.play( "television", 1, 1);
			  			}
			  		}
			  	
			  }
			  
			  
			  this.load( "telephone", this.leurres.telephone.musique, "assets/sounds/GLASSBRK.WAV" );//["assets/sounds/telephone.wav","assets/sounds/telephone.ogg"] );
			  this.load( "porte", this.leurres.porte.musique, "assets/sounds/GLASSBRK.WAV" );//["assets/sounds/porte.wav","assets/sounds/porte.ogg"] );
			  this.load( "robinet", this.leurres.robinet.musique, "assets/sounds/GLASSBRK.WAV" );//["assets/sounds/robinet.wav","assets/sounds/robinet.ogg"] );
			  this.load( "toilettes", this.leurres.toilettes.musique, "assets/sounds/GLASSBRK.WAV" );//["assets/sounds/toilettes.wav","assets/sounds/toilettes.ogg"] );
			  this.load( "fenetre", this.leurres.fenetre.musique, "assets/sounds/GLASSBRK.WAV" );//["assets/sounds/fenetre.wav","assets/sounds/fenetre.ogg"] );
			  this.load( "television", this.leurres.television.musique, "assets/sounds/GLASSBRK.WAV" );//["assets/sounds/television.wav","assets/sounds/television.ogg"] );
			  
			  

			},
			load: function( name, cat, url ) {
				cat[cat.length] = name;
				Crafty.audio.add( name, url );	
			}
		});
