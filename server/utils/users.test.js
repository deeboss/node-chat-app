const expect = require('expect');
const {Users} = require('./users');


describe('Users', () => {
	var users;

	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: 'abc',
			name: 'User 1',
			room: 'Test lobby'
		}, {
			id: 'xyz',
			name: 'User 2',
			room: 'Another test lobby'
		}, {
			id: 'efg',
			name: 'User 3',
			room: 'Test lobby'
		}]
	})

	it('should add new user', () => {
		let users = new Users();
		let user = {
			id: "12351rioja",
			name: "Test user",
			room: "Default Lobby"
		}

		let resUser = users.addUser(user.id, user.name, user.room);
		expect(users.users).toEqual([user]);

	});

	it('should remove a user', () => {
		// take id of seed user
		// pass it through function
		let user = users.removeUser('abc');
		// test it to make sure they were removed
		expect(user.id).toBe('abc');
		expect(users.users.length).toBe(2);
	});

	it('should not remove user', () => {
		// take id of some other id that is not in the seed users list
		// pass it through function
		let user = users.removeUser('invalidID');

		// test to make sure array has not changed
		expect(user).toNotExist();
		expect(users.users.length).toBe(3);
	});

	it('should find user', () => {
		// pass valid id
		let results = users.getUser('abc');
		// get object back
		expect(results.id).toBe('abc');

	});

	it('should not find user', () => {
		// pass invalid id
		let results = users.getUser('invalidID');
		// do not get object back
		expect(results).toNotExist();
	});

	it('should return names for Test Lobby', () => {
		let userList = users.getUserList('Test lobby');

		expect(userList).toEqual(['User 1', 'User 3']);
	});

	it('should return names for Another Test Lobby', () => {
		let userList = users.getUserList('Another test lobby');

		expect(userList).toEqual(['User 2']);
	});
})