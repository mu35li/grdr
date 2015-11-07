game.module(
    'game.main'
)
.require('game.guenther')
.require('game.bottle')
.body(function() {

    game.addAsset('logo.png');
    game.addAsset('beer.png');
    game.addAsset('foam.png');
    game.addAsset('regenwald.jpg');

    game.createScene('Main', {
        //backgroundColor: 0xb9bec7,
        backgroundImage: 0x000000,

        init: function() {
            var regenwald = new game.Sprite('regenwald.jpg').center().addTo(this.stage);
            this.rotSpeed = 1;

            this.world = new game.World();

            //instanciate the guenther
            this.guenther = new game.Guenther(850,600,100,100);
            this.bottle = new game.Bottle(400,400,100,100);
            // console.log(this.guenther);
            this.world.addBody(this.guenther.body);

        },

        update: function() {
            this.world.update();
            // console.log(this.guenther.sprite);
            // console.log(this.guenther.body.position);

            this.guenther.update();
            // console.log(this.guenther);
            // console.log("body pos: " + this.body.position.x + ", " + this.body.position.y);
            
            this.bottle.particleEmitter.update();
            this.bottle.update();

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
                this.bottle.tiltBottle((Math.PI * 2 / (1/this.rotSpeed*2) * game.system.delta));
            }
            if (game.keyboard.down('DOWN')) {
                this.bottle.tiltBottle(-(Math.PI * 2 / (1/this.rotSpeed*2) * game.system.delta));
            }

        }
    });

});
