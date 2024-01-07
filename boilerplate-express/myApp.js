let express = require("express");
let app = express();
let bodyParser = require("body-parser");
require("dotenv").config();

// console.log("Hello World");

// #2
// app.get("/", function (req, res) {
//   res.send("Hello Express");
// });

// #4
app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
// #7
app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

// #3
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// #5
app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: "Hello json".toUpperCase() });
  } else {
    res.json({ message: "Hello json" });
  }
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({
      time: req.time,
    });
  }
);

// app.get("/:word/echo", (req, res) => {
//   var param1 = req.params.param1;
//   res.json({
//     echo: word,
//   });
// });

app.get("/:word/echo", (req, res) => {
  res.json({ word: req.params.word });
});

// app.get("/name", (req, res) => {
//   var firstName = req.query.first;
//   var lastName = req.query.last;
//   res.json({ name: `${firstName} ${lastName}` });
// });

app.get("/name", (req, res) => {
  var { first: firstName, last: lastName } = req.query;
  res.json({ name: `${firstName} ${lastName}` });
});

app.post("/name", (req, res) => {
  //handle the data in the request
  var string = req.body.first + " " + req.body.last;
  res.json({ name: string });
});

module.exports = app;
