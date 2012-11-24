(function(Crafty) {

	Crafty.c('Night',{
		init: function() {
			this.requires('Color');
			this.requires('Delay');
			this.alpha=0.3;

			this.hue=231;
			this.saturation=66;
			this.lightness=41;
			this.hueDest=25
			this.satDest=100;
			this.lightDest=100;

			this.numberOfStep = 200;

			this.setHsl();

			this.hueStep = (this.hue-this.hueDest)/this.numberOfStep;
			this.satStep = (this.saturation-this.satDest)/this.numberOfStep;
			this.lightStep = (this.lightness-this.lightDest)/this.numberOfStep;
			

			this.nightDirection = 'asc';
		},

		setHsl: function() {
			this.color('hsl('+this.hue+','+this.saturation+'%,'+this.lightness+'%)');
		},

		changeAlpha: function() {
			if (this.nightDirection === 'asc') {
				this.alpha = this.alpha + 0.01;
				if(this.alpha > 0.6)
					this.nightDirection = 'desc';
			}

			if (this.nightDirection === 'desc' && this.alpha > 0){
				
				if (this.alpha<0.3) {
					this.hue = this.hue + this.hueStep;
					if (this.hue > 360) {
						this.hue = 0;
					}
					this.saturation = this.saturation - this.satStep;
					this.lightness = this.lightness - this.lightStep;
					this.setHsl();
				} else {
					this.alpha = this.alpha - 0.01;
				}
			}
			if(this.hue != this.hueDest)
				this.delay(this.changeAlpha,50);

			return this;
		},	
	})
})(Crafty)

function createNight() {
	Crafty.e('2D, Night, DOM')
		.attr({x:0,y:0,w:1024,h:1024,z:40}).changeAlpha();
}