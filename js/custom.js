var cvs;
var ctx;

cvs = document.getElementById("canvas");
ctx = cvs.getContext("2d");

var bird = new Image();
 var bg = new Image();
 var fg = new Image();
 var pipeUp = new Image();
 var pipeBottom = new Image();

 bird.src = "img/flappy_bird_bird.png";
 bg.src = "img/bg.png";
 fg.src = "img/flappy_bird_fg.png";
 pipeUp.src = "img/flappy_bird_pipeUp.png";
 pipeBottom.src = "img/flappy_bird_pipeBottom.png";

// Звуковые файлы
var fly = new Audio(); // Создание аудио объекта
var score_audio = new Audio(); // Создание аудио объекта
var fail = new Audio();
fly.src = "audio/fly.mp3"; // Указание нужной записи
score_audio.src = "audio/score.mp3"; // Аналогично
fail.src = "audio/fail.mp3";

var score = 0;
var gap = 90;
var xPos = 10;
var yPos = 150;
var gravB;
var gravP;
var fps = 60;

var pipe = [];

pipe[0] = {
   x : cvs.width,
   y : 0
}

document.addEventListener('keydown', function() {
  yPos -= 35;
  fly.play();
});

/*document.body.addEventListener("mousemove", function () {
   fail.muted = true;
   fail.play();
})*/

//pipeBottom.onload = draw;

$('#new-game').click(() => {
   $('#menu').hide();
   draw();
});

pipeBottom.onload = () => {
   ctx.drawImage(bg, 0, 0);
   ctx.drawImage(fg, 0, cvs.height - fg.height );   
};

function draw() {
   setTimeout(function() {
      ctx.drawImage(bg, 0, 0);



      for(var i = 0; i < pipe.length; i++) {
         ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
         ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
     
         if(xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
            || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {

               gravP = 0;
               gravB = 0;   

               //fail.muted = true;
               fail.muted = false;
               fail.play();
               //location.reload()
               sleep(4000).then(() => { document.location.reload(); });
               //setTimeout(function(){}, 4000); // Перезагрузка страницы
               
         } else if(gravP != 0) {
            gravP = 1;
            gravB = 1;
         }

         if(pipe[i].x == 5) {
            score++;
            score_audio.play();
         }

         if(pipe[i].x == 125) {
            pipe.push({
            x : cvs.width,
            y : Math.floor(Math.random() * (pipeUp.height - 20)) - (pipeUp.height - 20)
            });
         }

         pipe[i].x -= gravP;
      
      }

      ctx.drawImage(fg, 0, cvs.height - fg.height );
      ctx.drawImage(bird, xPos, yPos);

      ctx.fillStyle = "#000";
      ctx.font = "24px Verdana";
      ctx.fillText("Рахунок: " + score, 10, cvs.height - 20);

      yPos += gravB;

     

      requestAnimationFrame(draw);
   }, 1000 / fps);
 }

 function sleep(ms) {
   return new Promise(resolve => setTimeout(resolve, ms));
 }

 