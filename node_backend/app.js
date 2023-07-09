const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const candidateRoute = require("./routes/candidate.routes");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(
  bodyParser.json({
    limit: "200mb",
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "200mb",
    extended: true,
    parameterLimit: 100000,
  })
);

// handle our api routes!
app.get("/", (req, res) => {
  res.sendFile("/public/index.html");
});

app.use("/jobs", jobsRoute);
app.use("/candidate", candidateRoute);

// done! we export it so we can start the site in start.js
module.exports = app;
