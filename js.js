var express = require('express');
var app = express();
// This responds with "Hello World" on the homepage
app.get('/home', function(req, res) {
  console.log("Got a GET request for the homepage");
  //   res.send("home page" + req.params.id)
  res.sendFile('index.html', {
    root: __dirname
  })
})

app.get('/getPrice/:style/:brand/:item', function(req, res) {
  console.log(req.params.style + req.params.brand + req.params.item);

  res.json({
      data: {
        style: req.params.style,
        brand: req.params.brand,
        item:req.params.item
      }
    })

res.send(req.params.style + req.params.brand + req.params.item);
  })
var server = app.listen(8083, function() {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})
