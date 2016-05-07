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

  Sprite.prototype.render = function (ctx, pos) {
    ctx.drawImage(this.img, (this.frameIdx * this.width/this.numFrames),
    0, this.width/this.numFrames, this.height,
    pos[0] - 20, pos[1] - 20, this.width/this.numFrames, this.height);
  };

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