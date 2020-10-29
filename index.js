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
		var date = new Date();
		var h = date.getHours(); // 0 - 23
		var m = date.getMinutes(); // 0 - 59
		var s = date.getSeconds(); // 0 - 59
		var session = "AM";
		if(h == 0){
			h = 12;
		}
		if(h > 12){
			h = h - 12;
			session = "PM";
		}
		h = (h < 10) ? "0" + h : h;
		m = (m < 10) ? "0" + m : m;
		s = (s < 10) ? "0" + s : s;
		var time = h + ":" + m + ":" + s + " " + session;
        io.emit('broadcast',{ description: clients + ' online.'});
        console.log('Client connect! ' + clients + ' online. @' + String(time));
        client.on('disconnect', function () {
                clients--;
				var date = new Date();
				var h = date.getHours();
				var m = date.getMinutes();
				var s = date.getSeconds();
				var session = "AM";
				if(h == 0){
					h = 12;
				}
				if(h > 12){
					h = h - 12;
					session = "PM";
				}
				h = (h < 10) ? "0" + h : h;
				m = (m < 10) ? "0" + m : m;
				s = (s < 10) ? "0" + s : s;
				var time = h + ":" + m + ":" + s + " " + session;
                io.emit('broadcast',{ description: clients + ' clients connected!'});
                console.log('Client disconnect! ' + clients + ' online! @' + String(time));
        });
});
