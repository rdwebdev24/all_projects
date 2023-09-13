console.log('suduko solver');

const board = document.querySelector('#board');
const numberBox = document.querySelector('#number-div')
const nums = document.querySelectorAll('.num');
const delete_num = document.querySelector('#delete-num');
const clear_btn = document.querySelector('.clear-btn');
const solve_btn = document.querySelector('.solve-btn');

// change according to on which element my cursor is
var currbox = 0
var stop = false;
var running = false;
const hardStr = "8---3----6--7--9-2---5--7---4-57---3---1--3---1--68--8-5--1-9--4-----5-7------1--"
const boxArr = ["1,2,3,10,11,12,19,20,21","4,5,6,13,14,15,22,23,24","7,8,9,16,17,18,25,26,27","28,29,30,37,38,39,46,47,48","31,32,33,40,41,42,49,50,51","34,35,36,43,44,45,51,52,52","55,56,57,64,65,66,73,74,75","58,59,60,67,68,69,76,77,78","61,62,63,70,71,72,79,80,81"]
// CLEARIGN THE BOARD
clear_btn.addEventListener('click',()=>{
    stop = true;
    running = false;
    document.querySelectorAll('.box').forEach((item)=>{
        item.style.transform = 'rotate(90deg) scale(0)'
        setTimeout(() => {
            item.innerHTML = ""
            item.style.transform = 'rotate(0deg)scale(1)'
        }, 350);
    })
})

// CREATING BOXES
for(var i=1; i<=81; i++){
    const ele = document.createElement('div');
    ele.setAttribute('class','box');
    ele.setAttribute('id',i);
    // ele.innerHTML = i
    board.appendChild(ele);
    if(i%3==0 && i%9!=0) ele.style.borderRightColor = 'black'
    if(i>=19 && i<=27 || i>=45 && i<=54) ele.style.borderBottomColor = 'black'
    // SHOWING THE NUMBER DIV WHENM HOVER ON EACH BOX
    ele.addEventListener('mouseenter', () => {
        const position = ele.getBoundingClientRect();
        numberBox.style.left = ( position.right - 15 ) + 'px';
        numberBox.style.top = ( position.bottom - 15 )+ 'px';
        currbox = ele.getAttribute('id')
    });
}

// HIDE SHOW NUMBER DIV WHEN ENTER AND LEAVE BOARD
board.addEventListener('mouseleave',()=>{if(!running) numberBox.style.transform = 'scale(0)'})
board.addEventListener('mouseenter',()=>{if(!running) numberBox.style.transform = 'scale(1)'})
delete_num.addEventListener('click',()=> document.getElementById(currbox.toString()).innerHTML = '')
solve_btn.addEventListener('click',async()=>{
    stop = false;
    running = true;
    await SUDUKOSOLVER()
})



