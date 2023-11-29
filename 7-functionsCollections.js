// Первый вариант использование рекурсии
const functionsArray = [
	() => { console.log(1); },
	() => { console.log(2); },
	() => { console.log(3); },
	() => { console.log('_____________')}
];

console.log('Первый вариант:')
function callFunctionsSequentially(index) {
	if (index < functionsArray.length) {
		// Вызываем текущую функцию
		functionsArray[index]();
		
		// Рекурсивно вызываем следующую функцию после завершения текущей
		callFunctionsSequentially(index + 1);
	}
}

callFunctionsSequentially(0);

// ---------------------------------------
// Второй вариант использования генератора
console.log('Второй вариант:')
function* generateFunctionCaller(array) {
	for (const func of array) {
		yield func;
	}
}

// Создаем генератор
const functionCaller = generateFunctionCaller(functionsArray);

// Вызываем функции по порядку с использованием генератора
for (const func of functionCaller) {
	func();
}

// ---------------------------------------
//Третий вариант через Foreach
console.log('Третий вариант:')
functionsArray.forEach(func => func());

// ---------------------------------------
//Четвертый вариант через For
console.log('Четвертый вариант:')
for (let i = 0; i < functionsArray.length; i++) {
	functionsArray[i]();
}
