(function(Crafty) {

	Crafty.c('Selectable',{
		
		selectEntity: function(callback) {
			if (!this.selectionOverlay){
				var attrSelect = {x:this._x,y:this._y,w:this._w,h:this._h,z:this._z+1};

				this.selectionOverlay = Crafty.e('2D,DOM,Color')
					.color("#00F")
					.attr(attrSelect);

				this.selectionOverlay.alpha = 0;
			}

			if (Crafty.selectedEntity != this && Crafty.selectedEntity) {
				Crafty.selectedEntity.selectionOverlay.alpha = 0;
			}

			this._toggleOverlay();
			Crafty.selectedEntity = this;

			callback();

			return this;
		},

		_toggleOverlay: function() {
			if (this.selectionOverlay.alpha === 0)
				this.selectionOverlay.alpha = 0.4;
			else
				this.selectionOverlay.alpha = 0;
		},
	});
})(Crafty);