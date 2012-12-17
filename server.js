var http = require('http');

var connect = require('connect');
var app = connect();
app.use(connect.static('static'));
app.use(function(req, res, next){
  console.log('connect req:', req.headers);
  next();
});
app.listen(4000);

var pulsarServer = http.createServer(function(req, res){
  console.log('pulsar req:', req.headers);
}).listen(4001);

/**
var veinServer = http.createServer(function(req, res){
  console.log('vein req:', req.headers);
}).listen(4002);

var Vein = require('vein');
**/

var Pulsar = require('pulsar');
var options = {
  host: 'localhost',
  port: 4001,
}

var pulse = Pulsar.createServer(pulsarServer, options);
var channel = pulse.channel('test');
channel.on('ping', function(num){
  channel.emit('pong', num+1);
});
