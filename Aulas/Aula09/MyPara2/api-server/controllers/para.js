//Paragraph Controller
var mongoose = require('mongoose')
var Paragraph = require('../models/para')

//Returns paragraph list
module.exports.list = function(){
	return Paragraph.find().exec()
}

//Returns a paragraph record
module.exports.lookUp = function(id){
	return Paragraph.findOne({_id: id}).exec()
}

//Inserts a new paragraph
module.exports.insert = function(p){
	console.log(JSON.stringify(p))

	var newParagraph = new Paragraph(p)

	return newParagraph.save()
}

//Removes one paragraph
module.exports.remove = function(id){
	return Paragraph.deleteOne({_id: id})
}

//Edits one paragraph
module.exports.edit = function(id, p){
	//new: true - permite receber o objeto após ser alterado
	//new: false - permite receber o objeto antes de ser alterado
	return Paragraph.findByIdAndUpdate(id, p, {new: true})
}