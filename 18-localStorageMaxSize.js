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

// Второй вариант
//функция принимает параметром формат ('mb') вернет значение в мегабайтах, остальнеы вернут в килобайтах

const getLocalStorageSize = (format = 'kb') => {
	//проверяем есть ли ключ в хранилище и если нет проводим расчет
	if (!localStorage.getItem('size')) {
		let size = 0;
		//проверяю на 10 мегабайт
		let mb = 10;
		try {
			//заполняем храналище до тех пор пока не будет выдано исключение
			for (size = 0; size <= mb; size += 1) {
				//заполняем строкой, так как хранилище принимает только строковые данные
				localStorage.setItem('test', '0'.repeat(size * 1024 * 1024));
			}
		} catch (e) {
			//если исключение выдано, значит хранилище заполнено и мы можем возвращать результат
			localStorage.removeItem('test');
			return format === 'mb' ? size : size * 1024 * 1024;
		}
	}
};

getLocalStorageSize()
