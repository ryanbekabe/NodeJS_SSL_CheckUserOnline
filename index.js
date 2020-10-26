// Setup basic express server
var fs = require('fs')
var express = require('express');
var app = express();
var path = require('path');
var options = {
  key: fs.readFileSync('/etc/letsencrypt/live/elearning.mankotapalangkaraya.my.id/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/elearning.mankotapalangkaraya.my.id/fullchain.pem')
};
var server = require('https').createServer(options, app);
var io = require('socket.io')(server);
var port = process.env.PORT || 4433;
server.listen(port, () => {
  console.log('Server listening at port %d', port);
});
app.use(express.static(path.join(__dirname, 'public')));
var clients = 0;
io.on('connection', function (client) {
	clients++;
	io.emit('broadcast',{ description: clients + ' online.'});
	client.on('disconnect', function () {
		clients--;
		io.emit('broadcast',{ description: clients + ' clients connected!'});
		console.log('Client disconnect! ' + clients + ' online!');
	});
});
