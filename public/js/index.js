let socket = io();
socket.on('connect', function(){
	console.log("Connected to server");

	// socket.emit('createMessage', {
	// 	from: "BurritoCat",
	// 	text: "Blank"
	// });
});

socket.on('disconnect', function(){
	console.log("Disconnected from server");
});


// Fires when there is a new message that is being emitted from the server
socket.on('newMessage', function(message){
	console.log("New incoming message", message);
});