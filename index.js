
'use strict'



var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require('express');
var path = require('path');
var  socket = require('./routes/socket.js');



app.use(express.static(path.join(__dirname, 'public')));


app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


/*io.on('connection', function(socket){
	console.log('Usuario conectado');

	 socket.on('send message', function(msg) {
	    io.emit('send message', msg);
	    console.log(msg);
	  	});
});*/
io.sockets.on('connection', socket);

/*
http.listen(3000, function(){
  console.log('listening on *:3000');
});


*/
app.set('port', (process.env.PORT || 3000));
http.listen(app.get('port'), function() {
	console.log('listening on port: ' + app.get('port'));
});

