game.module('game.bottle')
.body(function() {
    game.addAsset('bottle.png');
    game.addAsset('beer.png');
    game.addAsset('beer2.png');
    game.addAsset('foam.png');

    game.createClass('Bottle', {
        beerTextures: ['beer.png', 'beer2.png'],
        foamTextures: ['foam.png'],

        maximumEmitterCount: 20,
        maximumEmitterRate: 10,

        /**
         * The bottle's initializer
         **/
        init: function(x, y, width, height) {
            // initialize our fill level to something high
            this.fill_level = 1000;

            // set positions
            this.initialPosX = x;
            this.initialPosY = y;

            this.x = x;
            this.y = y;

            this.angularVelocity = 0;

            this.width = width;
            this.height = height;

            // add sprite
            this.bottle =  new game.Sprite('bottle.png', this.x, this.y, {
                anchor: {
                    x: 0.5,
                    y: 0.5
                },
                zIndex: 1
            });

            // add our bottle to the scene
            game.scene.addObject(this);

            // ... and to the stage
            this.bottle.addTo(game.scene.stage);

            var shape = new game.Rectangle(this.width, this.height);

            // give our bottle a body, aka a physics object
            // TODO: why are we doing this again..?
            this.body = new game.Body({
                mass: 0.0,
                shape: shape,
                position: {
                    x: this.x,
                    y: this.y
                }
            });

            game.world.addBody(this.body);

            // create an emitter to emit beer.
            // Yay, beer!
            var particleEmitterPoint = new game.Point(this.x, this.y - 180);
            this.particleEmitter = new game.Emitter({
                accelAngle: Math.PI/2,
                accelAngleVar: 0,
                accelSpeed: 98.1,
                accelSpeedVar: 2,
                active: true,
                angle: Math.PI*1.5,
                angleVar: 0.1,
                count: 0,
                duration: 0,
                life: 3000,
                speed: 100,
                speedVar: 10,
                startScale: 2,
                rate: 0,
                position: particleEmitterPoint,
                positionVar: new game.Point(10, 10),
                startScale: 2,
                endScale: 2
            });
            this.particleEmitter.textures = this.beerTextures;
            this.particleEmitter.addTo(game.scene.stage);
            game.scene.addEmitter(this.particleEmitter);
            this.counter = 0;
            this.sideTween = new game.Tween(this.body.position);
            this.sideTween.to({x: 600}, 1500);
            this.sideTween.repeat(100000);
            this.sideTween.yoyo();
            this.sideTween.start();

        },

        update: function() {
            // if the bottle is too far out of our screen (because it has been discarded
            // in getFreshDrink()), reset it
            if (this.body.position.x < -500) {
                this.body.position.x = this.initialPosX;
                this.body.position.y = this.initialPosY;
                this.body.mass = 0;
                this.body.velocity.set(0, 0);
                this.angularVelocity = 0;
                this.bottle.rotation = 0;
                this.particleEmitter.textures = this.beerTextures;
                this.sideTween.resume();
            }


            // calculate/fetch position and rotation
            this.x = this.body.position.x;
            this.y = this.body.position.y;
            this.bottle.rotation += this.angularVelocity * game.system.delta;
            this.bottle.x = this.x;
            this.bottle.y = this.y;

            // calculate the emitter's position
            // the magic number 190 is based on the height of the bottle sprite
            // (which is roughly 2 * 190)
            var xBottle = Math.sin(this.bottle.rotation)*(190)+this.x;
            var yBottle = (-Math.cos(this.bottle.rotation))*(190)+this.y  ;
            this.particleEmitter.position.set(xBottle, yBottle);
            this.particleEmitter.angle = this.bottle.rotation - Math.PI*0.5;

            // some cosine magic to determine wether the emitter should fire (emit beer)
            // basically, only emit beer if the bottle's opening is tilted somewhere between 90 and 270 degrees
            // ... or however much that is in radians...
            this.particleEmitter.count = this.maximumEmitterCount * Math.max(0, -Math.cos(this.bottle.rotation))
            this.particleEmitter.rate = this.maximumEmitterRate * Math.max(0, -Math.cos(this.bottle.rotation))
            
            // if the bottle is empty, we need a new one!
            if (this.fill_level == 0) {
                this.getFreshDrink();
            }

            // if we're emitting particles, reduce the fill level
            if (this.particleEmitter.rate != 0) {
                this.fill_level -= 1;
            }
        },

        /**
         * Discard the current bottle and fetch a new one.
         **/
        getFreshDrink: function() {
            //this.particleEmitter.active = false;
            this.sideTween.pause();
            this.body.mass = 1;
            this.body.velocity.add(-400, -300);
            this.angularVelocity = 2 * Math.PI;
            this.particleEmitter.textures = this.foamTextures;

            // update number of finished bottles
            game.scene.finished_bottles += 1;

            // reset fill level
            this.fill_level = 1000;

            // increment drunkness level

        },

        /**
         * Tilt the bottle by the specified angle.
         **/
        tiltBottle: function(angle) {
            this.bottle.rotation += angle;
        },

        /**
         * move bottle left and right
         */
        moveBottle: function(distance) {
        }
    });
});
