var express = require('express')
var router = express.Router()
var Paragraph = require('../controllers/para')

//List all paragraphs
router.get('/paragraphs', function(req, res) {
	Paragraph.list()
		.then(data => res.status(200).jsonp(data))
		.catch(err => res.status(500).jsonp(err))
})

//Gets one paragraph
router.get('/paragraphs/:id', function(req, res) {
	Paragraph.lookUp(req.params.id)
		.then(data => res.status(200).jsonp(data))
		.catch(err => res.status(500).jsonp(err))
})

//Insert new paragraph
router.post('/paragraphs', function(req, res) {
	Paragraph.insert(req.body)
		.then(data => res.status(201).jsonp(data))
		.catch(err => res.status(500).jsonp(err))
})

//Delete one paragraph
router.delete('/paragraphs/:id', function(req, res) {
	Paragraph.remove(req.params.id)
		.then(data => res.status(200).jsonp(data))
		.catch(err => res.status(500).jsonp(err))
})

//Edit one paragraph
router.put('/paragraphs/:id', function(req, res) {
	Paragraph.edit(req.params.id, req.body)
		.then(data => res.status(200).jsonp(data))
		.catch(err => res.status(500).jsonp(err))
})

module.exports = router