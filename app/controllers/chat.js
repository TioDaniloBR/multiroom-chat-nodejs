const { emit } = require("../../config/server");

module.exports.iniciaChat = (application, req, res)=>{

    var dadosForm = req.body;
    

    req.assert('apelido', 'É obrigatório digitar um apelido.').notEmpty();
    req.assert('apelido', 'Apelido deve conter entre 3 e 15 caracteres.').len(3,15);

    var erros = req.validationErrors();

    if(erros){
        res.render('index',{validacao:erros});
        return;
    }

    application.get('io').emit('msgParaCliente',{apelido:dadosForm.apelido, mensagem:' entrou no chat.'});
    res.render('chat', {dadosForm:dadosForm});
}