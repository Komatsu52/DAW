const axios = require('axios')

axios.post('http://localhost:3001/instrumentos', {
		"id" : "I77",
		"#text": "Kazoo"
	}).then(resp => {
		console.dir(resp)
		console.log(resp.data)
	})
	.catch(error => {
		console.log('Erro ' + error)
	})