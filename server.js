const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

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