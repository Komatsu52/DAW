var axios = require('axios')

axios.post('http://localhost:7701/users', { "username": "goncalo", "passwd": "123"})
    .then(dados => {
        var token = dados.data.token
        console.log('Token ' + token + '\n\n')

        axios.get('http://localhost:7700/infoSecreta?token=' + token)
            .then(dados2 => {
                console.log('Dados: ' + JSON.stringify(dados2.data))
            })
            .catch(e => {
                console.log('Erro: não consegui obter a informação da área secreta!')
            })
    })
    .catch(e => {
        console.log('Erro: não consegui obter o token!')
    })