(function () {
  window.Asteroids = window.Asteroids || {};

  var GameView = window.Asteroids.GameView = function (canvasEl) {
    this.game = new window.Asteroids.Game();
    this.ctx = canvasEl.getContext("2d");
  };

  GameView.prototype.start = function () {
    window.setInterval((function () {
      this.game.step();
      this.game.draw(this.ctx);
    }).bind(this), 20);
    this.bindKeyHandlers();
  };

  GameView.prototype.bindKeyHandlers = function () {
    key('up', this.game.ship.power.bind(this.game.ship));
    key('down', this.game.ship.power.bind(this.game.ship));
    key('left', this.game.ship.power.bind(this.game.ship));
    key('right', this.game.ship.power.bind(this.game.ship));
    key('space', this.game.ship.fireBullet.bind(this.game.ship));
  };
})();