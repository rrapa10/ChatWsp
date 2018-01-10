var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var usuario = '';

app.use(express.static('assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.post('/autenticar', function(req, res){
  usuario = req.body.usuario;
  res.send(usuario);
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  var addedUser = false;
  console.log('a user connected');
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
  socket.on('add user', function (username) {
    console.log(username);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});

