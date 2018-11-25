const expect = require('expect');
const {isRealString} = require('./validation');


//isRealString
	// should reject non-string values
	// should reject string with only spaces
	// should allow strings with non-space characters
describe('isRealString test', () => {
	it('should reject non-string values', () => {
		let results = isRealString(213);

		expect(results).toBe(false);
	});

	it('should reject string with only spaces', () => {
		let results = isRealString('    ');

		expect(results).toBe(false);
	});

	it('should allow strings with non-space characters', () => {
		let results = isRealString('   1value3   ');
		expect(results).toBe(true);
	});

});