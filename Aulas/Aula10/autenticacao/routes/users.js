var express = require('express');
var router = express.Router();
var passport = require('passport')

/* Login page */
router.get('/login', function(req, res) {
	console.log('Na cb do GET login...')
	console.log(req.sessionID)
	res.render('login-form')
});

router.get('/logout', function(req, res) {
	req.logout()
	res.redirect("/")
});

router.post('/login', passport.authenticate('local'), function(req, res) {
	console.log('Do passport: ' + JSON.stringify(req.user))
	res.redirect('/protegida')
});

module.exports = router;
