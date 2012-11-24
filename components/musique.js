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

			},
			load: function( name, cat, url ) {
				cat[cat.length] = name;
				Crafty.audio.add( name, url );	
			}
		});
