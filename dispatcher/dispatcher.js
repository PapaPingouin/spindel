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




// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
	//console.log( req );
    fs.readFile('../client'+req.url, function(error, content) {
        //res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});
// Chargement de socket.io
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket, pseudo) {
    // Quand on client se connecte, on lui envoie un message
    socket.emit('proto', 'OK');
    
    socket.on('proto', function(request) {
		console.log( "[dispatcher] receive [proto] : "+request);
		if( request == 'test' )
			socket.emit('proto', 'OK');
    });
    
    socket.on('log', function(request) {
		console.log( "[dispatcher] receive [log] : "+request);
		socket.broadcast.emit( 'log', request );
	});
    
    
    socket.on('message', function (message) {
        // On récupère le pseudo de celui qui a cliqué dans les variables de session
        socket.get('pseudo', function (error, pseudo) {
            console.log('[dispatcher] '+pseudo + ' me parle ! Il me dit : ' + message);
        });
    }); 
    
    socket.on('push', function (request) {
        // On récupère le pseudo de celui qui a cliqué dans les variables de session
        //console.log( "push : "+request);
        writeData( request );
        for( e in request )
			console.log( '[dispatcher] push '+e+' : '+request[e] );
    }); 
    
    socket.on('save', function (request) { // save la BDD complete
        // On récupère le pseudo de celui qui a cliqué dans les variables de session
        //console.log( "push : "+request);
        saveBdd( request );
        console.log( "[dispatcher] Save BDD OK" );
    }); 
});
console.log( '[dispatcher] Demarrage serveur web');
server.listen(2910);
console.log( '[dispatcher] OK' );



