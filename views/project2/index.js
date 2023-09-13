const cursor = document.querySelector('.cursor');
const cont = document.querySelector('.cont');
const heading = document.querySelector('.heading');
const cursorSound = document.getElementById('cursorSound'); // Get the audio element
const numRows = 12
const numCols = 12
const totalBoxes = numRows * numCols ;
var msgStr = "CHALA JAA BSDK";
var headStr = ""
var strIdx = 0;

window.addEventListener('mousemove',(e)=>{
    cursor.style.display = 'block';
    cursor.style.left = e.pageX+'px'
    cursor.style.top = e.pageY+'px'
})

document.addEventListener('mouseleave', () => {
    cursor.style.display = 'none';
});


async function createBoxes(){
    for (var i = 0; i < totalBoxes; i++) {
        const box = document.createElement('div');
        box.classList.add('box'); 
        cont.appendChild(box);
    }
    const boxes = document.querySelectorAll('.box');
    const interval = setInterval(async() => {
        if(strIdx>msgStr.length-1){clearInterval(interval);cursor.style.transition = "";return;}
        console.log('aa');
        const randIdx = getrandom();
        boxes[randIdx].classList.add("show")
        boxes[randIdx].textContent = msgStr[strIdx];
        await sleep(500)
        moveCursor(boxes,randIdx);
    }, 1500);
}

function sleep(ms) {return new Promise((resolve) => setTimeout(resolve, ms));}
  
function getrandom(){return Math.floor(Math.random()*totalBoxes);}

async function moveCursor(boxes,randIdx){
    const boxTop = boxes[randIdx].getBoundingClientRect().top
    const boxLeft = boxes[randIdx].getBoundingClientRect().left
    const boxwid = boxes[randIdx].getBoundingClientRect().width/2
    const boxhgt = boxes[randIdx].getBoundingClientRect().height/2
    console.log({boxTop,boxLeft});
    
    cursor.style.transition = "all 0.2s linear"
    cursor.style.left = (boxLeft+boxwid)+'px'
    cursor.style.top = (boxTop+boxhgt)+'px'
    await sleep(500);
    headStr+=msgStr[strIdx];
    heading.textContent = headStr
    strIdx++;
    cursorSound.play();
    boxes[randIdx].classList.add("click");
    await sleep(500)
    cursorSound.pause();
    cursorSound.currentTime = 0;
    boxes[randIdx].classList.remove("click");
    boxes[randIdx].classList.remove("show")
}


createBoxes();