(function(Crafty) {
	Crafty.c('Activable',{
		init: function() {
			this.requires('Selectable','Range');
		},

		addButton: function() {
			this.trigger('zob');
			return this;
		},

		attract: function() {
			var atRange = this.search('Teenager');

			var attracted = atRange[Math.floor(Math.random()*atRange.length)];

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