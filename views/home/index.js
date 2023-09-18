var url = 'https://rdwebdev23.onrender.com/'
// var url = 'http://localhost:5000/'

var html = ``
var skeleton = `
<ul class="o-vertical-spacing o-vertical-spacing--l">
<li class="blog-post o-media">
  <div class="o-media__figure">
    <span class="skeleton-box" ></span>
  </div>
</li>
</ul>
<ul class="o-vertical-spacing o-vertical-spacing--l">
<li class="blog-post o-media">
  <div class="o-media__figure">
    <span class="skeleton-box" ></span>
  </div>
</li>
</ul>
<ul class="o-vertical-spacing o-vertical-spacing--l">
<li class="blog-post o-media">
  <div class="o-media__figure">
    <span class="skeleton-box" ></span>
  </div>
</li>
</ul>
<ul class="o-vertical-spacing o-vertical-spacing--l">
<li class="blog-post o-media">
  <div class="o-media__figure">
    <span class="skeleton-box" ></span>
  </div>
</li>
</ul>
<ul class="o-vertical-spacing o-vertical-spacing--l">
<li class="blog-post o-media">
  <div class="o-media__figure">
    <span class="skeleton-box" ></span>
  </div>
</li>
</ul>
`
function renderHTML(data){
    data.forEach((item,index)=>{
        html+=`
        <div class="card">
            <h3>${item}</h3>
            <div class="icon-div">
            <a href="/project${index+1}" target="_blank"><i class="fa-solid fa-eye"></i></a>
            <a href="https://github.com/rdwebdev24/all_projects" target="_blank"><i class="fa-solid fa-code"></i></a>
            </div>
        </div>`
    })
}

async function fetchprojects(){
    document.querySelector('.card-wrap').innerHTML = skeleton
    const res = await fetch(url+'allprojects')
    const {project} = await res.json();
    renderHTML(project);
    document.querySelector('.card-wrap').innerHTML = html
}

fetchprojects()