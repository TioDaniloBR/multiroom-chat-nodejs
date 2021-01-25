//importar o modulo do framework express
var express = require('express');
//importar o modulo do consign(que faz o autoload)
var consign = require('consign');
//importar o modulo do body-parser que passa as requisições pra dentro do body
var bodyParser = require('body-parser');
//importar o modulo do express validator que faz as validações do que for digitado no form
var validatorExpress = require('express-validator');
const { urlencoded } = require('body-parser');

//iniciar o express
var app = express();

//configurar o ejs como engine de views
//setar as variaveis 'view engine' e 'view'
app.set('view engine', 'ejs');
app.set('views', './app/views');

//configurar o middleware express.static
app.use(express.static('./app/public'));

//configurar o middleware body-parser
app.use(bodyParser.urlencoded({extended:true}));

//configurar o middleware express-validator
app.use(validatorExpress());

//configurar o consign para fazer o autoload das rotas, modulos e controllers para o objeto app
consign()
    .include('./app/routes')
    .then('./app/models')
    .then('./app/controllers')
    .into(app)

//exportar o objeto app
module.exports = app;