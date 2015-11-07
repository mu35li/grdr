game.module('game.bottle')
.body(function() {
	game.addAsset('bottle.png');

	game.createClass('Bottle', {
		init: function(x, y, width, height) {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			this.bottle =  new game.Sprite('bottle.png', this.x, this.y, {
				anchor: {
					x: 0.5,
					y: 0.5
				},
				zIndex: 1
			});

			game.scene.addObject(this);

			this.bottle.addTo(game.scene.stage);
			
			var shape = new game.Rectangle(this.width, this.height);
			
			this.body = new game.Body({
				mass: 0.0,
				shape: shape,
				position: {
					x: this.x,
					y: this.y
				}
			});

		},

		update: function() {
			this.x = this.body.position.x;
			this.y = this.body.position.y;
			this.bottle.y = this.y;
		},


		tiltBottle: function(angle) {
			console.log(this.bottle.rotation);	
				this.bottle.rotation += angle;
		}

	})
})