(function() {

  window.Asteroids = window.Asteroids || {}

  var Bullet = window.Asteroids.Bullet = function (args) {


    var vel = [5.5, args["vel"][1]]

    if (args["vel"][1] < 0 ){
      vel[1] += 2 * args["vel"][1];
    } else if (args["vel"][1] > 0 ) {
      vel[1] += 2 * args["vel"][1];
    }

    if (args["vel"][0] < 0 ){
      vel[0] = -5.5;
    } else if (args["vel"][0] > 0 ) {
      vel[0] = 5.5;
    }

    window.Asteroids.MovingObject.call(this, { img: flower, color: Bullet.COLOR,
      radius: Bullet.RADIUS, offset: [10, 10], vel: vel, game: args["game"]});

    this.pos = args["pos"];
  }

  window.Asteroids.Util.inherits(Bullet, window.Asteroids.MovingObject);

  Bullet.COLOR = "#3333FF"
  Bullet.RADIUS = 5

  Bullet.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof window.Asteroids.Fish) {
      if (otherObject.radius === 30) {
        this.game.addPoofs(this.pos);
      }

      this.game.remove(otherObject);
      this.game.remove(this);
    };
  };

  Bullet.prototype.isWrappable = false;
})();
