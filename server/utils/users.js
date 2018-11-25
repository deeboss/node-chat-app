[{
	id: '#92ur393ujoaj',
	name: 'User1',
	room: 'general'
}];


class Users {
	constructor() {
		this.users = [];
	}

	addUser(id, name, room) {
		let user = {id, name, room};
		this.users.push(user);
		return user;
	}

	removeUser(id) {
		// pass in id of user to be removed
		// filter through users.users array to find matching id
		let user = this.getUser(id);
				
		if (user) {
			this.users = this.users.filter((user) => user.id !== id);
		}

		// return the object of that user
		return user;
	}

	getUser(id) {
		return this.users.filter((user) => user.id === id)[0];
	}

	getUserList(room) {
		let users = this.users.filter((user) => user.room === room);
		let namesArray = users.map((user) => user.name);

		return namesArray;
	}
}

// class Person {
// 	constructor (name, age) {
// 		this.name = name;
// 		this.age = age;
// 	}

// 	getUserDescription() {
// 		return `${this.name} is ${this.age} years old`;
// 	}
// }

// var me = new Person('Don', 26);
// var description = me.getUserDescription();
// console.log(description)



module.exports = {Users};