const board = document.querySelector(".board");
const select = document.querySelector("#select");
var selectEle = document.querySelector("#select-ele");
var selectspeed = document.querySelector("#select-speed");
const startBtn = document.querySelectorAll(".btn")[0];
const shuffleBtn = document.querySelectorAll(".btn")[1];
const boardwid = board.getBoundingClientRect().width

// variables
selectspeed.value = 100
var left = 0;
var height = 0;
var eleCnt = 100;
var elements = [];

function getRandomColor() {
  // Generate random values for red, green, and blue components
  const red = Math.floor(Math.random() * 256); // 0 to 255
  const green = Math.floor(Math.random() * 256); // 0 to 255
  const blue = Math.floor(Math.random() * 256); // 0 to 255
  // Create a CSS color string in the format "rgb(r, g, b)"
  const color = `rgb(${red}, ${green}, ${blue})`;
  return color;
}

// shuffling the elements
shuffleBtn.addEventListener("click", async () => {
  const selectedEle = selectEle.value;
  if(selectedEle==''){alert('please choose number of elements');return}
  for (let i = elements.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    var temp = parseInt(elements[i].style.left);
    elements[j].style.transition = "all 0.3s linear";
    elements[i].style.left = parseInt(elements[j].style.left) + "px";
    elements[j].style.left = temp + "px";
    elements[j].style.background = "#fff";
    [elements[i], elements[j]] = [elements[j], elements[i]];
  }
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function playSound(height) {
  const frequency = 200 + height; // Adjust as needed
  const sound = new Howl({
    src: ["./sine.mp3"], // Replace with your audio file path
    volume: 0.5, // Adjust the volume as needed
    rate: frequency / 440,
  });

  sound.play();

  const fadeDuration = 500; // Adjust the duration of the fade-out (in milliseconds)
  const initialVolume = sound.volume();

  // Schedule the fade-out
  const fadeInterval = setInterval(() => {
      const elapsedTime = sound.seek() * 1000; // Get elapsed time in milliseconds
      const remainingTime = fadeDuration - elapsedTime;

      if (remainingTime <= 0) {
          sound.fade(initialVolume, 0, 0); // Fade to 0 volume
          clearInterval(fadeInterval); // Stop the interval when the fade is complete
          setTimeout(() => {
              sound.stop(); // Stop the sound after the fade-out is complete
          }, fadeDuration);
      } else {
          const targetVolume = initialVolume * (remainingTime / fadeDuration);
          sound.fade(initialVolume, targetVolume, 0);
      }
  }, 50); // Adjust the interval as needed
}

// Function to animate the merge sort process
async function animateMergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  await animateMergeSort(left);
  await animateMergeSort(right);

  let leftIndex = 0;
  let rightIndex = 0;
  let mainIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (parseInt(left[leftIndex].style.height) < parseInt(right[rightIndex].style.height)) {
      arr[mainIndex++] = left[leftIndex++];
    } else {
      arr[mainIndex++] = right[rightIndex++];
    }
  }

  while (leftIndex < left.length) {
    arr[mainIndex++] = left[leftIndex++];
  }

  while (rightIndex < right.length) {
    arr[mainIndex++] = right[rightIndex++];
  }

  // Delay for visualization
  await sleep(selectspeed.value);

  // Rearrange elements visually
  pos = 0;
  for (var i = 0; i < arr.length; i++) {
    arr[i].style.left = `${pos}px`;
    arr[i].style.transition = 'all 0.3s linear'
    playSound(parseInt(arr[i].style.height))
    pos +=  parseInt(boardwid/eleCnt);
  }
}

