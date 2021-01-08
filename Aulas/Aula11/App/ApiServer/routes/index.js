var express = require('express');
var router = express.Router();

function verificaAutorizacao(req, res, next){
    if(req.user.level == "admin")
        next()
    else
        res.status(401).jsonp({ error: "Não tem nível de autorização para aceder a esta rota." })
}

router.get('/infoSecreta', verificaAutorizacao, function(req, res, next) {
    res.status(200).jsonp({ dados: ["Cenoura", "Tomate", "Cebola"] })
});

router.get('*', function(req, res, next) {
    res.status(200).jsonp({ dados: "Lista de qualquer coisa..." })
});

module.exports = router;
