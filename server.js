const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/views")); // Serve EJS template

app.set("views", __dirname + "/views/");

app.get("/home", (req, res) => {
  res.render("home");
});

app.get("/project1", (req, res) => {
  res.render("index");
});
app.get("/project2", (req, res) => {
  res.render("index");
});
app.get("/project3", (req, res) => {
  res.render("index");
});

app.get("/project4", (req, res) => {
  res.render("index");
});
app.get("/project", (req, res) => {
  res.render("index");
});
app.get("/project5/js1", (req, res) => {
  res.render("index");
});
app.get("/project5/js2", (req, res) => {
  res.render("index");
});



app.get("/", (req, res) => {
  res.send({ status: 400, msg: "success" });
});

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT} 🔥`);
});