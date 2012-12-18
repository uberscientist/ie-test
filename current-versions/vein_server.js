/**
* 4000: static server
* 4001: pulsar server
* 4002: vein server
**/

var http = require('http');
var connect = require('connect');
var Vein = require('vein');

var app = connect();

app.use(connect.static('static_vein'));
app.use(function(req, res, next){
  console.log('connect req:\n', req.headers);
  next();
});

app.listen(4000);

var veinServer = http.createServer().listen(4002);
var vein = Vein.createServer({server: veinServer});

vein.add('test', function(res, a, b){
  res.reply('Recieved:' + a + ', ' + b);
});
