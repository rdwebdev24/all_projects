// INITIALISING
const boxes = document.querySelectorAll(".box");
const board = document.querySelector(".board");
const Score = document.querySelector(".score");
const BestScore = document.querySelector(".best-score");
const newgame_btn = document.querySelector(".newgame");
// VARAIABLES
var score = 0;
var best = 20;
var boardArr = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
]
var color = {
  2:"#eee4da",
  4:"#eee1c9",
  8:"#f3b27a",
  16:"#f69664",
  32:"#f77c5f",
  64:"#f75f3b",
  128:"#edd073",
  256:"#edd073",
  512:"#edd073",
  1024:"#edd073",
  2046:"#edd073",
}
// RANDOM NUMBER GENERAOTR
function getrandomIndex() {return Math.floor(Math.random() * boxes.length);}
// DELAY FUNSTION
function sleep(ms){return new Promise((resolve)=>setTimeout(resolve, ms))}

function convertToRowCol(number) {
  if (number < 0 || number > 15) {return null;}
  const row = Math.floor(number / 4);
  const col = number % 4;
  return { row, col };
}

function Reset () {
  score = 0;
  best = 0;
  for(var i=0; i<4; i++){
    for(var j=0; j<4; j++){
      boardArr[i][j] = 0
    }
  }
  updateBoard()
}

function randomNumGenerate() {
  Reset();
  boxes.forEach(item=>{item.innerHTML = ""})
  var rndmIdx1 = getrandomIndex();
  var rndmIdx2 = getrandomIndex();
  // Make sure rndmIdx2 is different from rndmIdx1
  while (rndmIdx2 === rndmIdx1) {rndmIdx2 = getrandomIndex();}
  boxes[rndmIdx1].style.background = '#eee4da'
  boxes[rndmIdx2].style.background = '#eee4da'
  boardArr[convertToRowCol(rndmIdx1).row][convertToRowCol(rndmIdx1).col] = 2
  boardArr[convertToRowCol(rndmIdx2).row][convertToRowCol(rndmIdx2).col] = 2
  updateBoard()
}

newgame_btn.addEventListener('click',()=>{randomNumGenerate()})

window.onload = randomNumGenerate()
window.onload = updateBoard()


function shiftZeroLeft(arr) {
  var result = [];
  for (var i = 0; i < arr.length; i++) {if (arr[i] !== 0) result.push(arr[i])}
  var numberOfZeros = arr.length - result.length;
  for (var j = 0; j < numberOfZeros; j++) result.push(0)
  return result;
}

function shiftZeroRight(arr) {
  var result = [];
  for (var i = 0; i < arr.length; i++) {if (arr[i] !== 0) result.push(arr[i])}
  var numberOfZeros = arr.length - result.length;
  for (var j = 0; j < numberOfZeros; j++) result.unshift(0)
  return result;
}

function shiftZeroBottom() {
  for (let col = 0; col < boardArr[0].length; col++) {
    let nonZeroIndex = 0;
    for (let row = 0; row < boardArr.length; row++) {
      if (boardArr[row][col] !== 0) {
        boardArr[nonZeroIndex][col] = boardArr[row][col];
        if (nonZeroIndex !== row) {
          boardArr[row][col] = 0;
        }
        nonZeroIndex++;
      }
    }
  }
}

function shiftZeroTop() {
  for (let col = 0; col < boardArr[0].length; col++) {
    let zeroIndex = 0;
    for (let row = 0; row < boardArr.length; row++) {
      if (boardArr[row][col] === 0) {
        boardArr[row][col] = boardArr[zeroIndex][col];
        boardArr[zeroIndex][col] = 0;
        zeroIndex++;
      }
    }
  }
}

function updateleft(){
  for(var j=0; j<4; j++){
    for (var i = 0; i < 4; i++) {
      var index = 4*i + j%4;
      if (boardArr[j][i] == boardArr[j][i + 1]) {
        boardArr[j][i] = boardArr[j][i] + boardArr[j][i + 1];
        score +=boardArr[j][i];
        boardArr[j][i + 1] = 0;
      }
    }
    boardArr[j] = shiftZeroLeft(boardArr[j]);
  }
}

function updateRight(){
  for(var j=0; j<4; j++){
    for (var i = 3; i >=0; i--) {
      if (boardArr[j][i] == boardArr[j][i - 1]) {
        boardArr[j][i] = boardArr[j][i] + boardArr[j][i - 1];
        score += boardArr[j][i];
        boardArr[j][i - 1] = 0;
      }
    }
    boardArr[j] = shiftZeroRight(boardArr[j]);
  }
}

function updateBottom(){
  for(var col=0; col<4; col++){
    for (var row = 3; row >0; row--) {
      if (boardArr[row][col] == boardArr[row-1][col]) {
        boardArr[row][col] = boardArr[row][col] + boardArr[row-1][col];
        score+=boardArr[row][col];
        boardArr[row-1][col] = 0;
      }
    }
  }
  shiftZeroTop();
}

function updateTop(){
  for(var col=0; col<4; col++){
    for (var row = 0; row < 3; row++) {
      if (boardArr[row][col] == boardArr[row+1][col]) {
        boardArr[row][col] = boardArr[row][col] + boardArr[row+1][col];
        score+=boardArr[row][col];
        boardArr[row+1][col] = 0;
      }
    }
  }
  shiftZeroBottom();
}

function updateBoard(){
  for(var i=0; i<boardArr.length; i++){
    for(var j=0; j<boardArr.length; j++){
      var index = 4*i + j%4;
      if(boardArr[i][j]<=8) boxes[index].style.color = "#776e65";
      if(boardArr[i][j]!==0) {
        if(boardArr[i][j]%8==0) boxes[index].style.color = "#fff";
        boxes[index].style.background = color[boardArr[i][j]];
        boxes[index].innerText = boardArr[i][j]
      }
      else {
        boxes[index].innerText = ""
        boxes[index].style.background = "#cdc1b4"
      }
    }
  }
  Score.innerText = `Score : ${score}`
  BestScore.innerText = `Best : ${best}`
}

function insertNewNum(){
  var newRow = Math.floor(Math.random() * boardArr.length);
  var newCol = Math.floor(Math.random() * boardArr[0].length);

  while(boardArr[newRow][newCol]!=0){
    newRow = Math.floor(Math.random() * boardArr.length);
    newCol = Math.floor(Math.random() * boardArr[0].length);
  }
  boardArr[newRow][newCol]=2
  var index = 4*newRow+newCol%4;
  boxes[index].innerText = "2";
  boxes[index].style.background = color[2];
}

function checkWin(){
  for(var row=0; row<4; row++){
    for(var col=0; col<4; col++){
      if(boardArr[row][col]==2048){
        alert('win');return;
      }
    }
  }
}

function checkLoose(){
  var loose = true;
  for(var row=0; row<4; row++){
    for(var col=0; col<4; col++){
      if(boardArr[row][col]==0){
        loose = false;
      }
    }
  }
  if(loose){
    alert('loose');
    Reset();
  }
 
}

function checkBest(){
  if(score>=best){best = score;}
}

window.addEventListener('keydown', function(event) {
    switch(event.key) {
      case 'ArrowUp':
        updateTop();
        break;
        case 'ArrowDown':
        updateBottom();
        break;
      case 'ArrowLeft':
        updateleft()
        break;
      case 'ArrowRight':
        updateRight()
        break;
    }
    checkBest()
    updateBoard();
    insertNewNum();
    checkWin();
    checkLoose();
});

