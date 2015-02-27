define(function() {
  var Scene = function(canvas, width, height) {
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    this.ctx = canvas.getContext('2d');
    this.width = width;
    this.height = height;
    this.entities = [];
  };

  Scene.prototype = Object.create({
    draw: function() {
      this.ctx.clearRect(0, 0, this.width, this.height);

      for(var i=0;i<this.entities.length;i++) {
        this.entities[i].draw(this.ctx);
      }
    },

    addEntity: function(entity) {
      this.entities.push(entity);
    },

    setPlayer: function(player) {
      this.player = player;
    },

    collisionTest: function() {
      this.player.color = 'rgb(0, 0, 200)';

      for(var i=0;i<this.entities.length;i++) {
        if(this.entities.indexOf(this.player) !== i && this.entities[i].hitTest(this.player)) {
          this.player.color = 'rgb(200, 0, 0)';
        }
      }
    },

    applyGravity: function(entity) {
      if(entity.y < (this.height - entity.height)) {
        entity.falling = true;
      }
      else {
        entity.falling = false;
      }
    },

    render: function() {
      if(!this.stop) {
        this.player.move();
        this.applyGravity(this.player);
        this.draw();
        this.collisionTest();
      }
    },

    onStartMove: function(direction) {
      this.player.startMoving(direction);
    },

    onStopMove: function(direction) {
      this.player.stopMoving(direction);
    }
  });

  return Scene;
});
