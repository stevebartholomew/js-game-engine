requirejs.config({
    baseUrl: 'app'
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

  // naively generate a random position up to +max+ taking into account the
  // size of the player
  var randomPosition = function(max) {
    var n = Math.floor(Math.random() * (max - 1)) + 1;
    return n;
  };

  var addObstacle = function() {
    scene.addEntity(new Entity({
      width: 10,
      height: 10,
      color: 'rgb(0, 200, 0)',
      x: randomPosition(width),
      y: randomPosition(height)
    }));
  };

  var game = new Game(scene);
  game.start();

  // add a random obstacle every 2 seconds
  setInterval(function() {
    addObstacle();
  }, 2000);

  setInterval(function() {
    fps.innerText = Math.floor(game.fps);
    entityCount.innerText = scene.entities.length;
  }, 200);
});
