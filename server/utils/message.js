const moment = require('moment');

// var someTimestamp = moment().valueOf();
// console.log(someTimestamp);
// var createdAt = 1234;
// var date = moment(createdAt)

let generateMessage = (from, text) => {
	return {
		from,
		text,
		createdAt: moment().valueOf()
	}
}

let generateLocationMessage = (from, latitude, longitude) => {
	return {
		from,
		url: `https://google.com/maps?q=${latitude},${longitude}`,
		createdAt: moment().valueOf()
	}
}

module.exports = {generateMessage, generateLocationMessage};