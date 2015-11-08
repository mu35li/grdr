game.module('game.drunkhandler')
.body(function() {
    game.createClass('DrunkHandler', {
        init: function() {
            // we don't actually need to init anything...
            return;
        },

        update: function() {
            // fetch current drunkness
            var drunkness = game.scene.drunkness;
 
            // tilt bottle and guenther's head randomly, yet proportional to current drunkness
            // we also take into account the system's delta
            // the Math.pow is used to randomly make the angle positive or negative, which creates a nice wobble
            game.scene.bottle.tiltBottle(game.system.delta * 0.5 * drunkness * Math.pow(-1, Math.round((Math.random()*10))));
            game.scene.guenther.tiltHead(game.system.delta * 0.5 * drunkness * Math.pow(-1, Math.round((Math.random()*10))));
        }
    });
});
