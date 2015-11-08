game.module('game.drunkhandler')
.body(function() {
    game.createClass('DrunkHandler', {
        init: function() {
            // initialize drunkenness by fetching it from the scene
            // sort of redudant... TODO maybe change this?
            this.drunkenness = game.scene.drunkenness;
        },

        update: function() {
            // tilt bottle and guenther's head randomly, yet proportional to current drunkenness
            // we also take into account the system's delta
            // the Math.pow is used to randomly make the angle positive or negative, which creates a nice wobble
            game.scene.bottle.tiltBottle(game.system.delta * 0.5 * this.drunkenness * Math.pow(-1, Math.round((Math.random()*10))));
            game.scene.guenther.tiltHead(game.system.delta * 0.5 * this.drunkenness * Math.pow(-1, Math.round((Math.random()*10))));
        }
    });
});
