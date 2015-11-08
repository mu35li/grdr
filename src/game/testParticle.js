game.module('game.testParticle')
.body(function() {

    /**
     * Test Particle class. It's not for testing purposes as in testing wether the game works,
     * but rather for testing for collisions. Because we have sane naming conventions. Shut up.
     **/
    game.createClass('TestParticle', {
        init: function(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.testShape = new game.Rectangle(5, 5);

            var particleEmitter = game.scene.bottle.particleEmitter;
            var positionX = particleEmitter.position.x;
            var positionY = particleEmitter.position.y;
            this.body = new game.Body({
                mass: 0,
                position: {
                    x: positionX,
                    y: positionY
                },
                collideAgainst: [0],
                collisionGroup: 1,
                shape: this.testShape,
            });
            if (particleEmitter.rate > 0) {
            this.body.force.add(0,98.1);

            var speedVector = new game.Vector(100,0).rotate(particleEmitter.angle);

            this.body.velocity = speedVector;
            this.body.collide = this.collide.bind(this);
            game.world.addBody(this.body);
            }else{
                
            }
        },

        update: function() {
            this.x = this.body.position.x;
            this.y = this.body.position.y;
            if (this.y > 1000) {
                this.body.remove();
            }
        },

        collide: function() {
            game.scene.score += 1;
            game.scene.drunkness = game.scene.score/1000;
        }

    });
});
