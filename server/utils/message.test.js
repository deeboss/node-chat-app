const expect = require('expect');
const {generateMessage} = require('./message');
 
describe('generate message', () => {
	it('should generate the correct message object', () => {
		let from = "Admin";
		let text = "This is a test"
		let results =  generateMessage(from, text);

		expect(results.from).toBe(from);
		expect(results).toInclude({from, text})
	});
});