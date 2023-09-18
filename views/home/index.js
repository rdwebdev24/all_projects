const data = [
    {
        name:"Algo visualiser",
        githubUrl:"https://github.com/rdwebdev24/all_projects"
    },
    {
        name:"Suduko",
        githubUrl:"https://github.com/rdwebdev24/all_projects"
    },
    {
        name:"2048",
        githubUrl:"https://github.com/rdwebdev24/all_projects"
    },
    {
        name:"Notes lelo",
        githubUrl:"https://github.com/rdwebdev24/all_projects"
    },
]

var html = ""
function renderHTML(){
    data.forEach((item,index)=>{
        html+=`
        <div class="card">
            <h3>${item.name}</h3>
            <div class="icon-div">
            <a href="/project${index+1}" target="_blank"><i class="fa-solid fa-eye"></i></a>
            <a href=${item.githubUrl} target="_blank"><i class="fa-solid fa-code"></i></a>
            </div>
        </div>`
    })
}
renderHTML();
document.querySelector('.card-wrap').innerHTML = html


