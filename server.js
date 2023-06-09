const projectData = {};

// Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

// Dependencies
const bodyParser = require("body-parser");
// Middleware
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

/* Initializing the main project folder */
app.use(express.static("website"));

// set local server
const port = 8000;
const server = app.listen(port, listening);
function listening() {
  console.log("server running");
  console.log(`running on local host ${port}`);
}

// creating GET request
app.get("/", function (req, res) {
  res.send(projectData);
  console.log(req);
});

// POST request
app.post("/", function (req, res) {
  projectData.temperature = req.body.main.temp;
  projectData.date = req.body.date;
  projectData.userResponse = req.body.userResponse;
  res.send("Data added");
});
