game.module('game.bottle')
.body(function() {
	game.addAsset('bottle.png');
	game.addAsset('beer.png');
	game.addAsset('beer2.png');
	game.addAsset('foam.png');

	game.createClass('Bottle', {
		init: function(x, y, width, height) {
			this.x = x;
			this.y = y;

			this.angularVelocity = 0;

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

			game.world.addBody(this.body);

			var particleEmitterPoint = new game.Point(this.x, this.y - 180);
			this.particleEmitter = new game.Emitter({
			    accelAngle: Math.PI/2,
			    accelAngleVar: 0,
			    accelSpeed: 98.1,
			    accelSpeedVar: 2,
			    active: true,
			    angle: Math.PI*1.5,
			    angleVar: 0.1,
			    count: 20,
			    duration: 0,
			    life: 3000,
			    speed: 100,
			    speedVar: 10,
					startScale: 2,
			    rate: 10,
			    position: particleEmitterPoint,
					positionVar: new game.Point(10, 10),
					startScale: 2,
					endScale: 2
			});
			this.particleEmitter.textures = ['beer.png', 'beer2.png'];
			this.particleEmitter.addTo(game.scene.stage);
			game.scene.addEmitter(this.particleEmitter);

		},

		update: function() {
			this.x = this.body.position.x;
			this.y = this.body.position.y;
			this.bottle.rotation += this.angularVelocity * game.system.delta;
			this.bottle.x = this.x;
			this.bottle.y = this.y;
			var xBottle = Math.sin(this.bottle.rotation)*(190)+this.x;
			var yBottle = (-Math.cos(this.bottle.rotation))*(190)+this.y  ;
			this.particleEmitter.position.set(xBottle, yBottle);
			this.particleEmitter.angle = this.bottle.rotation - Math.PI*0.5;
		},

		getFreshDrink: function() {
			//this.particleEmitter.active = false;
			this.body.mass = 1;
			this.body.velocity.add(-400, -300);
			this.angularVelocity = 2 * Math.PI;
			this.particleEmitter.textures = ['foam.png'];
		},

		tiltBottle: function(angle) {
				this.bottle.rotation += angle;
		}

	})
})
