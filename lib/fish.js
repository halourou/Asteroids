(function () {
  window.Asteroids = window.Asteroids || {};

  var Fish = window.Asteroids.Fish = function (args) {
    window.Asteroids.MovingObject.call(this, { img: meanie, leftimg: meanieleft, color: Fish.COLOR,
      radius: Fish.RADIUS,
      vel: window.Asteroids.Util.randomVec(), game: args["game"]});
    this.pos = args["pos"];
  };

  window.Asteroids.Util.inherits(Fish, window.Asteroids.MovingObject);

  Fish.COLOR = "#963CD2";
  Fish.RADIUS = 30;

  Fish.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof window.Asteroids.Ship) {
      otherObject.relocate();
    }
    if (otherObject instanceof window.Asteroids.Bullet) {
      this.game.remove(this);
      this.game.remove(otherObject);
    };
  };

})();