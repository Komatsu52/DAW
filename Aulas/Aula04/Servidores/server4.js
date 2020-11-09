var http = require('http')
var aux = require('./mymod.js')
var url = require('url')

http.createServer(function(req, res){
	console.log(req.method + " " + req.url + " " + aux.myDateTime())
	var parsed = url.parse(req.url, true)
	res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
	res.write("<p>Hoje: " + aux.myDateTime() + "</p>")
	res.write("<pre>True: " + req.method + JSON.stringify(parsed.query) + "</pre>")
	var parsed2 = url.parse(req.url, false)
	res.write("<pre>False: " + req.method + JSON.stringify(parsed2.query) + "</pre>")
	res.end('Olá turma de ' + aux.myTurma)
}).listen(7777);

console.log('Servidor à escuta na porta 7777...')