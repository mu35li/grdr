game.module(
    'game.main'
)
.require('game.guenther')
.require('game.bottle')
.require('game.drunkhandler')
.require('game.testParticle')
.body(function() {

    // load some assets
    // ... others are loaded elsewhere. because any other way would be too convenient
    game.addAsset('logo.png');
    game.addAsset('regenwald.jpg');

    // load amazing music
    game.addAudio('Krombacher.m4a', 'theme');
    game.Audio.stopOnSceneChange = false;

    game.createScene('Main', {
        //backgroundColor: 0xb9bec7,
        backgroundImage: 0x000000,

        init: function() {
            this.max_bottles = 10;

            var regenwald = new game.Sprite('regenwald.jpg').center().addTo(this.stage);

            this.rotSpeed = 1;

            this.world = new game.World();

            game.world = this.world;

            //instanciate the guenther
            this.guenther = new game.Guenther(850,600,35,35);
            this.bottle = new game.Bottle(450,400,100,100);
            // console.log(this.guenther);
            this.world.addBody(this.guenther.drinkBox);

            // declare our score-related variables
            this.finished_bottles = 0;
            this.score = 0;

            // init highscore to 0
            this.highscore = 0;

            // see if we already have a highscore and overwrite it if we do
            if (game.storage.has('highscore')) {
                this.highscore = game.storage.get('highscore');
            } else {
                game.storage.set('highscore', 0);
            }

            this.drunkness = 0;
            this.drunkhandler = new game.DrunkHandler();
            this.counter = 0;
            this.testParticles = [];

            // display text to display score
            this.score_text = new game.Text('Score: ' + this.score, {fill: 'white'});
            this.score_text.position.set(20, 20);
            this.score_text.addTo(this.stage);

            // display fill level (debug)
            this.fill_text = new game.Text('Level: ' + this.max_bottles, {fill: 'white'});
            this.fill_text.position.set(400, 20);
            this.fill_text.addTo(this.stage);

            // display controls because maybe, just maybe, someone who wasn't involved in development
            // might actually play this...
            this.controls_text = new game.Text('Controls: Q, W, O, P', {fill: 'white'});
            this.controls_text.position.set(700, 20);
            this.controls_text.addTo(this.stage);

            // play some music
            if (!game.audio.isMusicPlaying()) {
                game.audio.playMusic('theme', true);
            }
        },

        update: function() {
            this._super();
            this.world.update();
            // console.log(this.guenther.sprite);
            // console.log(this.guenther.body.position);

            this.guenther.update();
            // console.log(this.guenther);
            // console.log("body pos: " + this.body.position.x + ", " + this.body.position.y);

            this.bottle.particleEmitter.update();
            this.bottle.update();

            // enable player input
            if (game.keyboard.down('Q')) {
                this.guenther.tiltHead((Math.PI * 2 / (1/this.rotSpeed) * game.system.delta));
            }
            if (game.keyboard.down('W')) {
                this.guenther.tiltHead(-(Math.PI * 2 / (1/this.rotSpeed) * game.system.delta));
            }
            if (game.keyboard.down('O')) {
                this.bottle.tiltBottle((Math.PI * 2 / (1/this.rotSpeed*2) * game.system.delta));
            }
            if (game.keyboard.down('P')) {
                this.bottle.tiltBottle(-(Math.PI * 2 / (1/this.rotSpeed*2) * game.system.delta));
            }
            // no longer needed, done automatically
            //if (game.keyboard.down('T')) {
            //    this.bottle.testCollision();
            //}

            this.drunkhandler.update();


            this.counter += game.system.delta;
            if (this.counter > 0.05) {
                this.testCollision();
                this.counter -= 0.05;
            }
            // for (var i = this.testParticles.length - 1; i >= 0; i--) {
            //     var res = this.testParticles[i].update();
            // }
            
            // update score display
            this.score_text.setText('Score: ' + this.score);

            // update fill display
            this.fill_text.setText('Level: ' + this.finished_bottles);

            // handle gameover scenario
            if (this.finished_bottles >= this.max_bottles) {
                // stop the music!
                game.audio.stopMusic();

                // clear everythin gaway 
                this.clear();

                // determine new highscore
                this.highscore = Math.max(this.highscore, this.score);

                // store new highscore
                game.storage.set('highscore', this.highscore);
                game.scene.guenther.drinkBox.remove();
                game.scene.removeObject(game.scene.guenther);
                game.scene.bottle.body.remove();
                game.scene.removeObject(game.scene.bottle);

                // create a little gameover screen
                this.exit_text = new game.Text('Game Over!\nScore: ' + this.score + ' m² Regenwald \nHigh Score: ' + this.highscore+' m² Regenwald', {fill: 'white'});
                this.exit_text.position.set(300, 300);
                this.exit_text.addTo(this.stage);

                // ...and exit!
                this.exit();
            }
        },

        // we don't need this, it's done automatically when the bottle is empty
        //keyup: function(key) {
        //    if (key === 'SPACE') {
        //        this.bottle.getFreshDrink();
        //    }
        //},

        // test stream for collision with guenther's mouth
        testCollision: function() {
            var testParticle = new game.TestParticle(0,0,0,0);
            this.addObject(testParticle); 
            this.testParticles.push(testParticle);

        }
    });

});
