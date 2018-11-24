const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));


io.on('connection', (socket) => {
	// socket emit from Admin 
	// "Welcome to the chat app"
	console.log("New user connected");
	socket.emit('newMessage', {
		from: "Admin",
		text: "Welcome to the chat app"
	});

	// socket broadcast to everyone but the user who joined
	// "New user joined"
	socket.broadcast.emit('newMessage', {
		from: "Admin",
		text: "New user joined",
		createdAt: new Date().getTime()
	});

	// An actual event is being emitted from the server.
	// This can be fired from a client side
	socket.on('createMessage', (message) => {
		console.log('createMessage', message);
		io.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		})
	});


	socket.on('disconnect', () => {
		console.log("User has disconnected");
	})
});

server.listen(port, () => {
	console.log(`Listening at ${port}`);
});