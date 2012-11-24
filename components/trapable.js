(function(Crafty) {

	Crafty.c('Trapable',{
		init: function() {
			this.requires('Mouse');

			this.bind('Click',function(e) {
				/*if (Crafty.selectedEntity.numberOfTraps > 0) {
					var newTrap = Crafty.selectedEntity.clone();
					newTrap.attr({x:this._x,y:this._y,z:this._z+1});
					Crafty.selectedEntity.consume();
				}*/

				var tiles = Crafty.PathFinder.calculatePath(Crafty.PathFinder.tiles[2][2],this);
				for (var i = 0, j = tiles.length;i<j;i++) {
					Crafty.e('2D, DOM,Color')
						.attr({w:32,h:32,x:tiles[i]._x,y:tiles[i]._y,z:120})
						.color('#f00');
				}
			});
		}
	})
})(Crafty);