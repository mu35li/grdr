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

			this.drinkBoxPoint = new game.Vector(this.head.position.x-60, this.head.position.y+35);
			this.drinkBox = new game.Body({
				position: this.drinkBoxPoint, 
				shape: shape

			});
			this.mittelpunktX = this.head.position.x;
			this.mittelpunktY = this.head.position.y;

		},

		update: function() {
			//sin(winkel)*radius+mittelpunkt
			var xBox = -Math.sin(this.head.rotation+1)*(67)+this.mittelpunktX;
			var yBox = Math.cos(this.head.rotation+1)*(67)+this.mittelpunktY;
			this.drinkBox.position.set(xBox, yBox);
			console.log(yBox);	
		},


		tiltHead: function(angle) {
			if (((this.head.rotation + angle)<=2.4) && ((this.head.rotation + angle) >= -0.1)) {
				this.head.rotation += angle;
			}else if (this.head.rotation>2.4){
				this.head.rotation = 2.4;
			}else if (this.head.rotation < -0.1){
				this.head.rotation = -0.1;
			}
		}

	});
});