var express = require("express");
var config  = require("./config/config");
var app     = express();

// Setting up static folders
app.use("/", express.static(__dirname + "/public"));

// Directs all paths to index page
app.get("/*", function(req, res){
  res.sendFile(__dirname + "/public/views/index.html");
});

app.listen(config.port, function(){
  console.log("running on port " + config.port);
});
