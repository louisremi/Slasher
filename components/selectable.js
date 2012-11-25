(function(Crafty) {

	Crafty.c('Selectable',{
		
		selectEntity: function(callback) {
			/*
			if (!this.selectionOverlay){
				var attrSelect = {x:this._x,y:this._y,w:this._w,h:this._h,z:this._z+1};

				this.selectionOverlay = Crafty.e('2D,DOM,Color')
					.css({'border':'solid 2px #ffc600'})
					.attr(attrSelect);

				this.selectionOverlay.alpha = 0;
			}

			if (Crafty.selectedEntity != this && Crafty.selectedEntity) {
				Crafty.selectedEntity.selectionOverlay.alpha = 0;
			}

			this._toggleOverlay();
			if (Crafty.selectedEntity === this)
				Crafty.selectedEntity = undefined;
			else
				Crafty.selectedEntity = this;
			*/
			callback();

			return this;
		},

		_toggleOverlay: function() {
			if (this.selectionOverlay.alpha === 0)
				this.selectionOverlay.alpha = 0.8;
			else
				this.selectionOverlay.alpha = 0;
		},
	});
})(Crafty);