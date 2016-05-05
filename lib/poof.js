(function () {
  window.Asteroids = window.Asteroids || {};

  var Poof = window.Asteroids.Poof = function (args) {
    window.Asteroids.MovingObject.call(this, { img: poof,
      vel: window.Asteroids.Util.randomVec(),
      game: args["game"]});
    this.pos = args["pos"];
  }


})();