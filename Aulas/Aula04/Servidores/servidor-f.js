var http = require('http')
var fs = require('fs')
var mymod = require('./mymod.js')

http.createServer(function(req, res){
	console.log(req.method + " " + req.url + " " + mymod.myDateTime())

	if(req.url.match(/\/[1-3]$/)){
		var num = req.url.split("/")[req.url.length-1]

		fs.readFile('pag' + num + '.html', function(err, data){
			res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
			res.write(data)
			res.end()
		})
	}
	else{
		res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
		res.write("<p>O URL não corresponde ao esperado.</p>")
		res.end()
	}
}).listen(7777)

console.log('Servidor à escuta na porta 7777...')