// WHEN CLICKING ON NUMBER-DIV ELEMENT PLACE THAT ELEMENT TO THE BOARD BOX
nums.forEach((item,index)=>{
    item.addEventListener('click',()=>{
        document.getElementById(currbox.toString()).innerHTML = index+1
        ISVALIDSUDUKO(index+1);
    })
})
// CHECKING THE VALID SUDOKO 
const ISVALIDSUDUKO = (currvalue) => {
    var isfound = false;

    // Get the row and column of the current cell
    const startRow = Math.floor((currbox - 1) / 9);
    const startCol = (currbox - 1) % 9;
    const boxNumber = GETLARGEBOXNUMBER(startRow,startCol);
    
    // checking in each box for the same value 
    boxArr[boxNumber].split(',').forEach(item=>{
        if(item!=currbox && document.getElementById(item).innerHTML==currvalue){
            alert('same values not allowed');
            document.getElementById(currbox).innerHTML = ''
            isfound = true;
        }
    })
    if(isfound)return;

    // CHECK FOR SAME VALUES IN RIGHT
    var currboxvalue = Number(currbox);
    while(true){
        if(currboxvalue%9==0){break;}
        ++currboxvalue;
        if(document.getElementById(currboxvalue.toString())?.innerHTML==currvalue){
            alert('same values not allowed');
            document.getElementById(currbox.toString()).innerHTML = ''
            isfound = true;
            break;
        }
    }
    if(isfound)return;

    // CHECK FOR SAME VALUES IN LEFT
    currboxvalue = Number(currbox);
    while(true){
        if((currboxvalue-1)%9==0){break;}
        --currboxvalue;
        if(document.getElementById(currboxvalue.toString())?.innerHTML==currvalue){
            alert('same values not allowed');
            document.getElementById(currbox.toString()).innerHTML = ''
            isfound = true;
            break;
        }
    }
    if(isfound)return

    // CHECK FOR SAME VALUES IN top
    currboxvalue = Number(currbox);
    while(true){
        currboxvalue = currboxvalue-9;
        if(currboxvalue<=0){break;}
        if(document.getElementById(currboxvalue.toString()).innerHTML==currvalue){
            alert('same values not allowed');
            document.getElementById(currbox.toString()).innerHTML = ''
            isfound = true;
            break;
        }
    }
    if(isfound)return

    // CHECK FOR SAME VALUES IN bottom
    currboxvalue = Number(currbox);
    while(true){
        currboxvalue+=9;
        if(currboxvalue>81){break;}
        if(document.getElementById(currboxvalue.toString())?.innerHTML==currvalue){
            alert('same values not allowed');
            document.getElementById(currbox.toString()).innerHTML = ''
            break;
        }
    }
}
// GETTING THE LARGER BOX NUMBER 
function GETLARGEBOXNUMBER(row, col) {
    // Divide the row and column indices by 3 and round down to find the large box
    const largeBoxRow = Math.floor(row / 3);
    const largeBoxCol = Math.floor(col / 3);
    // Calculate the large box number (0-8) based on row and column
    const largeBoxNumber = largeBoxRow * 3 + largeBoxCol;
    return largeBoxNumber;
}
// CONVERTING BOARD TO STRING 
function BOARDTOSTRING() {
    var string = "";
    var validNum = /[1-9]/;
    var boxes = document.querySelectorAll(".box");
    for (var i = 0; i < boxes.length; i++) {
        if (validNum.test(boxes[i].innerText)) string += boxes[i].innerText;
        else string += "-";
    }
    return string;
}
// CONVERTING STRING TO BOARD
function STRINGTOBOARD(string) {
    if(!string) return;
    var currentCell;
    var validNum = /[1-9]/;
    var cells = string.split("");
    var boxes = document.querySelectorAll(".box");
    for (var i = 0; i < boxes.length; i++) {
        currentCell = cells.shift();
        if (validNum.test(currentCell)) boxes[i].innerText = currentCell;
    }
}

// SUDUKO SOLVER FUNCTION
async function SUDUKOSOLVER (){
    const boardString = BOARDTOSTRING();
    const solvedString = await RECURSIVESOLVE(boardString);
    STRINGTOBOARD(solvedString);
    running = false;
}

async function RECURSIVESOLVE(boardString) {
    var boardArray = boardString.split("");
    if (BOARDISSOLVED(boardArray)) {return boardArray.join("");}
    var cellPossibilities = getNextCellAndPossibilities(boardArray);
    var nextUnsolvedCellIndex = cellPossibilities.index;
    var possibilities = cellPossibilities.choices;
    for (var i = 0; i < possibilities.length; i++) {
        if(stop){return;}
        boardArray[nextUnsolvedCellIndex] = possibilities[i];
        STRINGTOBOARD(boardArray.join(""));
        await sleep(10); 
        var solvedBoard = await RECURSIVESOLVE(boardArray.join(""));
        if (solvedBoard) {
            return solvedBoard;
        }
    }
    return false;
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getNextCellAndPossibilities(boardArray) {
  for (var i = 0; i < boardArray.length; i++) {
    if (boardArray[i] === "-") {
      var existingValues = getAllIntersections(boardArray, i);
      var choices = ["1", "2", "3", "4", "5", "6", "7", "8", "9"].filter(function (num) {
        return existingValues.indexOf(num) < 0;
      });
      return { index: i, choices: choices };
    }
  }
}

function getAllIntersections(boardArray, i) {
    return getRow(boardArray, i).concat(getColumn(boardArray, i)).concat(getBox(boardArray, i));
}

function getRow(boardArray, i) {
  var startingEl = Math.floor(i / 9) * 9;
  return boardArray.slice(startingEl, startingEl + 9);
}

function getColumn(boardArray, i) {
  var startingEl = Math.floor(i % 9);
  return [0, 1, 2, 3, 4, 5, 6, 7, 8].map(function (num) {
    return boardArray[startingEl + num * 9];
  });
}

function getBox(boardArray, i) {
  var boxCol = Math.floor(i / 3) % 3;
  var boxRow = Math.floor(i / 27);
  var startingIndex = boxCol * 3 + boxRow * 27;
  return [0, 1, 2, 9, 10, 11, 18, 19, 20].map(function (num) {
    return boardArray[startingIndex + num];
  });
}


function BOARDISSOLVED(boardArray) {
    for (var i = 0; i < boardArray.length; i++) {if (boardArray[i] === "-") return false;}
    return true;
}
