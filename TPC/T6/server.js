var http = require('http')
var axios = require('axios')
var fs = require('fs')
var static = require('./static')
var { parse } = require('querystring')
const { fileURLToPath } = require('url')


// Funções auxilidares
function recuperaInfo(request, callback) {
    if (request.headers['content-type'] == 'application/x-www-form-urlencoded') {
        let body = ''
        request.on('data', bloco => {
            body += bloco.toString()
        })
        request.on('end', () => {
            console.log(body)
            callback(parse(body))
        })
    }
}

// Template para a página com to do List ------------------
function listaTarefas(lista) {
    let pagHTML =
`       <div class="w3-container w3-teal">
            <h2>Lista de Tarefas</h2>
        </div>
        <table class="w3-table w3-bordered">
            <tr>
                <th>Início</th>
                <th>Fim</th>
                <th>Responsável</th>
                <th>Descrição</th>
                <th>Estado</th>
                <th></th>
                <th></th>
            </tr>
`
    lista.forEach(a => {
        switch (a.estado) {
            case "0":
                pagHTML +=
`           <tr>
                <td>${a.dinicio}</td>
                <td>${a.dfim}</td>
                <td>${a.responsavel}</td>
                <td>${a.descricao}</td>
                <td>Não Feito</td>
                <td><a href="/feito/${a.id}"class="w3-btn w3-green">Feito</a></td>
                <td><a href="/apagar/${a.id}" class="w3-btn w3-black">Apagar</a></td>
            </tr>
`
                break

            case "1":
                pagHTML +=
`           <tr>
                <td>${a.dinicio}</td>
                <td>${a.dfim}</td>
                <td>${a.responsavel}</td>
                <td>${a.descricao}</td>
                <td>Feito</td>
                <td><a href="/naofeito/${a.id}"class="w3-btn w3-red">Não Feito</a></td>
                <td><a href="/apagar/${a.id}" class="w3-btn w3-black">Apagar</a></td>
            </tr>
`
                break

            default:
            	break
        }
    });

    pagHTML += `</table>`

    return pagHTML
}

// Template para o formulário de aluno ------------------
function formulario() {
    return `
        <div class="w3-container w3-teal">
            <h5>Nova Tarefa</h5>
        </div>
        <form class="w3-container" action="/adicionar" method="POST">
            <label class="w3-text-teal"><b>Início</b></label>
            <input class="w3-input w3-border w3-light-grey" type="text" name="dinicio" placeholder="aaaa/mm/dd">

            <label class="w3-text-teal"><b>Fim</b></label>
            <input class="w3-input w3-border w3-light-grey" type="text" name="dfim" placeholder="aaaa/mm/dd">
          
            <label class="w3-text-teal"><b>Responsável</b></label>
            <input class="w3-input w3-border w3-light-grey" type="text" name="responsavel">

            <label class="w3-text-teal"><b>Descrição</b></label>
            <input class="w3-input w3-border w3-light-grey" type="text" name="descricao">

            <label class="w3-text-teal"><b>Responsavel</b></label>
            <select class="w3-select w3-border w3-light-grey" name="estado">
                <option value="0">Não Feito</option>
                <option value="1">Feito</option>
            </select>
          
            <input class="w3-btn w3-blue-grey" type="submit" value="Registar"/>
            <input class="w3-btn w3-blue-grey" type="reset" value="Limpar valores"/> 
        </form>
    `
}

function cabecalho() {
    return `
    <html>
        <head>
            <title>Lista de Tarefas</title>
            <meta charset="utf-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
        </head>
        <body>
    `
}

function paginaTotal(res) {
    axios.get('http://localhost:3000/tarefas?_sort=estado')
        .then( tar => {
            tarefas = tar.data

            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8', Location: 'http://localhost:7777/' })
            res.write(cabecalho())
            res.write(formulario())
            res.write(listaTarefas(tarefas))
            res.write('</body></html>')
            res.end()
        })
        .catch((err) => {
            res.writeHead(203, { 'Content-Type': 'text/html;charset=utf-8', Location: 'http://localhost:7777/' })
            console.log('Erro a carregar a página: ', err)
            res.end()
        })
}

function feito(res, a) {
    axios.get('http://localhost:3000/tarefas/' + a)
        .then(resp => {
            tarefas = resp.data
            tarefas.estado = "1"

            axios.put(`http://localhost:3000/tarefas/${tarefas.id}`, tarefas)
                .then( function() {
                    console.log('Feito ' + tarefas.id)
                    paginaTotal(res)
                })
                .catch(error => {
                    console.log('Erro no put do feito ' + error)
                    paginaTotal(res)
                })
        })
        .catch(error => {
            console.log('Error no get do feito ' + error)
            paginaTotal(res)
        })
}

function apagar(res, a) {
    axios.get('http://localhost:3000/tarefas/' + a)
        .then(resp => {
            tarefas = resp.data
            tarefas.estado = "2"

            axios.put(`http://localhost:3000/tarefas/${tarefas.id}`, tarefas)
                .then(function() {
                    console.log('Apagado ' + tarefas.id)
                    paginaTotal(res)
                })
                .catch(error => {
                    console.log('Erro no put do apagado ' + error)
                    paginaTotal(res)
                })
        })
        .catch(error => {
            console.log('Error no get do apagado ' + error)
            paginaTotal(res)
        })
}

function naofeito(res, a) {
    axios.get('http://localhost:3000/tarefas/' + a)
        .then(resp => {
            tarefas = resp.data
            tarefas.estado = "0"

            axios.put(`http://localhost:3000/tarefas/${tarefas.id}`, tarefas)
                .then(function() {
                    console.log('Nao Feito ' + tarefas.id)
                    paginaTotal(res)
                })
                .catch(error => {
                    console.log('Erro no put do nao feito ' + error)
                    paginaTotal(res)
                })
        })
        .catch(error => {
            console.log('Error no get do nao feito ' + error)
            paginaTotal(res)
        })
}

// Criação do servidor
var toDoListServer = http.createServer(function (req, res) {

    // Logger: que pedido chegou e quando
    var d = new Date().toISOString().substr(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Request processing
    // Tests if a static resource is requested
    if (static.recursoEstatico(req)) {
        static.sirvoRecursoEstatico(req, res)
    }

    else {
        // Tratamento do pedido
        var listaUrl = req.url.split("/")
        listaUrl.shift()
        console.log(listaUrl)

        switch (req.method) {
            case "GET":
                switch (listaUrl[0]) {
                    case '':
                        paginaTotal(res)
                        break

                    case 'feito':
                        feito(res, listaUrl[1])
                        break

                    case 'apagar':
                        apagar(res, listaUrl[1])
                        break

                    case 'naofeito':
                        naofeito(res, listaUrl[1])
                        break

                    default:
                        res.writeHead(203, { 'Content-Type': 'text/html;charset=utf-8' })
                        res.write("<p>" + req.method + " " + req.url + " não suportado neste serviço.</p>")
                        res.end()
                        break
                }
                break

            case "POST":
                if (req.url == "/" || req.url == "/adicionar") {
                    recuperaInfo(req, info => {
                        console.log('Post :' + JSON.stringify(info))

                        axios.post('http://localhost:3000/tarefas', info)
                            .then(function() {
                                paginaTotal(res)
                            })
                            .catch(erro => {
                                console.log('erro POST' + erro)
                                paginaTotal(res)
                            })
                    })
                }

                else {
                    paginaTotal(res)
                }

                break

            default:
                paginaTotal(res)
        }
    }
})

toDoListServer.listen(7777)
console.log('Servidor à escuta na porta 7777...')