const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message.js');
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
	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

	// socket broadcast to everyone but the user who joined
	// "New user joined"
	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

	// An actual event is being emitted from the server.
	// This can be fired from a client side
	socket.on('createMessage', (message, callback) => {
		console.log('createMessage', message);
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback();
	});

	socket.on('createLocationMessage', (coords) => {
		io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
	})

	socket.on('disconnect', () => {
		console.log("User has disconnected");
	})
});

server.listen(port, () => {
	console.log(`Listening at ${port}`);
});