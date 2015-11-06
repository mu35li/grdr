game.module(
    'game.main'
)
.body(function() {

    game.addAsset('logo.png');

    game.createScene('Main', {
        backgroundColor: 0xb9bec7,

        init: function() {
            this.logo = new game.Sprite('logo.png').addTo(this.stage);
            this.logo.anchor.set(0.5, 0.5);
            this.logo.center();
            this.rotSpeed = 1;
        },

        update: function() {
            this.logo.rotation += (Math.PI * 2 / (1/this.rotSpeed) * game.system.delta);
        }
    });

});
