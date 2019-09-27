var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

// This responds with "Hello World" on the homepage
app.get('/home', function(req, res) {
  console.log("Got a GET request for the homepage");
  //   res.send("home page" + req.params.id)
  res.sendFile('index.html', {
    root: __dirname
  })
})

app.get('/getPrice/:brand/:style/:item', function(req, res) {

  var style = req.params.style;
  var brand = req.params.brand;
  var item = String(req.params.item);

  myQuery(function(err, result) {
    if (err) {
      console.log(err);
    }
    res.json({
    result
    });
  },brand,style,item );
});

function myQuery(callback,brand,style,item) {
  var mysql = require('mysql');
console.log("SELECT " +style+ " FROM " +brand+ " WHERE item =\'" + item + "\';");
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "love1565",
    database: "manu"
  });
  con.connect(function(err) {
    console.log(err);
    if (err) throw err;
    con.query("SELECT " +style+ " FROM " +brand+ " WHERE item =\'" + item + "\';",function(err, result, fields) {

      if (err) throw err;

    var result = result;
      callback(null, result);
    });
  });
};

var server = app.listen(8083, function() {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})
