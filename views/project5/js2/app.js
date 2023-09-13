shownotes();
let addbtn = document.getElementById('addbtn');
addbtn.addEventListener("click", function (e) {
     let addText = document.getElementById("addText");
     let notes = localStorage.getItem("notes");
     if (notes == null) {
          notesObj = [];
     } else {
          notesObj = JSON.parse(notes);
     }
     notesObj.push(addText.value);
     localStorage.setItem("notes", JSON.stringify(notesObj));
     addText.value = "";
     console.log(notesObj);
     shownotes();
})

function shownotes() {
     let notes = localStorage.getItem("notes");
     if (notes == null) {
          notesObj = [];
     } else {
          notesObj = JSON.parse(notes);
     }
     let html = "";
     notesObj.forEach(function (element, index) {
          html += `<div class="noteCard my-2 mx-2" style="width: 18rem;">
     <div class="card-body">
       <h5 class="card-title">Note ${index + 1}</h5>
       <p class="card-text">${element}</p>
       <button id="${index}" onclick = "deletenote(this.id)" class="btn btn-primary">Delete Note</button>
     </div>
   </div>`  ;

     });
     let noteselm = document.getElementById('notes');
     if (notesObj.length != 0) {
          noteselm.innerHTML = html;
     }
     else{
          noteselm.innerHTML = `nothing to show here Add Notes `;
     }
}
// delete a note 
function deletenote(index){
     console.log("I am deleting" , index);

     let notes = localStorage.getItem("notes");
     if (notes == null) {
          notesObj = [];
     } else {
          notesObj = JSON.parse(notes);
     }
     confirm("are you sure you want to delete");
     notesObj.splice(index , 1);
     localStorage.setItem("notes", JSON.stringify(notesObj));
     shownotes();
}

// search 

let search = document.getElementById('searchtxt');
 search.addEventListener("input" , function(){

      let inputvalue = search.value.toLowerCase();
      console.log("input evemt fire" , inputvalue);
      let noteCards = document.getElementsByClassName('noteCard');
      Array.from(noteCards).forEach(function(element){
           let cardtxt = element.getElementsByTagName('p')[0].innerText;
           if(cardtxt.includes(inputvalue)){
                element.style.display = "block";
           }
           else{
               element.style.display = "none";

           }
      })
 })
