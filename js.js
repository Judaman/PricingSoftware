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

  myQuery(function(err, result) {
      if (err) {
        console.log(err);
      }
      res.json({
        data: result
      });
    },);
  });

  function myQuery(callback) {
    var mysql = require('mysql');

    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "love1565",
      database: "world"
    });
    con.connect(function(err) {
      if (err) throw err;
      con.query("SELECT * FROM city", function(err, result, fields) {
        if (err) throw err;
        console.log(result);
         callback(null, result);
      });
    });
  };


  })
var server = app.listen(8083, function() {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})
