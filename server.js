var express = require('express'); //used for routing
var app = express();
var http = require('http').Server(app); //used to provide http functionality
var path = require('path');
var loginroute = require('./routes/loginroute.js')(app, path);
var accountroute = require('./routes/accountroute.js')(app, path);
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(__dirname + "/www"));
let server = http.listen(3000, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log("My First Nodejs Server!");
  console.log("Server listening on: "+ host + " port: " + port);
});
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/www/index.html');
});
app.get('/test', function (req, res) {
  res.sendFile(__dirname + '/www/test.html');
});
app.post('/api/login', function(req, res) {
  if (!req.body) {
    return res.sendStatus(400);
  }
  const verified = {
    "aoeu@aoeu.aoeu": hashCode("aoeu@aoeu.aoeu||aoeu||"),
    "ueoa@ueoa.ueoa": hashCode("ueoa@ueoa.ueoa||ueoa||"),
    "1234@1234.1234": hashCode("1234@1234.1234||1234||")
  };
  var customer = {};
  customer.email = req.body.email;
  customer.hash = req.body.hash;
  if (verified[customer.email] === customer.hash) {
    customer.valid = true;
  } else {
    customer.valid = false;
  }
  res.send(customer);
})

// dylan.prior@griffith.edu.au