const functionsArray = [
	() => {
		return 1;
	},
	() => {
		return 2;
	},
	() => {
		return 3;
	},
];

const func = (array) => {
	let data = [];
	
	function callFunctionsSequentially(index = 0) {
		if (index < array.length) {
			
			data.push(array[index]());
			
			callFunctionsSequentially(index + 1);
		}
		
		return data
	}
	
	return callFunctionsSequentially
}

console.log(func(functionsArray)());

//Второе решение
const closures = (array) => {
	return () => {
		return array.map(fn => fn())
	}
};
