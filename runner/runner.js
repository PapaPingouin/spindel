var portStartNumber = 2908;
var nombreInstances = 3;




var poolInstances = [];

var os = require('os');
var io = require('socket.io');

for( var i=0;i<nombreInstances;i++)
{
	var port = portStartNumber + i;
	var server = io(port, { pingInterval: 2000 });

	server.info = {port : port, i : i };
	
	poolInstances.push( { i:i, port:port, server:server} );
	/*
	server.of('/foo').on('connection', function(){
	  // register namespace
	});

	server.of('/timeout_socket').on('connection', function(){
	  // register namespace
	});

	server.of('/valid').on('connection', function(){
	  // register namespace
	});

	server.of('/asd').on('connection', function(){
	  // register namespace
	});
	*/
	
	server.on('connection', function(socket){
		var selfSocket = socket;
		//console.log( socket );
		console.log( '[ runner '+socket.server.info.port+' ] connection' );
		// simple test
		socket.on('hi', function(request){
			console.log( '[ runner '+selfSocket.server.info.port+' ]',request );	
			socket.emit('hi');
			
		});
		socket.on('getStats', function(request){
			console.log( '[ runner '+selfSocket.server.info.port+' ] stats' );	
			
			socket.emit('stats');
			
		});
	});
	console.log( 'start Instance '+server.info.port+' OK' );
}

//console.log( poolInstances );

/*


var http = require('http');
var fs = require('fs');



Date.prototype.toYMD = function()
{
	var t = new Date( this.getTime()-this.getTimezoneOffset()*60*1000 );
	var iso = t.toISOString().match(/(\d{4}\-\d{2}\-\d{2})T(\d{2}:\d{2}:\d{2})/)
	return(iso[1]);
}
Date.prototype.toHIS = function()
{
	var t = new Date( this.getTime()-this.getTimezoneOffset()*60*1000 );
	var iso = t.toISOString().match(/(\d{4}\-\d{2}\-\d{2})T(\d{2}:\d{2}:\d{2})/)
	return(iso[2]);
}
Date.prototype.toYMDHIS = function()
{
	var t = new Date( this.getTime()-this.getTimezoneOffset()*60*1000 );
	var iso = t.toISOString().match(/(\d{4}\-\d{2}\-\d{2})T(\d{2}:\d{2}:\d{2})/)
	return(iso[1] + ' ' + iso[2]);
}




// note, io(<port>) will create a http server for you
var io = require('socket.io')(2908);

io.on('connection', function (socket) {
	console.log( 'connection' );
	
	//io.emit('this', { will: 'be received by everyone'});

	socket.on('private message', function (from, msg) {
		console.log('I received a private message by ', from, ' saying ', msg);
	});

	socket.on('disconnect', function () {
		io.emit('user disconnected');
	});
});


console.log( '[runner] Demarrage serveur web');

console.log( '[runner] OK' );


*/
