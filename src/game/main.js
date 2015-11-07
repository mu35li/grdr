game.module(
    'game.main'
)
.require('game.guenther')
.require('game.beer')
.body(function() {

    game.addAsset('logo.png');

    game.createScene('Main', {
        backgroundColor: 0xb9bec7,

        init: function() {
            this.rotSpeed = 1;

            this.world = new game.World();

            //instanciate the guenther
            this.guenther = new game.Guenther(0,0,0,0);
            // console.log(this.guenther);
            this.world.addBody(this.guenther.body);

            this.emitter = new game.Emitter();
            this.emitter.life = 1000;
            this.emitter.velRotate = 25;
            this.emitter.textures.push('beer.png');
            this.emitter.position.set(100, 100);
            this.emitter.positionVar.set(50, 50);
            this.emitter.addTo(game.scene.stage);
            game.scene.addEmitter(this.emitter);
        },

        update: function() {
            this.world.update();
            // console.log(this.guenther.sprite);
            // console.log(this.guenther.body.position);

            this.guenther.update();
            // console.log(this.guenther);
            // console.log("body pos: " + this.body.position.x + ", " + this.body.position.y);
            
            this.emitter.update();

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
