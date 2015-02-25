requirejs.config({
    baseUrl: 'app'
});

requirejs(['engine'], function(Engine) {
  var canvas = document.getElementById('canvas');
  var engine = new Engine(canvas, 800, 600);
  engine.start();
});
