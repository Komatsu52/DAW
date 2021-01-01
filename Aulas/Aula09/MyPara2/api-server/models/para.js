//Paragraph Model
var mongoose = require('mongoose')

var paraSchema = mongoose.Schema({
	text: String
})

module.exports = mongoose.model('para', paraSchema)

