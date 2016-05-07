(function () {
  window.Asteroids = window.Asteroids || {};

  var GameView = window.Asteroids.GameView = function (args) {
    this.game = this.game || new window.Asteroids.Game();
    this.canvasEl = args["canvasEl"];
    this.ctx = args["canvasEl"].getContext("2d");
    this.$container = args["container"];
    this.playing = false;
    this.losingMsgs = ["You went blue-y!", "My dear friend, let us not forget that heaven is blue.", "You've been o-blue-terated!"]
    this.handleClick();
    this.handleNewGame();
  };

  GameView.prototype.start = function () {
    window.setInterval((function () {
      this.game.step();
      this.game.draw(this.ctx, this.$container);
      if (this.playing) {
        if (this.game.gameLost()) {
          this.endLostGame();
        } else if (this.game.gameWon()) {
          this.endWonGame();
        }
      }
    }).bind(this), 20);
  };

  GameView.prototype.handleClick = function () {
    this.$container.find("button.start").click(function (e) {
      this.$container.find(".menu").addClass("hidden");
      this.$container.find(".game-over").addClass("hidden");
      this.$container.find("progress").removeClass("hidden");
      this.$container.find(".level").removeClass("hidden");
      this.$container.find(".level").html("Level: " + window.Asteroids.Game.LEVEL);
      this.game = new window.Asteroids.Game();
      this.playing = true;
      this.bindKeyHandlers();
    }.bind(this))
  }

  GameView.prototype.handleNewGame = function () {
    this.$container.find("button.play-again").click(function (e) {
      this.$container.find(".end").addClass("hidden");
      this.$container.find("progress").removeClass("hidden");
      this.$container.find(".level").removeClass("hidden");
      this.$container.find(".level").html("Level: " + window.Asteroids.Game.LEVEL);
      this.game = new window.Asteroids.Game();
      this.playing = true;
      this.bindKeyHandlers();
    }.bind(this))
  };

  GameView.prototype.endLostGame = function () {
    this.$container.find(".loser").removeClass("hidden")
    this.$container.find("progress").addClass("hidden");
    this.$container.find(".level").addClass("hidden");
    this.$container.find(".nay").html(this.losingMsgs[(Math.floor(Math.random() * 3))])
    this.playing = false;

    for (var i = 0; i < 20; i++) {
    this.game.add(new window.Asteroids.Fish({pos: this.game.randomPosition(),
      img: meanie, leftimg: meanieleft, radius: 30, offset: [34, 35],
      game: this.game}));
    }
  }

  GameView.prototype.endWonGame = function () {
    if (window.Asteroids.Game.LEVEL >= 3) {
      this.$container.find(".end").removeClass("hidden")
      this.$container.find("progress").addClass("hidden");
      this.$container.find(".level").addClass("hidden");
      this.playing = false;
      this.game.ship.shipHealth = 100;

      window.Asteroids.Game.LEVEL = 1;
      window.Asteroids.Game.NUM_FISHIES = 4;
    } else {
      this.$container.find(".winner").removeClass("hidden")
      this.$container.find("progress").addClass("hidden");
      this.$container.find(".level").addClass("hidden");
      this.playing = false;
      this.game.ship.shipHealth = 100;

      window.Asteroids.Game.LEVEL += 1;
      window.Asteroids.Game.NUM_FISHIES += 2;
    }

    for (var i = 0; i < 20; i++) {
      this.game.add(new window.Asteroids.Fish({pos: this.game.randomPosition(),
        img: flower, leftimg: flower, radius: 10, offset: [34, 35],
        game: this.game}));
    }
  }

  GameView.prototype.bindKeyHandlers = function () {
    key('up', this.game.ship.power.bind(this.game.ship));
    key('down', this.game.ship.power.bind(this.game.ship));
    key('left', this.game.ship.power.bind(this.game.ship));
    key('right', this.game.ship.power.bind(this.game.ship));
    key('space', this.game.ship.fireBullet.bind(this.game.ship));
  };
})();
