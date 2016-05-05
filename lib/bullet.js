(function() {

  window.Asteroids = window.Asteroids || {}

  var Bullet = window.Asteroids.Bullet = function (args) {
    var vel = [0, 0]

    if (args["vel"][0] === 0 && args["vel"][1] === 0) {
      vel = [0, -5];
    }

    if (args["vel"][1] < 0 ){
      vel[1] = -5;
    } else if (args["vel"][1] > 0 ) {
      vel[1] = 5;
    }

    if (args["vel"][0] < 0 ){
      vel[0] = -5;
    } else if (args["vel"][0] > 0 ) {
      vel[0] = 5;
    }

    window.Asteroids.MovingObject.call(this, { img: flower, color: Bullet.COLOR,
      radius: Bullet.RADIUS, vel: vel, game: args["game"]});

    this.pos = args["pos"];
  }

  window.Asteroids.Util.inherits(Bullet, window.Asteroids.MovingObject);

  Bullet.COLOR = "#3333FF"
  Bullet.RADIUS = 5

  Bullet.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof window.Asteroids.Fish) {
      this.game.remove(otherObject);
      this.game.remove(this);
    };
  };

  Bullet.prototype.isWrappable = false;
})();