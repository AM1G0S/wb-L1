const parentFunc = () => {
	let count = 5000;
	
	return () => {
		console.log(count);
	}
}

const childFunc = parentFunc();

childFunc();

//Второе решение
const sum = (a) => {
	//у внутренней функции тоже есть доступ к переменной определенной во внешней функции внешней и при вызовы внешней функции она не удалится
	return (b) => {
		return a + b;
	}
};
