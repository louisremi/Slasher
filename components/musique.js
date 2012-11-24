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
			jeu:function( precedent ){
				for( id in this.playing ) 
					Crafty.audio.togglePause(this.playing[id]);
				this.playing = [];
					
				var musique = this.ingame[Math.floor((Math.random()*this.ingame.length))]; 
				this.playing[this.playing.length] = musique;
				Crafty.audio.play( musique, 1, 1.0, this.jeu.bind( this));
				
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
			  
			  
			  
			  this.load( "ingame", this.ingame, ["assets/ingame.wav","assets/ingame.ogg"] );
			  this.load( "ingame4", this.titre, ["assets/in game4.wav","assets/in game4.ogg"] );
			  this.load( "titre", this.titre, ["assets/Titre.wav","assets/Titre.ogg"] );
			  
			  
			  
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
			  
			  this.load( "floorTrap", this.traps.floorTrap.musique, "assets/GLASSBRK.WAV" );//["assets/floorTrap.wav","assets/floorTrap.ogg"] );
			  this.load( "pieux", this.traps.pieux.musique, "assets/GLASSBRK.WAV" );//["assets/pieux.wav","assets/pieux.ogg"] );
			  this.load( "marijuana", this.traps.marijuana.musique, "assets/GLASSBRK.WAV" );//["assets/marijuana.wav","assets/marijuana.ogg"] );
			  this.load( "wolfTrap", this.traps.wolfTrap.musique, "assets/GLASSBRK.WAV" );//["assets/wolfTrap.wav","assets/wolfTrap.ogg"] );
			  this.load( "acid", this.traps.acid.musique, "assets/GLASSBRK.WAV" );//["assets/acid.wav","assets/acid.ogg"] );
			  
			  
			  this.leurres = {
			  		telephone:{ 
			  			musique: [], 
			  			play: function(){
							Crafty.audio.play( "telephone", 1, 1);
							console.log("appel piege : telephone");
			  			}
			  		},
					porte:{ 
			  			musique: [], 
			  			play: function(){
							Crafty.audio.play( "porte", 1, 1);
							console.log("appel piege : porte");
			  			}
			  		},
					robinet:{ 
			  			musique: [], 
			  			play: function(){
							Crafty.audio.play( "robinet", 1, 1);
							console.log("appel piege : robinet");
			  			}
			  		},
					toilettes:{ 
			  			musique: [], 
			  			play: function(){
							Crafty.audio.play( "toilettes", 1, 1);
							console.log("appel piege : toilettes");
			  			}
			  		},
					fenetre:{ 
			  			musique: [], 
			  			play: function(){
							Crafty.audio.play( "fenetre", 1, 1);
							console.log("appel piege : fenetre");
			  			}
			  		}
			  	
			  }
			  
			  
			  this.load( "telephone", this.leurres.telephone.musique, "assets/GLASSBRK.WAV" );//["assets/telephone.wav","assets/telephone.ogg"] );
			  this.load( "porte", this.leurres.porte.musique, "assets/GLASSBRK.WAV" );//["assets/porte.wav","assets/porte.ogg"] );
			  this.load( "robinet", this.leurres.robinet.musique, "assets/GLASSBRK.WAV" );//["assets/robinet.wav","assets/robinet.ogg"] );
			  this.load( "toilettes", this.leurres.toilettes.musique, "assets/GLASSBRK.WAV" );//["assets/toilettes.wav","assets/toilettes.ogg"] );
			  this.load( "fenetre", this.leurres.fenetre.musique, "assets/GLASSBRK.WAV" );//["assets/fenetre.wav","assets/fenetre.ogg"] );
			  
			  

			},
			load: function( name, cat, url ) {
				cat[cat.length] = name;
				Crafty.audio.add( name, url );	
			}
		});
