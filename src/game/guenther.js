game.module('game.guenther')
.body(function() {
	game.addAsset('dude.png');
	game.addAsset('neck.png');

	game.createClass('Guenther', {
		init: function(x, y, width, height) {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			this.jumpVel = 50;
			this.head =  new game.Sprite('dude.png', this.x, this.y, {
				anchor: {
					x: 0.5,
					y: 0.5
				},
				zIndex: 1
			});
			this.neck =  new game.Sprite('neck.png', this.x+2, this.y+87, {
				anchor: {
					x: 0.5,
					y: 0.5
				},
				zIndex: 9 
			});

			game.scene.addObject(this);

			this.neck.addTo(game.scene.stage);
			this.head.addTo(game.scene.stage);
			
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
			this.head.y = this.y;
		},

		jump: function() {
			this.body.velocity.add(0,-this.jumpVel);
		},

		tiltHead: function(angle) {
			console.log(this.head.rotation);	
			if (((this.head.rotation + angle)<=2.4) && ((this.head.rotation + angle) >= -0.1)) {
				this.head.rotation += angle;
			}else if (this.head.rotation>2.4){
				this.head.rotation = 2.4;
			}else if (this.head.rotation < -0.1){
				this.head.rotation = -0.1;
			}
		}

	})
})