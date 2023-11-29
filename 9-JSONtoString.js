function JSONtoString(data) {
	if (typeof data !== 'object' || data === null) {
		if (typeof data === 'string') {
			return `"${data}"`;
		} else {
			return String(data);
		}
	}

	if (Array.isArray(data)) {
		const arrayValues = data.map(JSONtoString);
		return `[${arrayValues.join(',')}]`;
	} else {
		const objectEntries = Object.entries(data).map(([key, value]) => `"${key}":${JSONtoString(value)}`);
		return `{${objectEntries.join(',')}}`;
	}
}

const array = {
	name: 'Chups',
	age: 2,
	isAdult: true,
	isMarried: false,
	city: 'Petrovsk',
	data: new Date(),
};

console.log(JSONtoString(array));
