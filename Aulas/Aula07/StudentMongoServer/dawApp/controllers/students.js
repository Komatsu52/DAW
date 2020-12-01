//Student controller

var Student = require('../models/students')

//Return student list
module.exports.list = () => {
	return Student
		.find()
		.sort({nome:1})
		.exec()
}

//Return student list
module.exports.lookup = id => {
	return Student
		.findOne({numero: id})
		.exec()
}

//Return student list
module.exports.insert = student => {
	var aux = new Student(student)
	return aux.save()
}