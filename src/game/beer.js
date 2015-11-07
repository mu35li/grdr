game.module('game.beer')
.body(function() {
    game.addAsset('beer.png');

    game.createClass('Beer', {
        init: function(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.jumpVel = 50;
            this.sprite = new game.Sprite('beer.png', x, y, {
                anchor: {
                    x: 0,
                    y: 0
                },
                zIndex: 20
            });

            game.scene.addObject(this);

            this.sprite.addTo(game.scene.stage);

            var shape = new game.Circle(this.width);

            this.body = new game.Body({
                mass: 0.1,
                position: {
                    x: this.x,
                    y: this.y
                },
                shape: shape
            });
        },

        update: function() {
            this.x = this.body.position.x;
            this.y = this.body.position.y;
            this.sprite.x = this.x
            this.sprite.y = this.y
        }
    });
});
