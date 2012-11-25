(function(Crafty) {
	Crafty.c('Afraidable',{
		init:function() {},

		setSound:function(url) {
			Crafty.audio.add(url,url);
			this.audioId = url;
		},

		afraid: function() {
			if(!!this.audioId)
				Crafty.audio.play(this.audioId,1,1);
		}
	}) 
})(Crafty)