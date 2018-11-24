let socket = io();
socket.on('connect', function(){
	console.log("Connected to server");
	// socket.emit('createMessage', {
	// 	from: "BurritoCat",
	// 	text: "Yeah. See you at the usual spot."
	// });
});

socket.on('disconnect', function(){
	console.log("Disconnected from server");
});

socket.on('newMessage', function(message){
	console.log("New incoming message", message);
});