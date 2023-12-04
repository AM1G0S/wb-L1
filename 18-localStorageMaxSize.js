function getMaxLocalStorageSize() {
	// Пробуем записать максимальное количество данных в localStorage
	try {
		for (let i = 0; i < 1000000; i++) {
			const key = `test-key${i}`;
			// Создаем строку с длиной в 1000 символов
			const value = 'x'.repeat(1000);
			localStorage.setItem(key, value);
		}
	} catch (error) {
	
	}
	
	// Подсчитываем объем данных, который удалось записать
	let totalBytes = 0;
	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i);
		const value = localStorage.getItem(key);
		// Т.к. браузер использует UTF-16, то каждый символ весит 2 байта
		totalBytes += (key.length + value.length) * 2;
	}
	
	// Удаляем все тестовые данные из localStorage
	for (let i = localStorage.length - 1; i >= 0; i--) {
		const key = localStorage.key(i);
		if (key.includes('test-key')) {
			localStorage.removeItem(key);
		}
	}
	
	return totalBytes;
}
