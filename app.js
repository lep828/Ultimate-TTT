var express = require("express");
var app     = express();

// Setting up static folders
app.use("/", express.static(__dirname + "/public"));

// 
app.get("/*", function(req, res){
  res.sendFile(__dirname + "/public/views/index.html");
});

app.listen(3000, function(){
  console.log("running on port 3000");
});