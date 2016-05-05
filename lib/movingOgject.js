(function () {
  window.Asteroids = window.Asteroids || {};

  var MovingObject = window.Asteroids.MovingObject = function (args) {
    this.pos = args["pos"];
    this.vel = args["vel"];
    this.radius = args["radius"];
    this.game = args["game"];
    this.img = args["img"];
    this.leftimg = args["leftimg"] || args["img"]
  };

  MovingObject.prototype.draw = function (ctx) {
    var img;
    if (this.vel[0] >= 0) {
      img = this.img;
    } else {
      img = this.leftimg;
    }

    ctx.drawImage(img, this.pos[0], this.pos[1])
    ctx.beginPath();
    //
    // ctx.arc(
    //   this.pos[0],
    //   this.pos[1],
    //   this.radius,
    //   0,
    //   2 * Math.PI,
    //   false
    // );

    ctx.fill();
  };

  MovingObject.prototype.move = function() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];


    if (this.isWrappable) {
      this.pos = this.game.wrap(this.pos);
    } else {
      if (this.game.isOutOfBounds(this.pos)) {
        this.game.remove(this);
      };
    };
  };

  MovingObject.prototype.isCollidedWith = function(otherObject) {
    var x1 = this.pos[0];
    var y1 = this.pos[1];
    var x2 = otherObject.pos[0];
    var y2 = otherObject.pos[1];

    var dist = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
    var radSum = this.img.width/2 + otherObject.img.width/2;

    return dist < radSum;
  };

  MovingObject.prototype.collideWith = function(otherObject) {
  };

  MovingObject.prototype.isWrappable = true;
})();