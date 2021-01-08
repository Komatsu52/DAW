//Exemplo: Criar e Descodificar em Token

var jwt = require('jsonwebtoken')
var fs = require('fs')
var privateKey = fs.readFileSync('mykey.pem')

var token = jwt.sign({ username: 'goncalo' }, privateKey, { algorithm: 'RS256' })
console.log('Token: ' + token + '\n\n')

fs.readFile('pubkey.pem', function(e, publicKey){
    jwt.verify(token, publicKey, { algorithms: ['RS256'] }, function(e, decoded){
        if(e)
            console.log('Erro na verificação do token: ' + e)
        else
            console.log('Descodificado: ' + JSON.stringify(decoded))
    })
})