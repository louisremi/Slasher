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
							//Crafty.audio.play( "marijuana", 1, 1);
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
			  
			  this.load( "floorTrap", this.traps.floorTrap.musique, ["assets/sounds/porte.mp3","assets/sounds/porte.ogg"] );
			  this.load( "pieux", this.traps.pieux.musique, ["assets/sounds/piege a loup.mp3","assets/sounds/piege a loup.ogg"] );
			  //this.load( "marijuana", this.traps.marijuana.musique, ["assets/marijuana.mp3","assets/sounds/marijuana.ogg"] );
			  this.load( "wolfTrap", this.traps.wolfTrap.musique, ["assets/sounds/piege a loup.mp3","assets/sounds/piege a loup.ogg"] );
			  this.load( "acid", this.traps.acid.musique, ["assets/sounds/acide.mp3","assets/sounds/acide.ogg"] );
			  
			  
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
			  
			  
			  this.load( "telephone", this.leurres.telephone.musique, ["assets/sounds/telephone1.mp3","assets/sounds/telephone1.ogg"] );
			  this.load( "porte", this.leurres.porte.musique, ["assets/sounds/fenetre1.mp3","assets/sounds/fenetre1.ogg"] );
			  this.load( "robinet", this.leurres.robinet.musique, ["assets/sounds/FlushWater_01.mp3","assets/sounds/FlushWater_01.ogg"] );
			  this.load( "toilettes", this.leurres.toilettes.musique, ["assets/sounds/FlushWater_02.mp3","assets/sounds/FlushWater_02.ogg"] );
			  this.load( "fenetre", this.leurres.fenetre.musique, ["assets/sounds/fenetre1.mp3","assets/sounds/fenetre1.ogg"] );
			  this.load( "television", this.leurres.television.musique, ["assets/sounds/tvvintage.mp3","assets/sounds/tvvintage.ogg"] );
			  
			  

			},
			load: function( name, cat, url ) {
				cat[cat.length] = name;
				Crafty.audio.add( name, url );	
			}
		});
