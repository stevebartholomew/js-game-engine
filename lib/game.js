define(['entity'], function(Entity) {
  var CONTROLS = {
    38: 'up',
    40: 'down',
    37: 'left',
    39: 'right'
  };

  var previousLoopTime = 0,
      currentLoopTime = 0;

  var Game = function(scene) {
    this.scene = scene;
    this.fps = 0;
  };

  Game.prototype = Object.create({
    start: function() {
      this.addKeyboardListeners();

      // kick off the game loop
      this.tick();
    },

    tick: function() {
      window.requestAnimationFrame(this.render.bind(this));
    },

    render: function() {
      if(!this.stop) {
        this.preRender();
        this.scene.render();
        this.postRender();
        this.tick();
      }
    },

    preRender: function() {
      currentLoopTime = new Date();
      this.fps = 1000 / (currentLoopTime - previousLoopTime);
      previousLoopTime = currentLoopTime;
    },

    postRender: function() {
    },

    addKeyboardListeners: function() {
      document.addEventListener('keydown', function(e) {
        if(!CONTROLS[e.keyCode]) { return; }
        this.scene.onStartMove(CONTROLS[e.keyCode]);
      }.bind(this));

      document.addEventListener('keyup', function(e) {
        if(!CONTROLS[e.keyCode]) { return; }
        this.scene.onStopMove(CONTROLS[e.keyCode]);
      }.bind(this));
    }
  });
  return Game;
});
