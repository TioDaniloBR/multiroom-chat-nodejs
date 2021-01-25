var app = require('./config/server');

var server = app.listen(3213, function(){
    console.log('Servidor online');
});

//criar variavel que sera a instancia do websocket
var io = require('socket.io').listen(server);

//tornar a variável io global
app.set('io', io);

//criar a conexão por websocket
io.on('connection', (socket) => {
    console.log('Usuário Conectou');

    socket.on('disconnect', function(){
        console.log('Usuario disconectou.');
    });

    socket.on('msgParaServidor', (dados) =>{
        //diálogo
        socket.emit('msgParaCliente', {apelido:dados.apelido, mensagem:dados.mensagem});
        socket.broadcast.emit('msgParaCliente', {apelido:dados.apelido, mensagem:dados.mensagem});

        
        //participantes
        if(parseInt(dados.apelido_atualizado_nos_clientes) == 0){
            socket.emit('participanteParaCliente', {apelido:dados.apelido});
            socket.broadcast.emit('participanteParaCliente', {apelido:dados.apelido});
        }
        

    });
});