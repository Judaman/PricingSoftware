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

  var style = req.params.style;
  var brand = req.params.brand;
  var item = req.params.item;

  myQuery(function(err, result) {
    if (err) {
      console.log(err);
    }
    res.json({
      data: result
    });
  },brand,style,item );
});

function myQuery(callback,brand,style,item) {
  var mysql = require('mysql');

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "love1565",
    database: brand
  });
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM "  + item, function(err, result, fields) {
      if (err) throw err;
      console.log(result);
      callback(null, result);
    });
  });
};

var server = app.listen(8083, function() {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})
