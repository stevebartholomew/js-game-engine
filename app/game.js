define(['entity'], function(Entity) {
  var CONTROLS = {
    38: 'up',
    40: 'down',
    37: 'left',
    39: 'right'
  };

  var Game = function(scene) {
    this.scene = scene;
  };

  Game.prototype = Object.create({
    start: function() {
      document.addEventListener('keydown', function(e) {
        if(!CONTROLS[e.keyCode]) { return; }
        this.scene.onStartMove(CONTROLS[e.keyCode]);
      }.bind(this));

      document.addEventListener('keyup', function(e) {
        if(!CONTROLS[e.keyCode]) { return; }
        this.scene.onStopMove(CONTROLS[e.keyCode]);
      }.bind(this));
      this.tick();
    },

    tick: function() {
      window.requestAnimationFrame(this.render.bind(this));
    },

    render: function() {
      if(!this.stop) {
        this.scene.render();
        this.tick();
      }
    }
  });
  return Game;
});
