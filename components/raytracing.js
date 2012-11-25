(function(Crafty){
	
	Crafty.c('RayTracing',{
		init: function() {

		},

		trace: function(origin,dest) {

			var line = {x:origin._x - dest._x,y:origin._y - dest._y};

			var normal = {x:-line.y,y:line.x};
			var norm = Math.sqrt(Math.pow(normal.x,2) + Math.pow(normal.y,2));
			normal = {x:normal.x*(Crafty.tileSize/2)/norm,y:normal.y*(Crafty.tileSize/2)/norm};

			var ray = new Crafty.polygon([origin._x+16 + (Crafty.tileSize/2) + (normal.x/2),origin._y+32+(Crafty.tileSize/2)-(normal.y/2)],
				[origin._x+16 + (Crafty.tileSize/2) - (normal.x/2),origin._y+32+(Crafty.tileSize/2)+(normal.y/2)],
				[dest._x+16 + (Crafty.tileSize/2) - (normal.x/2),dest._y+32+(Crafty.tileSize/2)+(normal.y/2)],
				[dest._x+16 + (Crafty.tileSize/2) + (normal.x/2),dest._y+32+(Crafty.tileSize/2)-(normal.y/2)]);

			return ray;
		},

		isVisible: function(filter,ray) {
			var selector = filter || "*";

			var result = true;
			Crafty(selector).each(function() {
				var center = {x:this._x+Crafty.tileSize/2,y:this._y+Crafty.tileSize/2};
				if(ray.containsPoint(center.x,center.y) || ray.containsPoint(this._x,this._y)) {
					result = false;
				}
			});

			return result;
		},
	});
})(Crafty)