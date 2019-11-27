var express = require('express');
var app = express();

app.use(express.static(__dirname + '/scripts'));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/scripts/controllers'));
app.use(express.static(__dirname + '/node_modules'));

// This responds with "Hello World" on the homepage
app.get('/', function(req, res) {
  console.log("Got a GET request for the / page");
  //   res.send("home page" + req.params.id)
  res.sendFile('index.html', {
    root: __dirname
  })
})

var server = app.listen(8080, function() {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})
