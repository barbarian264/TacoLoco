// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: "application/vnd.api+json"
}));

// Star Wars Characters (DATA)
// =============================================================
var reservations = [{
  routeName: "mike",
  name: "Michael Hill",
  address: "Fundillo Dr.",
  city: "Dallas",
  phone: 214566323
}];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  // res.send("Welcome to the Star Wars Page!")
  res.sendFile(path.join(__dirname, "view.html"));

  

});

app.get("/add", function(req, res) {
  
  res.sendFile(path.join(__dirname, "add.html"));

});

// Get all characters
app.get("/all", function(req, res) {
  res.json(reservations);

  // for(i=0;i<reservations.length;i++){
     
  //    var chosen = []; 
  //    chosen[i] = res.reservations[i];

  // }
});

app.get("/api/:reservations?", function(req, res) {
  var chosen = req.params.reservations;

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < reservations.length; i++) {
      if (chosen === reservations[i].routeName) {
        return res.json(reservations[i]);
      }
    }
    return res.json(false);
  }
  return res.json(reservations);
});


app.post("/api/new", function(req, res) {
  
  var newreservation = req.body;

  console.log(newreservation);

  
  reservations.push(newreservation);

  
  res.json(newreservation);
});


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
