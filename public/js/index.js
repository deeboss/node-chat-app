var socket = io();
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

	var li = $('<li></li>');
	li.text(`${message.from}: ${message.text}`);

	$('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
	var li = $('<li></li>');
	var a = $('<a target="_blank">My current location</a>');

	li.text(`${message.from}: `);
	a.attr('href', message.url);

	li.append(a);

	$('#messages').append(li);
})

$('#message-form').on('submit', function(e) {
	e.preventDefault();

	socket.emit('createMessage', {
		from: 'User',
		text: $('[name=message]').val()
	}, function() {

	})
})


var locationButton = $('#send-location');

locationButton.on('click', function() {
	if (!navigator.geolocation) {
		return alert("Geolocation not supported!");
	}

	navigator.geolocation.getCurrentPosition(function(position) {

		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});

	}, function() {
		alert("Unable to get location.");
	});

})