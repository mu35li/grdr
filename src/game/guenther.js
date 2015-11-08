game.module('game.guenther')
.body(function() {
	game.addAsset('dude.png');
	game.addAsset('neck.png');

    /**
     * Our Guenther class; Guenther Jauch is a prominent german TV personality who,
     * among other things, starred in an advertisement by Krombacher beer to promote
     * saving the rainforest. By buying beer. Obviously.
     * So, on our game he becomes the hero and saves the rainforest by consuming as
     * much Krombacher as possible.
     * We do not intend to defame Mr. Jauch or imply any sort of irresposible behaviour
     * on his part. We do not suggest Mr. Jauch is an alcoholic; this work is not to be
     * taken seriously. In fact, nobody is allowed to look at it. It is for our amusement only.
     * So there.
     **/
	game.createClass('Guenther', {
        // amazing, state of the art constructor
		init: function(x, y, width, height) {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			this.jumpVel = 50;

            // give Guenther a head
			this.head =  new game.Sprite('dude.png', this.x, this.y, {
				anchor: {
					x: 0.5,
					y: 0.5
				},
				zIndex: 1
			});

            // ... and a neck
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
				shape: shape,
                collisionGroup:0,
                collideAgainst: [1]

			});
			this.mittelpunktX = this.head.position.x;
			this.mittelpunktY = this.head.position.y;

		},

		update: function() {
			//sin(angle)*radius+center
			var xBox = -Math.sin(this.head.rotation+1)*(67)+this.mittelpunktX;
			var yBox = Math.cos(this.head.rotation+1)*(67)+this.mittelpunktY;
			this.drinkBox.position.set(xBox, yBox);
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
