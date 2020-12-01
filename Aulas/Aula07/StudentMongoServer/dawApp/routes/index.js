var express = require('express');
var router = express.Router();

var Student = require('../controllers/students')

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('index', { title: 'Turma de DAW 2020' })
})

router.get('/students', function(req, res) {
	//Data retrieve
	Student.list()
		.then(data => res.render('students', { list: data }))
		.catch(err => res.render('error', {error : err}))
})

module.exports = router
