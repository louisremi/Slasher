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
				locationIsBlocked = true;
				this.removeComponent('blocked');
			}

			location = this;

			location.addComponent('Color')

			if (!!location) {
				var path = Crafty.PathFinder.calculatePath(attracted,location);
				if (locationIsBlocked){
					this.addComponent('blocked');
					path.pop();
				}
				attracted.setMovePath(path);
				attracted.moveTo();
			}
		}
	})
})(Crafty)