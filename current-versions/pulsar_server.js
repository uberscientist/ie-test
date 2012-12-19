/**
* 5000: static server
* 5001: pulsar server
* 5002: vein server
**/
var http = require('http');
var Pulsar = require('pulsar');

var connect = require('connect');

var app = connect();
app.use(connect.static('static_pulsar'));
app.use(function(req, res, next){
  console.log('connect req:', req.headers);
  next();
});

app.listen(5000);

var pulsarServer = http.createServer(function(req, res){
  console.log('pulsar req:', req.headers);
}).listen(5001);

var options = {
  host: 'localhost',
  port: 5001,
}

var pulse = Pulsar.createServer(pulsarServer, options);
var channel = pulse.channel('test');
channel.on('ping', function(num){
  channel.emit('pong', num+1);
});
