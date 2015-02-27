define(function() {
  var Entity = function(config) {
    config = config || {};
    this.width = config.width || 50;
    this.height = config.height || 50;

    this.x = config.x || 0;
    this.y = config.y || 0;
    this.color = config.color || 'rgb(0, 0, 200)';

    this.moveBy = 5;
    this.acceleration = 0;

    this.moving = {
      'up': false,
      'down': false,
      'left': false,
      'right': false
    };
  };

  Entity.prototype = Object.create({
    directions: ['up','down','left','right'],

    move: function() {
      for(var i=0; i<this.directions.length; i++) {
        if(this.moving[this.directions[i]]) {
          switch(this.directions[i]) {
          case 'up':
            if(!this.falling) {
              this.jumping = true;
            }
            break;
          case 'down':
            //this.y += this.moveBy;
            break;
          case 'left':
            this.x -= this.moveBy;
            break;
          case 'right':
            this.x += this.moveBy;
            break;
          default:
            break;
          }
        }
      }

      if(this.jumping) {
        if(this.acceleration === 0) {
          this.acceleration = 100;
        }
        else {
          this.acceleration -= 9.8;
        }

        if(this.acceleration > 0) {
          this.y -= (this.acceleration / 9.8);
        }
        else {
          this.jumping = false;
        }
      }
      else if(this.falling) {
        this.acceleration += 9.8;
        this.y += (this.acceleration / 9.8);
      }
      else {
        this.acceleration = 0;
      }
    },

    draw: function(ctx) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    },

    hitTest: function(other) {
      if(((this.x + this.width) >= other.x &&
          (this.x) <= (other.x + other.width)) &&
          ((this.y + this.height) >= other.y &&
          (this.y) <= (other.y + other.height))) {
        return true;
      }
    },

    startMoving: function(direction) {
      this.moving[direction] = true;
    },

    stopMoving: function(direction) {
      this.moving[direction] = false;
    }
  });

  return Entity;
});
