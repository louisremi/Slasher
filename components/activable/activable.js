(function(Crafty) {
	Crafty.c('Activable',{
		showRange:true,

		init: function() {
			this.requires('Selectable, Range, Delay');
		},

		addButton: function() {
			if(!this.activated)
				this.trigger('zob');

			this.activated = true;
			this.showRange = false;

			var self = this;
			this.delay(function() {
				this.showRange = true;
				self.activated = false;
			},5000);

			return this;
		},

		attract: function() {
			var atRange = this.search('Teenager');

			var attracted = atRange[Math.floor(Math.random()*atRange.length)];

			if( !attracted )
				return;
			
			var location;

			var locationIsBlocked = false;
			if(this.__c['blocked']) {
				locationIsBlocked = 'blocked';

				this.removeComponent('blocked');
			} else if (this.__c['window']) {
				locationIsBlocked = 'window';
				this.removeComponent('window');
			}

			location = this;

			if (!!location) {
				var path = Crafty.PathFinder.calculatePath(attracted,location);
				if (!!locationIsBlocked){
					this.addComponent(locationIsBlocked)
					path.pop();
				}
				attracted.setMovePath(path);
				attracted.moveTo();
			}

			Jeu.panique.addPanique(15);
		}
	})
})(Crafty)