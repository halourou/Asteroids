(function () {
  window.Asteroids = window.Asteroids || {};

  var GameView = window.Asteroids.GameView = function (args) {
    this.game = this.game || new window.Asteroids.Game();
    this.canvasEl = args["canvasEl"];
    this.ctx = args["canvasEl"].getContext("2d");
    this.$container = args["container"];
    this.playing = false;
    this.handleClick();
  };

  GameView.prototype.start = function () {
    window.setInterval((function () {
      this.game.step();
      this.game.draw(this.ctx, this.$container);
      if (this.playing) {
        if (this.game.gameLost()) {
          window.Asteroids.Game.NUM_FISHIES *= 5;
          this.endLostGame();
        }
      }
    }).bind(this), 20);
  };

  GameView.prototype.handleClick = function () {
    this.$container.find("button.start").click(function (e) {
      this.$container.find(".menu").addClass("hidden");
      this.$container.find(".game-over").addClass("hidden");
      this.$container.find("progress").removeClass("hidden");
      window.Asteroids.Game.NUM_FISHIES = (window.Asteroids.Game.NUM_FISHIES/5) + 2
      this.game = new window.Asteroids.Game();
      this.playing = true;
      this.bindKeyHandlers();
    }.bind(this))
  }

  GameView.prototype.endLostGame = function () {
    this.$container.find(".game-over").removeClass("hidden");
    this.$container.find("progress").addClass("hidden");
    this.playing = false;
    this.game = new window.Asteroids.Game();
  }

  GameView.prototype.bindKeyHandlers = function () {
    key('up', this.game.ship.power.bind(this.game.ship));
    key('down', this.game.ship.power.bind(this.game.ship));
    key('left', this.game.ship.power.bind(this.game.ship));
    key('right', this.game.ship.power.bind(this.game.ship));
    key('space', this.game.ship.fireBullet.bind(this.game.ship));
  };
})();