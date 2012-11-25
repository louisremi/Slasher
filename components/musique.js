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
					Crafty.audio.stop(this.playing[id]);
				this.playing = [];
				

				this.playing[this.playing.length] = "ingame";
				Crafty.audio.play( "ingame", -1, 1.0);
				
			  return this;
			},
			doubt:function(){
				for( id in this.playing ) 
					Crafty.audio.stop(this.playing[id]);
				this.playing = [];
					
				this.playing[this.playing.length] = "ingame2";
				Crafty.audio.play( "ingame2", -1, 1.0);
				
			  return this;
			},
			peur:function(){
				
				for( id in this.playing ) 
					Crafty.audio.stop(this.playing[id]);
				this.playing = [];
					
				this.playing[this.playing.length] = "ingame3";
				Crafty.audio.play( "ingame3", -1, 1.0);
				
			  return this;
			},
			panik:function(){
				for( id in this.playing ) 
					Crafty.audio.stop(this.playing[id]);
				this.playing = [];
					
				this.playing[this.playing.length] = "ingame4";
				Crafty.audio.play( "ingame4", -1, 0.5);
				
			  return this;
			},
			stop:function(){
				for( id in this.playing ) 
					Crafty.audio.stop(this.playing[id]);
				this.playing = [];
					
				
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
			  this.load( "ingame2", this.ingame, ["assets/sounds/in game2.wav","assets/sounds/in game2.ogg"] );
			  this.load( "ingame3", this.ingame, ["assets/sounds/in game3.wav","assets/sounds/in game3.ogg"] );
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
			  
			  
			  this.morts = {
			  		fille1:{ 
			  			musique: [], 
			  			play: function(){
							Crafty.audio.play( "Etudiante_Mort_01", 1, 1);
			  			}
			  		},
					fille2:{ 
			  			musique: [], 
			  			play: function(){
							Crafty.audio.play( "Etudiante_Mort_02", 1, 1);
			  			}
			  		},
					mec1:{ 
			  			musique: [], 
			  			play: function(){
							Crafty.audio.play( "Etudiant_Mort_01", 1, 1);
			  			}
			  		},
					mec2:{ 
			  			musique: [], 
			  			play: function(){
							Crafty.audio.play( "Etudiant_Mort_02", 1, 1);
			  			}
			  		},
					mec3:{ 
			  			musique: [], 
			  			play: function(){
							Crafty.audio.play( "Etudiant_Mort_03", 1, 1);
			  			}
			  		}
			  	
			  }
			  
			  
			  this.load( "Etudiant_Mort_01", this.morts.mec1.musique, ["assets/sounds/Etudiant_Mort_01.wav","assets/sounds/Etudiant_Mort_01.ogg"] );
			  this.load( "Etudiant_Mort_02", this.morts.mec2.musique, ["assets/sounds/Etudiant_Mort_02.wav","assets/sounds/Etudiant_Mort_02.ogg"] );
			  this.load( "Etudiante_Mort_01", this.morts.fille1.musique, ["assets/sounds/Etudiante_Mort_01.wav","assets/sounds/Etudiante_Mort_01.ogg"] );
			  this.load( "Etudiante_Mort_02", this.morts.fille2.musique, ["assets/sounds/Etudiante_Mort_01.wav","assets/sounds/Etudiante_Mort_01.ogg"] );
			  this.load( "Etudiant_Mort_03", this.morts.mec3.musique, ["assets/sounds/Etudiant_Mort_03.wav","assets/sounds/Etudiant_Mort_03.ogg"] );

			  this.peurs = {
			  		fille1:{ 
			  			musique: [], 
			  			play: function(){
							Crafty.audio.play( "Etudiante_Peur_01", 1, 1);
			  			}
			  		},
			  		fille2:{ 
			  			musique: [], 
			  			play: function(){
							Crafty.audio.play( "Etudiante_Peur_02", 1, 1);
			  			}
			  		},
					mec3:{ 
			  			musique: [], 
			  			play: function(){
							Crafty.audio.play( "Etudiant_Peur_01", 1, 1);
			  			}
			  		},
					mec1:{ 
			  			musique: [], 
			  			play: function(){
							Crafty.audio.play( "Etudiant_Peur_02", 1, 1);
			  			}
			  		},
					mec2:{ 
			  			musique: [], 
			  			play: function(){
							Crafty.audio.play( "Etudiant_Peur_03", 1, 1);
			  			}
			  		}
			  	
			  }
			  
			  
			  this.load( "Etudiant_Peur_01", this.peurs.mec1.musique, ["assets/sounds/Etudiant_Peur_01.wav","assets/sounds/Etudiant_Peur_01.ogg"] );
			  this.load( "Etudiant_Peur_02", this.peurs.mec2.musique, ["assets/sounds/Etudiant_Peur_02.wav","assets/sounds/Etudiant_Peur_02.ogg"] );
			  this.load( "Etudiante_Peur_01", this.peurs.fille1.musique, ["assets/sounds/Etudiante_Peur_01.wav","assets/sounds/Etudiante_Peur_01.ogg"] );
			  this.load( "Etudiante_Peur_02", this.peurs.fille1.musique, ["assets/sounds/Etudiante_Peur_02.wav","assets/sounds/Etudiante_Peur_02.ogg"] );
			  this.load( "Etudiant_Peur_03", this.peurs.mec3.musique, ["assets/sounds/Etudiant_Peur_03.wav","assets/sounds/Etudiant_Peur_03.ogg"] );

			  
			  

			},
			load: function( name, cat, url ) {
				cat[cat.length] = name;
				Crafty.audio.add( name, url );	
			}
		});