async function selectionSort(arr) {
  document.querySelectorAll('.element').forEach(item=>{
    item.style.transition = 'all 0.3s linear'
  })
  var min, minidx;
  for (var i = 0; i < arr.length - 1; i++) {
    min = parseInt(arr[i].style.height);
    minidx = i;

    for (var j = i + 1; j < arr.length; j++) {
      if (parseInt(arr[j].style.height) < min) {
        min = parseInt(arr[j].style.height);
        minidx = j;
      }
    }

    if (minidx !== i) {
      // var temp = parseInt(arr[i].style.height);
      // arr[i].style.height = parseInt(arr[minidx].style.height)+'px';
      // arr[minidx].style.height = temp+'px';

      arr[minidx].style.background = "red";
      arr[i].style.background = "red";
      arr[i].style.transform = `translateY(-50%)`;
      
      var temp = parseInt(arr[i].style.left);
      arr[i].style.left = parseInt(arr[minidx].style.left) + "px";
      arr[minidx].style.left = temp + "px";
      [arr[i], arr[minidx]] = [arr[minidx], arr[i]];
      
      // const frequency = calculateFrequency(parseInt(arr[i].style.height));
      playSound(parseInt(arr[i].style.height));
      
      await sleep(selectspeed.value);
      arr[i].style.background = "lightgreen";
      arr[minidx].style.background = "#fff";
      arr[minidx].style.transform = "translateY(0)";
    }
  }
  document.querySelectorAll('.element').forEach(item=>{
    item.style.transition = ''
  })
}

async function bubbleSort(arr) {
  const n = arr.length;
  let swapped;
  var lastSortedIndex = n - 1;
  do {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      if (parseInt(arr[i].style.height) > parseInt(arr[i+1].style.height)) {
        // Swap arr[i] and arr[i+1]
        arr[i].style.background = "green";
        
        var temp = parseInt(arr[i].style.left);
        arr[i].style.left = parseInt(arr[i+1].style.left) + "px";
        arr[i+1].style.left = temp + "px";
        playSound(temp);
        
        [arr[i],arr[i+1]] = [arr[i+1],arr[i]]
        lastSortedIndex = i;
        swapped = true;
        await sleep(selectspeed.value)
        arr[i+1].style.background = "#fff";
      }
    }
    playSound(parseInt(arr[lastSortedIndex+1].style.height));
    arr[lastSortedIndex+1].style.background = "green";
  } while (swapped);
}


// Event listener for the merge sort button
startBtn.addEventListener("click", async () => {
  const selectedAlgorithm = select.value;
  if(selectedAlgorithm==''){alert('please choose a algo');return}
  if (selectedAlgorithm == "merge") animateMergeSort(elements);
  if (selectedAlgorithm == "selection") selectionSort(elements);
  if (selectedAlgorithm == "bubble") bubbleSort(elements);
});

selectEle.addEventListener('change',(e)=>{
  board.innerHTML = ""
 
  left = 0;
  height = 0;
  elements = [];
  eleCnt = e.target.value;
  for (var i = 1; i <= eleCnt; i++) {
    const ele = document.createElement("div");
    ele.setAttribute("class", "element");

    ele.style.width = (parseInt(boardwid/eleCnt)-5)+'px'
    ele.style.height = `${height + i}px`;
    ele.style.left = `${left}px`;
    ele.style.background = "#fff";
    left += parseInt(boardwid/eleCnt);
    height += 1;
    board.append(ele);
    elements.push(ele); // Add the element to the array
  }
})

window.onload = function (){
  board.innerHTML = ""
  selectEle.value = 100
  left = 0;
  height = 0;
  elements = [];
  for (var i = 1; i <= eleCnt; i++) {
    const ele = document.createElement("div");
    ele.setAttribute("class", "element");

    const boardwid = board.getBoundingClientRect().width
    ele.style.width = (parseInt(boardwid/eleCnt))+'px'
    ele.style.height = `${height + i}px`;
    ele.style.left = `${left}px`;
    ele.style.background = "#fff";
    left += parseInt(boardwid/eleCnt)+1;
    height += 1;
    board.append(ele);
    elements.push(ele); // Add the element to the array
  }
}