const { query } = require('express');
var express = require('express');
var repository = require('../database/functions.js');
var router = express.Router();


// criar rota para obter dados do banco
router.get('/', function (req, res, next) {
  var queryParams = req.query;
  var userID = queryParams.userid;

  if (userID) {

    // criar metodo da variavel promise para obter apenas um usuario
    var usersPromise = repository.getOne('users', userID);

    usersPromise
    // Espera para obter os dados da promise
      .then(users => {
        res.send(users);
      })
      // Caso ocorra o erro ao obter promise 
      .catch(error => {
        res.send(`Ocorreu um erro ao tentar obter usuarios: ${error}`);
      });

  } else {
    // criar metodo para obter dados de todos os usuarios
    var usersPromise = repository.getAll('users');

    usersPromise
      .then(users => {
        res.send(users);
      })
      .catch(error => {
        res.send(`Ocorreu um erro ao tentar obter usuarios: ${error}`);
      });
  }

});

// rota para obter dados da opportunities
router.get('/opportunities', function (req, res, next) {
  var queryParams = req.query;
  var userID = queryParams.userid;

  if (userID) {

    var opportunitiesPromise = repository.getOne('opportunities', userID);

    opportunitiesPromise
      .then(opportunities => {
        res.send(opportunities);
      })
      .catch(error => {
        res.send(`Ocorreu um erro ao tentar obter oportunidades do usuario: ${error}`);
      });

  } else {
    // resposta caso nao seja identificado o codigo do usuario
    res.send('Identificador do usuario não informado!');
  }

});

// criar metodo para atualizar os dados da opportunities escolhido pelo cliente
router.put('/opportunities', function (req, res, next) {
  var queryParams = req.query;
  var userID = queryParams.userid;

  if (userID && req) {

    // varial criada para obter opporunities dos clientes atraves do codigo do cliente
    var opportunitiesPromise = repository.update('opportunities', userID, req.body);

    opportunitiesPromise
      .then(opportunities => {
        res.send(opportunities);
      })
      .catch(error => {
        res.send(`Ocorreu um erro ao tentar obter oportunidades do usuario: ${error}`);
      });
      
  } else {
    res.send('Identificador do usuario não informado!');
  }

});

module.exports = router;
