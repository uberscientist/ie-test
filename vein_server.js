/**
* 4000: static server
* 4001: pulsar server
* 4002: vein server
**/
var http = require('http');

var connect = require('connect');
var app = connect();
app.use(connect.static('static_vein'));
app.use(function(req, res, next){
  //console.log('connect req:', req.headers);
  next();
});
app.listen(4000);

var Vein = require('vein');

var veinServer = {
  server:
    http.createServer(function(req, res){
      console.log('vein req:', req.headers);
    }).listen(4002)
}

var vein = Vein.createServer(veinServer);

vein.add('test', function(res, a, b){
  res.reply('Recieved:' + a + ', ' + b[0]);
});
