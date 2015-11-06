game.module(
    'game.main'
)
.body(function() {

    game.addAsset('logo.png');

    game.createScene('Main', {
        backgroundColor: 0xb9bec7,

        init: function() {
            this.logo = new game.Sprite('logo.png').center().addTo(this.stage);
            this.logo.anchor.set(0.5, 0.5);
        },

        update: function() {
            this.logo.rotation += 0.1;
        }
    });

});
