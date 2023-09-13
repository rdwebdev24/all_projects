/*******GAME CONSTANT AND VARIABLE*********/


let inputDir = { x: 0, y: 0 };
const food_sound = new Audio('./music/food.mp3');
const game_over_sound = new Audio('./music/gameover.mp3');
const move_sound = new Audio('./music/move.mp3');
const music_sound = new Audio('./music/music.mp3');


let lastPaintTime = 0;
let score = 0;
speed = 15
let snakeArr = [{ x: 13, y: 15 }];
food = { x: 6, y: 7 };


//*********GAME FUNCTIONS*****************// 


function main(ctime) {
     window.requestAnimationFrame(main)
     if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
          return;
     }
     lastPaintTime = ctime;
     gameEngine();
}

/********  COLLIDE FUNCTION  **********/
function isCollide(snake) {
     // if you bump into yourself 
     for (let i = 1; i < snake.length; i++) {
          if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
               return true;
          }

     }
     // if you bump into the wall 
     if (snake[0].x > 18 || snake[0].x < 0 || snake[0].y > 18 || snake[0].y < 0) {
          return true;

     }
}
//*********** Updating the snake array and food *****************//

function gameEngine() {

     if (isCollide(snakeArr)) {
          game_over_sound.play();
          music_sound.pause();
          inputDir = { x: 0, y: 0 }
          snakeArr = [{ x: 13, y: 15 }];
          score = 0;
          if (score != true) {
               score = 0;
               document.getElementById('score').innerHTML = "Score : " + score
          }
     }

     // if you have eaten the food increament the score and regenerate the food

     if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
          score += 1;
          if (score > highscore_value) {
               highscore_value = score
               localStorage.setItem('highscore', JSON.stringify(highscore_value))
               High_score.innerHTML = "High Score : " + highscore_value
          }
          document.getElementById('score').innerHTML = "Score : " + score
          food_sound.play();
          snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
          let a = 2;
          let b = 16;
          food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
     }

     // moving the snake 
     for (let i = snakeArr.length - 2; i >= 0; i--) {
          snakeArr[i + 1] = { ...snakeArr[i] };
     }
     snakeArr[0].x += inputDir.x
     snakeArr[0].y += inputDir.y


     // displaying the snake array 
     board.innerHTML = ''
     snakeArr.forEach((e, index) => {
          snakeElement = document.createElement('div');
          snakeElement.style.gridRowStart = e.y;
          snakeElement.style.gridColumnStart = e.x;
          if (index === 0) {
               snakeElement.classList.add('head')
          }
          else {
               snakeElement.classList.add('snake')
          }
          board.appendChild(snakeElement);
     })
     // displaying the food
     foodElement = document.createElement('div');
     foodElement.style.gridRowStart = food.y;
     foodElement.style.gridColumnStart = food.x;
     foodElement.classList.add('food')
     board.appendChild(foodElement);




}




// MAIN LOGIC start here 


window.addEventListener('keydown', e => {
          inputDir = { x: 0, y: -1 } // start the game 
          move_sound.play();
          music_sound.play()
     switch (e.key) {
          case 'ArrowUp':
               inputDir.x = 0;
               inputDir.y = -1;
               break;
          case 'ArrowDown':
               inputDir.x = 0;
               inputDir.y = 1;
               break;
          case 'ArrowRight':
               inputDir.x = 1;
               inputDir.y = 0;
               break;
          case 'ArrowLeft':
               inputDir.x = -1;
               inputDir.y = 0;
               break;

          default:
               break;
     }

})

// game starting call 
window.requestAnimationFrame(main)



let highscore = localStorage.getItem('highscore');
if (highscore == null) {
     highscore_value = 0;
     localStorage.setItem('highscore', JSON.stringify(highscore_value))
}
else {
     highscore_value = JSON.parse(highscore)
     High_score.innerHTML = "High Score : " + highscore_value
}


document.getElementById('reset_highScore').addEventListener('click', () => {
     // localStorage.clear();
     highscore_value = 0
     High_score.innerHTML = "High Score : " + highscore_value
})





