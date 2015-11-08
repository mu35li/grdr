game.module('game.drunkhandler')
.body(function() {
    game.createClass('DrunkHandler', {
        init: function() {
            this.drunkenness = game.scene.drunkenness;
        },

        update: function() {
            // because we don't want you to understand our code
            game.scene.bottle.tiltBottle(game.system.delta * 0.5 * this.drunkenness * Math.pow(-1, Math.round((Math.random()*10))));
            game.scene.guenther.tiltHead(game.system.delta * 0.5 * this.drunkenness * Math.pow(-1, Math.round((Math.random()*10))));
        }
    });
});
