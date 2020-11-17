var http = require('http')
var axios = require('axios')

http.createServer(function (req, res) {
	console.log(req.method + ' ' + req.url)

	if(req.method == 'GET'){
		if(req.url == '/'){
			res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
			res.write('<h2>Escola de Música</h2>')
			res.write('<ul>')
			res.write('<li><a href="/alunos">Lista de Alunos</li>')
			res.write('<li><a href="/cursos">Lista de Cursos</li>')
			res.write('<li><a href="/instrumentos">Lista de Instrumentos</li>')
			res.write('</ul>')
			res.end()
		}

		else if(req.url == '/alunos'){
			axios.get('http://localhost:3000/alunos')
				.then(resp => {
					alunos = resp.data

					res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
					res.write('<h2>Escola de Música: Lista de Alunos</h2>')
					res.write('<ul>')

					alunos.forEach(a => {
						res.write('<li><a href="http://localhost:4000/alunos/' + a.id + '">' + a.id + '</a></li>')
					})

					res.write('</ul>')
					res.write('<address>[<a href="/">Voltar</a>]</address>')
					res.end()

				}).catch(function (error){
					console.log('Erro na obtenção da lista de alunos: ' + error)
			})
		}

		else if(req.url == '/cursos'){
			axios.get('http://localhost:3000/cursos')
				.then(resp => {
					cursos = resp.data

					res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
					res.write('<h2>Escola de Música: Lista de Cursos</h2>')
					res.write('<ul>')

					cursos.forEach(c => {
						res.write('<li><a href="http://localhost:4000/cursos/' + c.id + '">' + c.id + '</a></li>')
					})

					res.write('</ul>')
					res.write('<address>[<a href="/">Voltar</a>]</address>')
					res.end()

				}).catch(function (error){
					console.log('Erro na obtenção da lista de cursos: ' + error)
			})
		}

		else if(req.url == '/instrumentos'){
			axios.get('http://localhost:3000/instrumentos')
				.then(resp => {
					instrumentos = resp.data

					res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
					res.write('<h2>Escola de Música: Lista de Instrumentos</h2>')
					res.write('<ul>')

					instrumentos.forEach(i => {
						res.write('<li><a href="http://localhost:4000/instrumentos/' + i.id + '">' + i.id + '</a></li>')
					})

					res.write('</ul>')
					res.write('<address>[<a href="/">Voltar</a>]</address>')
					res.end()

				}).catch(function (error){
					console.log('Erro na obtenção da lista de instrumentos: ' + error)
			})
		}

		else if(req.url.match(/\/alunos\/[AE]+[0-9]+/)){
			axios.get('http://localhost:3000' + req.url)
				.then(resp => {
					aluno = resp.data

					res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
					res.write('<ul>')
            		res.write('<h2>Aluno nº' + aluno.id + '</h2>')
            		res.write('<p>Id: ' + aluno.id + '</p>')
            		res.write('<p>Nome: ' + aluno.nome + '</p>')
            		res.write('<p>Data de Nascimento: ' + aluno.dataNasc + '</p>')
            		res.write('<p>Curso: <a href="http://localhost:4000/cursos/' + aluno.curso + '">' + aluno.curso + '</a></p>')
            		res.write('<p>Ano do Curso: ' + aluno.anoCurso + '</p>')
            		res.write('<p>Instrumento: ' + aluno.instrumento + '</p>')
            		res.write('</ul>')
					res.write('<address>[<a href="/alunos">Voltar</a>]</address>')
            		res.end();

				}).catch(function (error){
					console.log('Erro na obtenção da informação do aluno: ' + error)
					res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
					res.write('<p>Objeto inexistente: ' + req.url + '</p>')
					res.write('<address>[<a href="/alunos">Voltar</a>]</address>')
					res.end()
			})
		}

		else if(req.url.match(/\/cursos\/[CBS]+[0-9]+/)){
			axios.get('http://localhost:3000' + req.url)
				.then(resp => {
					curso = resp.data

					res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
					res.write('<ul>')
            		res.write('<h2>Curso nº' + curso.id + '</h2>')
            		res.write('<p>Id: ' + curso.id + '</p>')
            		res.write('<p>Designação: ' + curso.designacao + '</p>')
            		res.write('<p>Duraçao: ' + curso.duracao + '</p>')
            		res.write('<p>Instrumento: <a href="http://localhost:4000/instrumentos/' + curso.instrumento.id + '">' + curso.instrumento.id + '</a></p>')
            		res.write('</ul>')
					res.write('<address>[<a href="/cursos">Voltar</a>]</address>')
            		res.end();

				}).catch(function (error){
					console.log('Erro na obtenção da informação do aluno: ' + error)
					res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
					res.write('<p>Objeto inexistente: ' + req.url + '</p>')
					res.write('<address>[<a href="/cursos">Voltar</a>]</address>')
					res.end()
			})
		}

		else if(req.url.match(/\/instrumentos\/[A-za-z ]+/)){
			axios.get('http://localhost:3000' + req.url)
				.then(resp => {
					instrumento = resp.data

					res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
					res.write('<ul>')
            		res.write('<h2>Instrumento nº' + instrumento.id + '</h2>')
            		res.write('<p>Id: ' + instrumento.id + '</p>')
            		res.write('<p>Designação: ' + instrumento["#text"] + '</p>')
            		res.write('</ul>')
					res.write('<address>[<a href="/instrumentos">Voltar</a>]</address>')
            		res.end();

				}).catch(function (error){
					console.log('Erro na obtenção da informação do aluno: ' + error)
					res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
					res.write('<p>Objeto inexistente: ' + req.url + '</p>')
					res.write('<address>[<a href="/instrumentos">Voltar</a>]</address>')
					res.end()
			})
			
		}

		else {
			res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
			res.write('<p>Pedido não suportado: ' + req.method + " " + req.url + '</p>')
			res.end()
		}
	}

	else {
		res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
		res.write('<p>Pedido não suportado: ' + req.method + " " + req.url + '</p>')
		res.end()
	}

}).listen(4000)

console.log('Servidor à escuta na porta 4000...')