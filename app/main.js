requirejs.config({
    baseUrl: 'app'
});

requirejs(['game', 'scene', 'entity'], function(Game, Scene, Entity) {
  var canvas = document.getElementById('canvas');

  var width = 300,
      height = 300;

  var scene = new Scene(canvas, width, height);

  var player = new Entity();
  scene.addEntity(player);
  scene.setPlayer(player);

  // naively generate a random position up to +max+ taking into account the
  // size of the player
  var randomPosition = function(max) {
    return Math.floor(Math.random() * (max - 50)) + 50;
  };

  for(var i=0; i<3; i++) {
    scene.addEntity(new Entity({
      width: 10,
      height: 10,
      color: 'rgb(0, 200, 0)',
      x: randomPosition(width),
      y: randomPosition(height)
    }));
  }

  var game = new Game(scene);
  game.start();
});
