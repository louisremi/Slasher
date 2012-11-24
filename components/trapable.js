(function(Crafty) {

	Crafty.c('Trapable',{
		init: function() {
			this.requires('Mouse');

			this.bind('Click',function(e) {
				if (Crafty.selectedEntity && Crafty.selectedEntity.numberOfTraps > 0) {
					var newTrap = Crafty.selectedEntity.clone();
					newTrap.attr({x:this._x,y:this._y,z:this._z+1});
					Crafty.selectedEntity.consume();
				}
			})
		}
	})
})(Crafty);