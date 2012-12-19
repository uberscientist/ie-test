/**
* 000: static server
* 5001: pulsar server
* 5002: vein server
**/

//var http = require('http');
var connect = require('connect');
var Vein = require('vein');

//Static server
var app = connect();
app.use(connect.static('static_vein'));
app.use(function(req, res, next){
  console.log('STATIC req:\n', req.headers);
  res.headers
  next();
});

app.listen(5000);

//Vein server
var veinServer = connect();
veinServer.use(function(req, res, next){
  console.log('VEIN req:\n', req.headers);
  res.headers
  next();
});

var vein = Vein.createServer(veinServer.listen(5002));

vein.add('test', function(res, a, b){
  res.reply(' Yes! The answer is ' + a * b);
});
