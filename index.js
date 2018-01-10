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

app.get('/login', function(req, res){
  res.sendFile(__dirname + '/login/login.html');
});

app.post('/autenticar', function(req, res){
  usuario = req.body.usuario;
  res.send(usuario);
});

app.get('/', function(req, res){
  console.log(usuario);
  if (usuario != '') {
    res.sendFile(__dirname + '/index.html');
  } else {
    res.redirect('/login');
  }
  
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});