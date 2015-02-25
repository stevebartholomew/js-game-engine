var CONTROLS = {
  38: 'up',
  40: 'down',
  37: 'left',
  39: 'right'
};

var Entity = function(config) {
  config = config || {};
  this.width = config.width || 50;
  this.height = config.height || 50;

  this.x = config.x || 0;
  this.y = config.x || 0;
  this.color = config.color || 'rgb(0, 0, 200)';

  this.moveBy = 5;

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
          this.y -= this.moveBy;
          break;
        case 'down':
          this.y += this.moveBy;
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

var Engine = function(canvas, width, height) {
  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);
  this.ctx = canvas.getContext('2d');
  this.width = width;
  this.height = height;

  this.player = new Entity();
  this.obstacles = [];

  for(var i=0; i<3; i++) {
    var obstacle = new Entity({
      width: 10,
      height: 10,
      color: 'rgb(0, 200, 0)',
      x: Math.floor(Math.random() * (this.width - 50)) + 50,
      y: Math.floor(Math.random() * (this.height - 50)) + 50
    });

    this.obstacles.push(obstacle);
  }
}

Engine.prototype = Object.create({
  draw: function() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.player.draw(this.ctx);
    for(var i=0;i<this.obstacles.length;i++) {
      this.obstacles[i].draw(this.ctx);
    }
  },

  collisionTest: function() {
    this.player.color = 'rgb(0, 0, 200)';
    for(var i=0;i<this.obstacles.length;i++) {
      if(this.obstacles[i].hitTest(this.player)) {
        this.player.color = 'rgb(200, 0, 0)';
      }
    }
  },

  start: function() {
    document.addEventListener('keydown', function(e) {
      if(!CONTROLS[e.keyCode]) { return; }
      this.player.startMoving(CONTROLS[e.keyCode]);
    }.bind(this));

    document.addEventListener('keyup', function(e) {
      if(!CONTROLS[e.keyCode]) { return; }
      this.player.stopMoving(CONTROLS[e.keyCode]);
    }.bind(this));
    this.tick();
  },

  tick: function() {
    window.requestAnimationFrame(this.render.bind(this));
  },

  render: function() {
    if(!this.stop) {
      this.player.move();
      this.draw();
      this.collisionTest();
      this.tick();
    }
  }
});

document.addEventListener('DOMContentLoaded', function() {
  var canvas = document.getElementById('canvas');
  var engine = new Engine(canvas, 800, 600);
  engine.start();
});
