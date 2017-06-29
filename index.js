const app = require('express')();
const express = require('express')
const http = require('http').Server(app);
const io = require('socket.io')(http);
function callSockets(io, message){
    io.sockets.emit('chat message', message);
}

app.get('/chart', function(req, res){
  res.sendFile(__dirname + '/d3js.html');
});
app.get('/bar', function(req, res){
  res.sendFile(__dirname + '/bar.html');
});
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.get('/bar2', function(req, res){
  res.sendFile(__dirname + '/new.html');
});



io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});
app.use(express.static('public'))
http.listen(3000, function(){
  console.log('listening on *:3000');
});
const kafka = require('kafka-node'),
    HighLevelConsumer = kafka.HighLevelConsumer,
    client = new kafka.Client(),
    consumer = new HighLevelConsumer(
        client,
        [
            { topic: 'test' }
        ]
    );
consumer.on('message', function (message) {
    callSockets(io,message)
    console.log(message);

});
