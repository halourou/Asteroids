(function () {
  window.Asteroids = window.Asteroids || {};

  var MovingObject = window.Asteroids.MovingObject = function (args) {
    this.pos = args["pos"];
    this.vel = args["vel"];
    this.radius = args["radius"];
    this.game = args["game"];
    this.img = args["img"];
    this.offset = args["offset"];
    this.leftimg = args["leftimg"] || args["img"]
    this.count = 0;
  };
// TODO: float that will slowly go back to 0 if ship and will keep spinning if meanie/poof

  MovingObject.prototype.draw = function (ctx) {
    var angle;
      if (this.vel[1] === 0) {
        angle = 0;
      } else if (this.vel[1] === 1) {
        angle = 15;
      } else if (this.vel[1] === 2) {
        angle = 30;
      } else if (this.vel[1] === 3) {
        angle = 60;
      } else if (this.vel[1] >= 4){
        angle = 90;
      }

      if (this.vel[1] === -1) {
        angle = -15;
      } else if (this.vel[1] === -2) {
        angle = -30;
      } else if (this.vel[1] === -3) {
        angle = -60;
      } else if (this.vel[1] <= -4){
        angle = -90;
      }

    var img;
    if (this.vel[0] >= 0) {
      img = this.img;
    } else {
      img = this.leftimg;
      angle *= -1;
    }

    if ((this instanceof window.Asteroids.Ship) || (this instanceof window.Asteroids.Bullet)) {
      this.rotateImg(ctx, img, this.pos[0], this.pos[1], angle)
    }

    if (this instanceof window.Asteroids.Fish) {
      this.rotateImg(ctx, img, this.pos[0], this.pos[1], angle + this.count)
      this.count +=1
    }

    ctx.beginPath();

    if (this instanceof window.Asteroids.Ship) {
      ctx.arc(
        this.pos[0] + 1,
        this.pos[1] + 14,
        this.radius,
        0,
        2 * Math.PI,
        false
      );
    } else {
      ctx.arc(
        this.pos[0],
        this.pos[1],
        this.radius,
        0,
        2 * Math.PI,
        false
      );
    }

    // ctx.fill();
  };

  MovingObject.prototype.rotateImg = function (context, image, posX, posY, angle) {
    var toRadian = Math.PI/180;
    context.save();
    context.translate(posX, posY);
    context.rotate(angle * toRadian)
    context.drawImage(image, -(image.width/2), -(image.height/2))
    context.restore();
  }

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
    var radSum = this.radius + otherObject.radius;

    return dist < radSum;
  };

  MovingObject.prototype.collideWith = function(otherObject) {
  };

  MovingObject.prototype.isWrappable = true;
})();