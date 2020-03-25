const express = require('express');
const handlers = require('./handlers');
const bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", handlers.get);
app.post("/", handlers.post);

app.listen(8080, (err) => {
  if (err) {
    console.log(err, "Error");
    return;
  }
  console.log("Server started: Port 8080...");
});