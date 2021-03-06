const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

app.use(express.static(publicPath));


io.on('connection', (socket) => {
	// socket emit from Admin 
	// "Welcome to the chat app"
	console.log("New user connected");


	socket.on('join', (params, callback) => {
		if (!isRealString(params.name) || !isRealString(params.room)) {
			return callback('Name and room name are required');
		}

		socket.join(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);

		io.to(params.room).emit('updateUserList', users.getUserList(params.room));

		//socket.leave(params.room);

		// io.emit -> io.to('Room Name').emit;
		// socket.broadcast.emit -> socket.to('Room Name').broadcast.emit
		// socket.emit -> socket.to('Room Name').emit

		socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
		// socket broadcast to everyone but the user who joined
		// "New user joined"
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has just joined the room`));

		callback();
	});

	// An actual event is being emitted from the server.
	// This can be fired from a client side
	socket.on('createMessage', (message, callback) => {
		let user = users.getUser(socket.id);

		if (user && isRealString(message.text)) {
			io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
		}
		callback();
	});

	socket.on('createLocationMessage', (coords) => {
		let user = users.getUser(socket.id);

		if (user) {
			io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
		}
	})

	socket.on('disconnect', () => {
		let user = users.removeUser(socket.id);

		if (user) {
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
			io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
		}
	})
});

server.listen(port, () => {
	console.log(`Listening at ${port}`);
});