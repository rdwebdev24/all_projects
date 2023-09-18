const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/views")); 

app.set("views", __dirname + "/views/");

app.get("/home", (req, res) => {
  res.render("home");
});

function getProjectNames() {
  const viewsDir = path.join(__dirname, "views");
  return fs.readdirSync(viewsDir).filter(item => fs.statSync(path.join(viewsDir, item)).isDirectory());
}

function getTitleFromHTML(projectName) {
  const htmlFilePath = path.join(__dirname, "views", projectName, "index.html");
  
  if (fs.existsSync(htmlFilePath)) {
    const htmlContent = fs.readFileSync(htmlFilePath, "utf-8");
    const $ = cheerio.load(htmlContent);
    const title = $("title").text();
    return title;
  } else {
    return null; 
  }
}

app.get("/allprojects", (req, res) => {
  const projectNames = getProjectNames();
  var project = []
  projectNames.forEach(item=>{
    const title = getTitleFromHTML(item);
    project.push(title)
  })
  project.shift();
  res.send({ status: 400, msg: "success" ,project});
});

app.get("/:projectName", (req, res) => {
  const projectName = req.params.projectName;
  const projectPath = path.join(__dirname, "views", projectName);
  if (fs.existsSync(projectPath)) {
    res.render(path.join(projectName, "index"));
  } else {
    res.status(404).send("Project not found");
  }
});

app.get("/", (req, res) => {
  res.send({ status: 400, msg: "success" });
});

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT} 🔥`);
});