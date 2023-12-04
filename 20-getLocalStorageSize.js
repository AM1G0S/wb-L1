function getLocalStorageSize() {
	// Переменная для хранения размера данных
	let totalBytes = 0;
	
	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i);
		const value = localStorage.getItem(key);
		// Т.к. браузер использует UTF-16, то каждый символ весит 2 байта
		totalBytes += (key.length + value.length) * 2;
	}
	
	return totalBytes;
}
