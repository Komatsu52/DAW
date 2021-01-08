var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')

var users = [
  { username: 'goncalo', level: 'admin', passwd: "123" },
  { username: 'asdrubal', level: 'editor', passwd: "456" }
]

/* GET users listing. */
router.post('/', function(req, res) {
  if(req.body.username){
    var u = users.find(element => element.username == req.body.username)

    if(u && u.passwd == req.body.passwd){

      jwt.sign({ username: u.username, level: u.level }, 'DAW2020', function(e, t){
        if(e)
          res.status(500).jsonp({error: e})
        else{
          res.status(201).jsonp({ token: t })
        }
      })
    }
    else{
      res.status(401).jsonp({error: "Utilizador inexistente ou password incorreta!"})
    }
  }
});

module.exports = router;
