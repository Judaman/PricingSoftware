var express = require('express');
var app = express();
var con = require("./dbCon.js").dbCon;
app.use(express.static(__dirname + '/scripts'));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/scripts/controllers'));
app.use(express.static(__dirname + '/scripts/services'));
app.use(express.static(__dirname + '/node_modules'));


const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())




// This responds with "Hello World" on the homepage
app.get('/', function(req, res) {
  console.log("Got a GET request for the / page");
  //   res.send("home page" + req.params.id)
  res.sendFile('index.html', {
    root: __dirname
  })
});

/// *START* get item price ////
app.get('/getPrice/:brand/:style/:item(*)', function(req, res) {

  var style = req.params.style;
  var brand = req.params.brand;
  var item = String(req.params.item);

  getPrice(function(err, result) {
    if (err) {
      console.log(err);
    }
    res.json({
      result
    });
  }, brand, style, item);

  function getPrice(callback, brand, style, item) {
    con.query("SELECT " + style + " FROM " + brand + " WHERE item =\'" + item + "\';", function(err, result, fields) {
      if (err) throw err;
      var result = result;
      callback(null, result);
    });
  };

});
/// *END*  get item price ////

///*START * get prducts of selected style ///

app.get('/getItems/:brand/:style', function(req, res) {

  var style = req.params.style;
  var brand = req.params.brand;

  getItems(function(err, result) {
    if (err) {
      console.log(err);
    }
    res.json({
      result
    });
  }, brand);
console.log("SELECT " + style + " FROM " + brand + ";");
  function getItems(callback, brand, style) {
    con.query("SELECT item FROM " + brand + ";", function(err, result, fields) {
      if (err) throw err;
      var result = result;
      callback(null, result);
    });
  };

});

/// *END* get prducts of selected style ///


app.post('/saveQuote', function(req, res) {
  console.log('receiving data ...');
   console.log('body is ',req.body);
   res.send("hi");

});

var server = app.listen(8080, function() {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})

///*START* save quote in database ///


///*end * save quote in database ///
