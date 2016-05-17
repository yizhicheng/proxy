var proxy=require('http-proxy').createProxyServer({});
// 捕获异常
proxy.on('error', function (err, req, res) {
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });
  res.end('Something went wrong. And we are reporting a custom error message.');
});

var connection = require('./db');
connection.connect();
var sql    = 'SELECT * FROM tb_config';

connection.query(sql, function(err, results) {
  proxy.on(function(err,req,res){
    res.writeHead(500,{
      'Content-Type': 'text/plain'
    });
  });
  var server=require('http').createServer(function(req,res){
    var host= req.headers.host;
    for (var i = 0; i < results.length; i++) {
      if( results[i].domain === host ) {
        proxy.web(req,res,{target: 'http://' + results[i].target_domain });
      }
    }
  });
  server.listen(80);
});
