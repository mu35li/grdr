game.module(
    'game.main'
)
.require('game.guenther')
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
        },

        update: function() {
            this.world.update();
            // console.log(this.guenther.sprite);
            // console.log(this.guenther.body.position);

            this.guenther.update();
            // console.log(this.guenther);
            // console.log("body pos: " + this.body.position.x + ", " + this.body.position.y);

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
