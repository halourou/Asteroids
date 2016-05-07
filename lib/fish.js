(function () {
  window.Asteroids = window.Asteroids || {};

  var Fish = window.Asteroids.Fish = function (args) {
    window.Asteroids.MovingObject.call(this, { img: args["img"], leftimg: args["leftimg"],
      radius: args["radius"], offset: args["offset"],
      vel:  window.Asteroids.Util.randomVec(), game: args["game"]});
      // vel: [0,0], game: args["game"]});
    this.pos = args["pos"];
  };

  window.Asteroids.Util.inherits(Fish, window.Asteroids.MovingObject);

  Fish.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof window.Asteroids.Ship && this.img.getAttribute('src') != "imgs/flower.png") {
      otherObject.shipHealth -= 1;
    }

    if (otherObject instanceof window.Asteroids.Bullet) {
      if (this.radius === 30) {
        this.game.addPoofs(this.pos);
      }

      this.game.addExplosion(this.pos);
      this.game.remove(this);
      this.game.remove(otherObject);
    };
  };

})();
