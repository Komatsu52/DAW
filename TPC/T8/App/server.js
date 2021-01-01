var express = require('express')
var bodyParser = require('body-parser')
var templates = require('./html-templates')
var jsonfile = require('jsonfile')
var logger = require('morgan')
var multer = require('multer')
var fs = require('fs')

var upload = multer({dest: 'uploads/'})

var app = express()

//set logger
app.use(logger('dev'))

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

//parse application/json
app.use(bodyParser.json())

app.use(express.static('public'))

app.get('/', function (req, res){
	var d = new Date().toISOString().substr(0, 16)
	var files = jsonfile.readFileSync('./dbFiles.json')
	res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
	res.write(templates.fileList(files, d))
	res.end
})

app.get('/files/upload', function (req, res){
	var d = new Date().toISOString().substr(0, 16)
	res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
	res.write(templates.fileForm(d))
	res.end
})

app.get('/files/download/:fname', (req, res) => {
	res.download(__dirname + '/public/fileStore/' + req.params.fname)
})

app.post('/files', upload.array('myFile', 12), function(req, res){
	//req.file is the 'myFile' file
	//req.body will hold the text fields if any

	var aux = 0
	
	req.files.forEach(reqFile => {
		let oldPath = __dirname + '/' + reqFile.path
		let newPath = __dirname + '/public/fileStore/' + reqFile.originalname

		fs.rename(oldPath, newPath, function(err){
			if(err)
				throw err
			else{
				var files = jsonfile.readFileSync('./dbFiles.json')
				var d = new Date().toISOString().substr(0, 16)
				files.push(
					{
						date: d,
						name: reqFile.originalname,
						size: reqFile.size,
						mimetype: reqFile.mimetype,
						desc: req.body.desc[aux]
					}
				)
				jsonfile.writeFileSync('./dbFiles.json', files)
				aux = aux + 1
			}
		})
	})

	res.redirect('/')
})

app.listen(7700, () => console.log('Servidor à escuta na porta 7700...'))