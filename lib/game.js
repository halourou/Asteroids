(function () {
  window.Asteroids = window.Asteroids || {};

  var Game = window.Asteroids.Game = function () {
    this.fishies = [];
    this.addFish();
    this.ship = new window.Asteroids.Ship({pos: [250, 250], game: this});
    this.bullets = [];
    this.explosion_pos = null;
    this.boom = this.boom || new window.Asteroids.Sprite({img: explosion, width: 590,
      height: 65, numFrames: 8,
      ticksPerFrame: 1, game: this})
    this.flash = this.flash || new window.Asteroids.Sprite({width: 462, height: 54,
      img: this.getImg(this.ship), numFrames: 7, ticksPerFrame: 1, game: this});
  };

  Game.DIM_X = 500;
  Game.DIM_Y = 500;
  Game.NUM_FISHIES = 4;
  Game.LEVEL = 1;

  Game.prototype.gameWon = function () {
    return this.allObjects().every(function (object) {
      if (!(object instanceof window.Asteroids.Fish)) {
        return true;
      }
    })
  }

  Game.prototype.gameLost = function () {
    return this.ship.shipHealth <= 0
  }

  Game.prototype.addFish = function() {
    while(this.fishies.length < Game.NUM_FISHIES) {
      this.add(new window.Asteroids.Fish({pos: this.randomPosition(),
        img: meanie, leftimg: meanieleft, radius: 30, offset: [34, 35],
        game: this}));
    };
  };

  Game.prototype.addPoofs = function (pos) {
    for (var i = 0; i < 2; i++) {
      this.add(new window.Asteroids.Fish({pos: pos, img: poof,
        leftimg: poof, radius: 15, offset: [24, 25],
        game: this}));
    }
  }

  Game.prototype.randomPosition = function () {
    var x = Math.floor(Math.random() * Game.DIM_X);
    var y = Math.floor(Math.random() * Game.DIM_Y);
    return [x, y];
  };

  Game.prototype.draw = function(ctx, container) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    container.find("progress").val(this.ship.shipHealth);
    var shipAngle = this.getAngle(this.ship);
    var shipImg = this.getImg(this.ship);

    this.allObjects().forEach(function (object) {
      if (object instanceof window.Asteroids.Ship && object.shipHealth < 100) {
        this.flash.render(ctx, this.ship.pos, shipAngle, shipImg);
        this.flash.update();
        this.ship.shipHealth += .05;
      } else {
        var angle = this.getAngle(object);
        var img = this.getImg(object);
        object.draw(ctx, angle, img);
      }
    }.bind(this));

    if (this.boom.finished) {
      this.explosion_pos = null;
      this.boom = new window.Asteroids.Sprite({img: explosion, width: 590,
        height: 65, numFrames: 8, ticksPerFrame: 1, game: this});
    }

    if (this.explosion_pos !== null) {
      this.boom.render(ctx, this.explosion_pos);
      this.boom.update();
    }

    if (this.flash.finished) {
      this.flash = new window.Asteroids.Sprite({width: 462, height: 54,
        img: shipImg, numFrames: 7, ticksPerFrame: 1, game: this})
    }
  };

  Game.prototype.addExplosion = function (pos){
    this.explosion_pos = [pos[0] - 20, pos[1] - 20];
  }

  Game.prototype.moveObjects = function() {
    this.allObjects().forEach(function (object) {
      object.move();
    });
  };

  Game.prototype.wrap = function(pos) {
    var x = pos[0];
    var y = pos[1];

    if (x <= -50) {
      x += Game.DIM_X
    } else if (x >= Game.DIM_X) {
      x -= Game.DIM_X
    };

    if (y <= -50) {
      y += Game.DIM_Y
    } else if (y >= Game.DIM_Y) {
      y -= Game.DIM_Y
    };

    return [x, y];
  };

  Game.prototype.checkCollisions = function() {
    for(var i = 0; i < this.allObjects().length; i++) {
      for(var j = i + 1; j < this.allObjects().length; j++) {
        if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])) {
          this.allObjects()[i].collideWith(this.allObjects()[j]);
        };
      };
    };
  };

  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.add = function (obj) {
    if (obj instanceof window.Asteroids.Fish) {
      this.fishies.push(obj);
    } else if (obj instanceof window.Asteroids.Bullet) {
      this.bullets.push(obj);
    } else {
      this.fishies.push(obj);
    }
  };

  Game.prototype.remove = function(obj) {
    if (obj instanceof window.Asteroids.Fish) {
      this.fishies.splice(this.fishies.indexOf(obj), 1);
    } else if (obj instanceof window.Asteroids.Bullet) {
      this.bullets.splice(this.bullets.indexOf(obj), 1);
    };
  };

  Game.prototype.allObjects = function() {
    var allObjects = this.fishies.slice();
    allObjects.push(this.ship);
    return allObjects.concat(this.bullets);
  };

  Game.prototype.isOutOfBounds = function(pos) {
    (pos[0] < 0 || pos[0] > Game.DIM_X) || (pos[1] < 0 || pos[1] > Game.DIM_Y)
  };

  Game.prototype.getAngle = function (object) {
      // if (object.vel[1] === 0) {
      //   angle = 0;
      // } else if (object.vel[1] <= 1 && object.vel[1] >= 0) {
      //   angle = 10;
      // } else if (object.vel[1] === 2) {
      //   angle = 15;
      // } else if (object.vel[1] === 3) {
      //   angle = 30;
      // } else if (object.vel[1] >= 4){
      //   angle = 60;
      // }

      if (object.vel[1] === 0) {
        angle = 0;
      } else if (object.vel[1] <= 1 && object.vel[1] > 0) {
        angle = 10;
      } else if (object.vel[1] <= 2 && object.vel[1] > 1) {
        angle = 15;
      } else if (object.vel[1] <= 3 && object.vel[1] > 2) {
        angle = 30;
      } else if (object.vel[1] > 3){
        angle = 60;
      }

      if (object.vel[1] < 0 && object.vel[1] >= -1) {
        angle = -10;
      } else if (object.vel[1] < -1 && object.vel[1] >= -2) {
        angle = -15;
      } else if (object.vel[1] < -2 && object.vel[1] >= -3) {
        angle = -30;
      } else if (object.vel[1] < -3){
        angle = -60;
      }


      // if (object.vel[1] === -1) {
      //   angle = -10;
      // } else if (object.vel[1] === -2) {
      //   angle = -15;
      // } else if (object.vel[1] === -3) {
      //   angle = -30;
      // } else if (object.vel[1] <= -4){
      //   angle = -60;
      // }

      if (object.vel[0] < 0) {
        return angle * -1;
      } else {
        return angle
      }
  }

  Game.prototype.getImg = function (object) {
    if (object.vel[0] >= 0) {
      return object.img;
    } else {
      return object.leftimg;
    }
  };

})();
