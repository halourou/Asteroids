(function() {
  window.Asteroids = window.Asteroids || {};

  var Util = window.Asteroids.Util = function(){};

  Util.inherits = function (childClass, parentClass) {
    var Surrogate = function () {};
    Surrogate.prototype = parentClass.prototype;
    childClass.prototype = new Surrogate();
  };

  Util.randomVec = function (length) {
    var x = Math.floor(Math.random() * 5) - 3;
    var y = Math.floor(Math.random() * 5) - 3;

    if (x === 0 && y === 0) {
      return [-1, -1];
    } else {
      return [x, y];
    }
  };
})();
