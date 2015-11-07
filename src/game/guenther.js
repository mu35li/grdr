game.module('game.guenther')
.body(function() {
	game.addAsset('dude.png');

	game.createClass('Guenther', {
		init: function(x, y, width, height) {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			this.jumpVel = 50;
			this.sprite =  new game.Sprite('dude.png', this.x, this.y, {
				zIndex: 10
			});

			game.scene.addObject(this);

			this.sprite.addTo(game.scene.stage);
			
			var shape = new game.Rectangle(this.width, this.height);
			
			this.body = new game.Body({
				mass: 0.0,
				position: {
					x: this.x,
					y: this.y
				},
				shape: shape
			});
		},

		update: function() {
			this.x = this.body.position.x;
			this.y = this.body.position.y;
			this.sprite.y = this.y;
		},

		jump: function() {
			this.body.velocity.add(0,-this.jumpVel);
		},

		tiltHead: function(angle) {
			console.log(angle);
			this.sprite.rotation += angle;
		}

	})
})