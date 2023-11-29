export const isPalindrome = (str) => {
	// Удаляем пробелы и запятые, приводим строку к нижнему регистру
	const cleanedStr = str.replace(/[\s,]/g, '').toLowerCase();
	
	// Сравниваем строку с её обратным значением
	return cleanedStr === cleanedStr.split('').reverse().join('');
}
