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
            this.logo = new game.Sprite('logo.png').addTo(this.stage);
            this.logo.anchor.set(0.5, 0.5);
            this.logo.center();
            this.rotSpeed = 1;

            this.done = 0;
            this.world = new game.World();

            var body = new game.Body();

            // Set body position
            body.position.x = 200;
            body.position.y = 200;

            // Set body mass, so it will fall
            body.mass = 1;

            // Create new shape with size of 100px x 100px
            var shape = new game.Rectangle(100, 100);

            // Add shape to body
            body.addShape(shape);

            // Add body to world
            this.world.addBody(body);

            this.body = body;

            //instanciate the guenther
            this.guenther = new game.Guenther(0,0,0,0);
            // console.log(this.guenther);
            this.world.addBody(this.guenther.body);


            // console.log(this.guenther);
            
            //this.beer = [];
            //for (i = 0; i < 20; i++) {
            //    this.beer.push(new game.Beer(50, 50, 5, 5));
            //    this.world.addBody(this.beer[i].body);
            //}

            this.emitter = new game.Emitter();
            this.emitter.life = 0;
            this.emitter.velRotate = 25;
            this.emitter.textures.push('beer.png');
            this.emitter.position.set(100, 100);
            this.emitter.positionVar.set(50, 50);
            this.emitter.addTo(game.scene.stage);
            game.scene.addEmitter(this.emitter);

            for (i = 0; i < 20; i++) {
                this.emitter.addParticle();
            }
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
                this.logo.rotation += (Math.PI * 2 / (1/this.rotSpeed) * game.system.delta);
                this.guenther.tiltHead((Math.PI * 2 / (1/this.rotSpeed) * game.system.delta));
            }
            if (game.keyboard.down('LEFT')) {
                this.logo.rotation -= (Math.PI * 2 / (1/this.rotSpeed) * game.system.delta);
                this.guenther.tiltHead(-(Math.PI * 2 / (1/this.rotSpeed) * game.system.delta));
            }
            if (game.keyboard.down('SPACE')) {
                this.guenther.jump();
            }
        }
    });

});
