(function(Crafty) {

Crafty.c("Range", {
	init: function() {
		var halfTile =  Crafty.tileSize/2;

		//this.range = this._w;
		this.rangeVisualization = Crafty.e( "2D, DOM, Color, RangeVisualization" )
			.attr({x: this._x, y: this._y});
		this.rangeVisualization.visibleZ = this._z + 1;

		this.requires("Mouse")
			.bind("MouseOver", function() {
				this.rangeVisualization.show();
			})
			.bind("MouseOut", function() {
				this.rangeVisualization.hide();
			});
	},

	range: function( value ) {
		// setter
		if ( value !== undefined ) {
			this.range = this.rangeVisualization.range = value;
			this.rangeCircle = new Crafty.circle( this._x, this._y, this.range * Crafty.tileSize );

			return this;
		}
		// getter
		return value;

	},

	search: function( filter ) {
		var self = this,
			all = Crafty( filter || "*" ),
			inRange = [];

		all.each(function( entity, zob, merde ) {
			var center = [
				this._x + this._w/2,
				this._y + this._h/2
			];

			if ( self.rangeCircle.containsPoint( center[0], center[1] ) ) {
				inRange.push( this );
			}
		});

		return inRange;
	}
});

Crafty.c("RangeVisualization", {
	init: function() {
		this.color( this.rangeColor || "#F00" );
		this.alpha = 0;
		this.visibleAlpha = 0.4;
		this.attr({z: -1});

		// make this element a circle by adding rounded corners
		this._element.style.borderRadius = "100%";
	},

	draw: function() {
		var style = this._element.style,
			centerCorrection = - ( this.range - 1 ) * Crafty.tileSize;

		if (this._cssStyles.visibility != this._visible) {
			this._cssStyles.visibility = this._visible;
			if (!this._visible) {
				style.visibility = "hidden";
			} else {
				style.visibility = "visible";
			}
		}

		if (this._cssStyles.left != this._x) {
			this._cssStyles.left = this._x;
			style.left = ~~( this._x + centerCorrection ) + "px";
		}
		if (this._cssStyles.top != this._y) {
			this._cssStyles.top = this._y;
			style.top = ~~( this._y + centerCorrection ) + "px";
		}

		if (this._cssStyles.width != ( this.range - 0.5 ) * Crafty.tileSize * 2 ) {
			this._cssStyles.width = ( this.range - 0.5 ) * Crafty.tileSize * 2;
			style.width = ~~(this._cssStyles.width) + "px";
			style.height = ~~(this._cssStyles.width) + "px";
		}

		if (this._cssStyles.zIndex != this._z) {
			this._cssStyles.zIndex = this._z;
			style.zIndex = this._z;
		}

		if (this._cssStyles.opacity !== this._alpha) {
			this._cssStyles.opacity = this._alpha;
			style.opacity = this._alpha;
			// screw you IE8
			//style[prefix + "Opacity"] = this._alpha;
		}

		this.trigger("Draw", { style: style, type: "DOM", co: {} });

		return this;
	},

	show: function() {
		this.alpha = this.visibleAlpha;
		this.attr({z: this.visibleZ});

		return this;
	},

	hide: function() {
		this.alpha = 0;
		this.attr({z: -1});

		return this;
	}
});

})(Crafty);