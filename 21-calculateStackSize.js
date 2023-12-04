function calculateStackSize() {
	// Создаем рекурсивную функцию для вызова самой себя
	function recursiveFunction() {
		recursiveFunction();
	}
	
	try {
		recursiveFunction();
	} catch (error) {
		// Ловим ошибку переполнения стека и выводим размер стека в консоль
		console.error(`Размер коллстека: ${error.stack.length} байт`);
	}
}

// Вызываем функцию для расчета размера коллстека
calculateStackSize();

// Размер коллстека во всех основных браузерах (Chrome, Edge, Firefox) составляет около 1МБ
// https://chat.openai.com/share/0cb31d65-74f0-44f9-be6f-c93cf1b89af3
