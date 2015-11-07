game.module(
    'game.main'
)
.require('game.guenther')
.require('game.bottle')
.body(function() {

    game.addAsset('logo.png');
    game.addAsset('beer.png');
    game.addAsset('foam.png');

    game.createScene('Main', {
        //backgroundColor: 0xb9bec7,
        backgroundColor: 0x000000,

        init: function() {
            this.rotSpeed = 1;

            this.world = new game.World();

            //instanciate the guenther
            this.guenther = new game.Guenther(850,600,100,100);
            this.bottle = new game.Bottle(400,400,100,100);
            // console.log(this.guenther);
            this.world.addBody(this.guenther.body);

            this.emitter = new game.Emitter();
            this.emitter.velocityLimit = 0.1;
            this.emitter.life = 5000;
            this.emitter.startScale = 1.5;
            this.emitter.rate = 1;
            this.emitter.velRotate = 25;
            this.emitter.textures.push('beer.png');
            this.emitter.position.set(100, 100);
            this.emitter.positionVar.set(25, 50);
            this.emitter.target.set(100, 100);
            this.emitter.addTo(game.scene.stage);
            game.scene.addEmitter(this.emitter);

            this.foam = new game.Emitter();
            this.foam.velocityLimit = 0.1;
            this.foam.life = 400;
            this.foam.startScale = 1.5;
            this.foam.rate = 1;
            this.foam.velRotate = 25;
            this.foam.textures.push('foam.png');
            this.foam.position.set(100, 50);
            this.foam.positionVar.set(25, 10);
            this.foam.target.set(600, 0);
            this.foam.targetForce = 200;
            this.foam.addTo(game.scene.stage);
            game.scene.addEmitter(this.foam);

            var particleEmitterPoint = new game.Point(400, 400);
            this.particleEmitter = new game.Emitter({
                accelAngle: Math.PI/2,
                accelAngleVar: 0,
                accelSpeed: 98.1,
                accelSpeedVar: 2,
                active: false,
                angle: Math.PI*1.5,
                angleVar: 0.1,
                count: 100,
                duration: 10000,
                life: 5000,
                speed: 100,
                speedVar: 10,
                rate: 50,
                position: particleEmitterPoint
            });
            this.particleEmitter.textures.push('beer.png');
            this.particleEmitter.addTo(game.scene.stage);
            game.scene.addEmitter(this.particleEmitter);
        },

        update: function() {
            this.world.update();
            // console.log(this.guenther.sprite);
            // console.log(this.guenther.body.position);

            this.guenther.update();
            // console.log(this.guenther);
            // console.log("body pos: " + this.body.position.x + ", " + this.body.position.y);
            
            this.emitter.update();
            this.foam.update();
            this.particleEmitter.update();

            if (game.keyboard.down('RIGHT')) {
                this.guenther.tiltHead((Math.PI * 2 / (1/this.rotSpeed) * game.system.delta));
            }
            if (game.keyboard.down('LEFT')) {
                this.guenther.tiltHead(-(Math.PI * 2 / (1/this.rotSpeed) * game.system.delta));
            }
            if (game.keyboard.down('SPACE')) {
                this.guenther.jump();
            }
            if (game.keyboard.down('UP')) {
                this.bottle.tiltBottle((Math.PI * 2 / (1/this.rotSpeed) * game.system.delta));
            }
            if (game.keyboard.down('DOWN')) {
                this.bottle.tiltBottle(-(Math.PI * 2 / (1/this.rotSpeed) * game.system.delta));
            }

        }
    });

});
