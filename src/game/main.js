game.module(
    'game.main'
)
.require('game.guenther')
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
            this.guenther = new game.Guenther(0,0,0,0);
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

            if (game.keyboard.down('RIGHT')) {
                this.guenther.tiltHead((Math.PI * 2 / (1/this.rotSpeed) * game.system.delta));
            }
            if (game.keyboard.down('LEFT')) {
                this.guenther.tiltHead(-(Math.PI * 2 / (1/this.rotSpeed) * game.system.delta));
            }
            if (game.keyboard.down('SPACE')) {
                this.guenther.jump();
            }
        }
    });

});
