const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');
 
describe('generate message', () => {
	it('should generate the correct message object', () => {
		let from = "Admin";
		let text = "This is a test"
		let results =  generateMessage(from, text);

		expect(results.from).toBe(from);
		expect(results).toInclude({from, text})
	});
});


describe('generate location message', () => {
	it('should generate correct location object', () => {
		// test that from, lat, long are correct
		// created at is a is a number
		// url is a url
		let from = "TestUser";
		let latitude = 12;
		let longitude = 22;
		let url = `https://google.com/maps?q=12,22`
		let results = generateLocationMessage(from, latitude, longitude);

		expect(results.from).toBe(from);
		expect(results).toInclude({from});
		expect(results.createdAt).toBeA('number');
		expect(results.url).toBe(`${url}`);

	})
})