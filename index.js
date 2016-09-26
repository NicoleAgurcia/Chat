
'use strict'

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require('express');
var path = require('path');



app.use(express.static(path.join(__dirname, 'public')));


app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


io.on('connection', function(socket){
	console.log('Usuario conectado');

	 socket.on('send message', function(msg) {
	    io.emit('send message', msg);
	    console.log(msg);
	  	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


