var canvas, context, player, coins = [];
var coin_sound = new Audio('sounds/Mario Coin.WAV'); //https://www.youtube.com/watch?v=XbX4hG9ZSmQ
var jump_sound = new Audio('sounds/Mario - Jump.mp3');//https://www.youtube.com/watch?v=cBY_2ABINVg




function setup() {
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
  fit_canvas();
  player = new Player(context, 'imgs/smb_mario_sheet.png', canvas.width/2, canvas.height -40);

  for (var i = 1; i < 10; i++) {
    for (var j = 1; j < 10; j++) {
      coins.push(
        new Coin(context, 'imgs/smb_items_sheet.png', i*canvas.width/10, j*canvas.height/10)
      );
    }
  }
}

function update() {
  player.update();

  coins.forEach(function(coin, index, array){
    if (player.getPos().x + (player.getDimensions().width /2) >= coin.getPos().x && player.getPos().x + (player.getDimensions().width /2) <= coin.getPos().x + coin.getDimensions().width &&
    player.getPos().y + (player.getDimensions().height /2) >= coin.getPos().y && player.getPos().y + (player.getDimensions().height /2) <= coin.getPos().y + coin.getDimensions().height) {
      if (index > -1) {
          array.splice(index, 1);
          console.log(array.length);
          coin_sound.play();
      }
    }
  });
}

function draw(){
  context.clearRect(0,0,canvas.width, canvas.height);
  coins.forEach(function(coin){
    coin.draw();
  });
  player.draw();
}

window.onkeydown = function(e) {
   var key = e.keyCode ? e.keyCode : e.which;

   if (key == 37) {
       console.log('left');
       player.move(-1);
   }
   if (key == 40) {
       console.log('down');
   }
   if (key == 38) {
     jump_sound.play();
       console.log('up');
       player.jump();
   }
   if (key == 39) {
       console.log('right');
       player.move(1);
   }
}



function fit_canvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.onresize = function(){
  fit_canvas();
}


setup();
function loop(){
  update();
  draw();
  window.requestAnimationFrame(loop);
}
loop();
