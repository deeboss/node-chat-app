// Jan 1st 1970 00:00:00 AM
const moment = require('moment');

// var date = new Date();
// console.log(date.getMonth())


// var date = moment();
// console.log(date.format('MMM Do, YYYY'));



//10:35 AM
//5:21 PM
var someTimestamp = moment().valueOf();
console.log(someTimestamp);
var createdAt = 1234;
var date = moment(createdAt)


console.log(date.format('h:mm a'))