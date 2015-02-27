requirejs.config({
    baseUrl: 'lib'
});

requirejs(['game', 'scene', 'entity'], function(Game, Scene, Entity) {
  var canvas = document.getElementById('canvas'),
      fps = document.getElementById('fps'),
      entityCount = document.getElementById('entity-count');

  var width = 300,
      height = 300;

  var scene = new Scene(canvas, width, height);

  var player = new Entity();
  scene.addEntity(player);
  scene.setPlayer(player);

  var game = new Game(scene);
  game.start();

  setInterval(function() {
    fps.innerText = Math.floor(game.fps);
    entityCount.innerText = scene.entities.length;
  }, 200);
});

