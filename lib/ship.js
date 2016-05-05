(function() {
  window.Asteroids = window.Asteroids || {};

  var Ship = window.Asteroids.Ship = function (args) {
    window.Asteroids.MovingObject.call(this, { img: sub, leftimg: subleft, color: Ship.COLOR,
      radius: Ship.RADIUS, offset: [30, 40], game: args["game"]});
    this.vel = [0,0];
    this.pos = args["pos"];
  };

  window.Asteroids.Util.inherits(Ship, window.Asteroids.MovingObject);

  Ship.RADIUS = 10;
  Ship.COLOR = "#DB2929";

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
  };

  Ship.prototype.power = function() {
    if (arguments[1]["key"] === 'up') { this.vel[1] -= 1 };
    if (arguments[1]["key"] === 'down') { this.vel[1] += 1 };
    if (arguments[1]["key"] === 'left') { this.vel[0] -= 1 };
    if (arguments[1]["key"] === 'right') { this.vel[0] += 1 };

  };

  Ship.prototype.fireBullet = function () {
    var bullet = new window.Asteroids.Bullet({vel: this.vel,
                                              pos: this.pos,
                                              game: this.game});
    this.game.add(bullet);
  };
})();