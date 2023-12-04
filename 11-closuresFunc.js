const parentFunc = () => {
	let count = 5000;
	
	return () => {
		console.log(count);
	}
}

const childFunc = parentFunc();

childFunc();
