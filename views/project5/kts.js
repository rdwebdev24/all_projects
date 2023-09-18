const form = document.querySelector('.form');

const color = {warning:"#FFBB5C",success:"green",danger:"crimson",}
var userArr = [];
var eventId = 0;
var timerInterval;
var hours;
var minutes;
var seconds = 0;
// showing home and about functions
const showAnalysis = () => {
    document.querySelector('#analysis').style.display = 'flex'
    document.querySelector('#home').style.display = 'none'
    document.querySelector('#about').style.display = 'none'
};
const showHome = () => {
    document.querySelector('#home').style.display = 'flex'
    document.querySelector('#about').style.display = 'none'
    document.querySelector('#analysis').style.display = 'none'
};
const showAbout = () => {
    document.querySelector('#home').style.display = 'none'
    document.querySelector('#analysis').style.display = 'none'
    document.querySelector('#about').style.display = 'block'
};
// onloading to set userArr and to retrive to localstorage
window.onload = function() {
    const data = localStorage.getItem('userevent');
    if(!data){
        localStorage.setItem('userevent',JSON.stringify(userArr));
    }else{
        userArr = JSON.parse(data);
        DISPLAY_TASK();
    }
};
// taking the values from the user to create event
const submitHandler = (e) => {
    e.preventDefault();
    const Data = new FormData(e.target);
    const userEvent = {
        start_time : Data.get('start_time'),
        end_time : Data.get('end_time'),
        goal : Data.get('goal'),
    }
    const currentdate = new Date();
    const hour = currentdate.getHours();
    const min = currentdate.getMinutes();
    if(!(userEvent.start_time && userEvent.end_time && userEvent.goal)){
        SHOW_ALERT('kuch to bhar bhaii !!','#FFBB5C')
        return;
    }
    // checking user set hour and min with the current time (if less than cant set event)
    if(Number(userEvent.start_time.split(':')[0]) < hour || Number(userEvent.start_time.split(':')[1])<min){SHOW_ALERT(`invalid time3`,color.warning);return;}
    // checking if end minutes is less than start minutes
    if(Number(userEvent.start_time.split(':')[1]) > Number(userEvent.end_time.split(':')[1])){SHOW_ALERT(`invalid time1`,color.warning);return;}
    // checking is start hour is less than end hour
    if(Number(userEvent.start_time.split(':')[0]) > Number(userEvent.end_time.split(':')[0])){SHOW_ALERT(`invalid time2`,color.warning);return;}
    document.querySelector('form').reset()
    userArr.push(userEvent);
    localStorage.setItem('userevent',JSON.stringify(userArr));
    SHOW_ALERT('task added','#03C988')
    DISPLAY_TASK();
    if(userArr.length==1) START_TIMER();
};
// listening event on form
form.addEventListener('submit',submitHandler);
// displaying the event data 
const DISPLAY_TASK = () => {
    var html = '';
    userArr.forEach((item,index)=>{
        html+=`
        <div class="task-item">
            <div class="details">
                <p>${item.goal}</p>
                <div class="st-en-tm">
                <span>${item.start_time} - </span>
                <span>${item.end_time}</span>
            </div>
        </div>
            <div class="icons">
                <input class="check-task" type="checkbox">
                <i class="fa fa-trash-o"></i>
            </div>
        </div>`
        })
            
        if(userArr.length==0){
            document.querySelector('.task-list').innerHTML = '<p style="color:#333" >No task added</p>'
            document.querySelector('.task-list').classList.add('task-list-empty')
        }
        else{
            document.querySelector('.task-list').classList.remove('task-list-empty')
            document.querySelector('.task-list').innerHTML = html
        }
        
    const taskItem = document.querySelectorAll('.fa-trash-o');
    
    taskItem.forEach((item,index)=>{
        item.addEventListener('click',()=>{
            userArr = userArr.filter((item,idx)=>index!=idx);
            SHOW_ALERT('task deleted','crimson')
            localStorage.setItem('userevent',JSON.stringify(userArr));
            DISPLAY_TASK();
        })
    })
};
// craeting alert each time a event is fired ( event : create , delete)
const SHOW_ALERT = (msg,color) => {
    const alert = document.createElement('div');
    alert.setAttribute('class','alert');
    document.querySelector('.container').appendChild(alert);
    setTimeout(() => {
        alert.style.top = '10%'
        alert.style.backgroundColor = color
        alert.textContent = msg
    }, 100);
    setTimeout(() => {alert.style.top = '0%'}, 1500);
    setTimeout(() => {document.querySelector('.container').removeChild(alert);}, 1600);
};
// stating the timer 
const START_TIMER = () => {
    
    const DATE = new Date();
    const events = JSON.parse(localStorage.getItem('userevent'))
    const nextEvent = events[eventId];
    console.log({nextEvent});
    const hrsgap = Number(nextEvent.start_time.split(':')[0]) - DATE.getHours() ; // calculating the hours gap after which the event will fire
    const mingap = Number(nextEvent.start_time.split(':')[1]) - DATE.getMinutes() ; // calculating the minutes gap after which the event will fire
    const total_time_gap = hrsgap*60*60*1000+mingap*60*1000;
    setTimeout(() => {
        SHOW_ALERT('timer started',color.success);
        const date = new Date();
        var currenttime = date.getTime();
        var timeString = events[eventId].end_time;
        var starttimeString = events[eventId].start_time;
        // // Split the timeString into hours and minutes
        var parts = timeString.split(":");
        var hrs = parseInt(parts[0]);
        var min = parseInt(parts[1]);
        
        // // Create a new Date object with the current date and the specified time
        date.setHours(hrs);
        date.setMinutes(min);
        // calculating the endtime
        var endtime = date.getTime();
        // time remaining for event to end
        const elapsedTime = endtime - currenttime;
        // converting it to minute and second
        const elapsedMinutes = Math.floor(elapsedTime / (1000 * 60));
        const elapsedHours = Math.floor(elapsedTime / (1000 * 60 * 60));
        // assigning them to hours and sec for settimeinterval use
        hours = elapsedHours;
        minutes = elapsedMinutes;
        // updating the DOM
        document.querySelector('.goal').textContent = events[eventId].goal
        document.querySelector('.st').children[1].textContent = events[eventId].start_time
        document.querySelector('.en').children[1].textContent = events[eventId].end_time
        // statiing the timer
        timerInterval = setInterval(updateTimer, 1000);
    }, total_time_gap );
}


// Function to update and display the timer
function updateTimer() {
    // Display the current time
    var timerDisplay = document.getElementById("timer");
    timerDisplay.textContent = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds);
    // Check if the timer has reached zero
    if (hours === 0 && minutes === 0 && seconds === 0) {
        clearInterval(timerInterval);
        eventId++;
        START_TIMER();
        SHOW_ALERT("Timer has reached zero!",color.danger)
    } else {
        // Decrement the time
        if (seconds > 0) {
            seconds--;
        } else if (minutes > 0) {
            minutes--;
            seconds = 59;
        } else if (hours > 0) {
            hours--;
            minutes = 59;
            seconds = 59;
        }
    }
}

// Function to format time values (e.g., add leading zeros)
function formatTime(time) {
    return (time < 10 ? "0" + time : time);
}
