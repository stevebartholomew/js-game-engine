define(['entity'], function(Entity) {
  var CONTROLS = {
    38: 'up',
    40: 'down',
    37: 'left',
    39: 'right'
  };

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
  };

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
  return Engine;
});
