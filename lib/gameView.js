(function () {
  window.Asteroids = window.Asteroids || {};

  var GameView = window.Asteroids.GameView = function (args) {
    this.game = this.game || new window.Asteroids.Game();
    this.canvasEl = args["canvasEl"];
    this.ctx = args["canvasEl"].getContext("2d");
    this.$container = args["container"];
    this.handleClick();
  };

  GameView.prototype.start = function () {
    window.setInterval((function () {
      this.game.step();
      this.game.draw(this.ctx, this.$container);
    }).bind(this), 20);
  };

  GameView.prototype.handleClick = function () {
    this.$container.find("button.start").click(function (e) {
      this.$container.find(".menu").addClass("hidden");
      this.$container.find("progress").removeClass("hidden");
      this.game = new window.Asteroids.Game();
      this.bindKeyHandlers();
    }.bind(this))
  }

  GameView.prototype.bindKeyHandlers = function () {
    key('up', this.game.ship.power.bind(this.game.ship));
    key('down', this.game.ship.power.bind(this.game.ship));
    key('left', this.game.ship.power.bind(this.game.ship));
    key('right', this.game.ship.power.bind(this.game.ship));
    key('space', this.game.ship.fireBullet.bind(this.game.ship));
  };
})();