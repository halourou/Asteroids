(function () {
  window.Asteroids = window.Asteroids || {};

  var Sprite = window.Asteroids.Sprite = function (args) {
    this.width = args["width"];
    this.height = args["height"];
    this.img = args["img"];
    this.frameIdx = 0;
    this.tickCount = 0;
    this.ticksPerFrame = args["ticksPerFrame"] || 0;
    this.numFrames = args["numFrames"] || 1;
    this.finished = false;
    this.game = args["game"]
  }

  // Sprite.prototype.render = function (ctx, pos) {
  //   ctx.drawImage(this.img, (this.frameIdx * this.width/this.numFrames),
  //   0, this.width/this.numFrames, this.height,
  //   pos[0], pos[1], this.width/this.numFrames, this.height);
  // };

  Sprite.prototype.render = function (ctx, pos, angle, img) {
    this.rotateSprite(ctx, pos[0], pos[1], angle, img);
  };

  Sprite.prototype.rotateSprite = function (context, posX, posY, angle, img) {
    var toRadian = Math.PI/180;
    var spriteimg = img || this.img;
    context.save();
    context.translate(posX, posY);
    context.rotate(angle * toRadian)

    context.drawImage(spriteimg, (this.frameIdx * this.width/this.numFrames), 0,
    this.width/this.numFrames, this.height, -((this.width/this.numFrames)/2), -(this.height/2),
    this.width/this.numFrames, this.height);

    context.restore();
  }

  Sprite.prototype.update = function () {
    this.finished = false;
    this.tickCount += 1;

    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;

      if (this.frameIdx < this.numFrames - 1) {
        this.frameIdx += 1;
      } else {
        this.frameIdx = 0;
        this.finished = true;
      }
    }
  }

})();
