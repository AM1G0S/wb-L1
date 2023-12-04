export const isPalindrome = (str) => {
	// Удаляем пробелы и запятые, приводим строку к нижнему регистру
	const cleanedStr = str.replace(/[\s,]/g, '').toLowerCase();
	
	// Сравниваем строку с её обратным значением
	return cleanedStr === cleanedStr.split('').reverse().join('');
}

//второе решение с указателями
export const isPalindrome2 = (str) => {
	//устанавливаем два указателя на начало и конец строки
	let first = 0;
	let last = str.length - 1;
	//приводим к нижнему регистру
	str = str.toLowerCase();
	//проходим циклом до тех пор, пока начальный указатель не сравняется (либо станет больше конечного)
	while (first < last) {
		//если находим пробел увеличиваем начальный указатель, тем самым пропуская его
		if (str[first] === ' ') {
			first++;
			continue;
		}
		//здесь уменьшаем, так же пропуская пробел
		if (str[last] === ' ') {
			last--;
			continue;
		}
		
		if (str[first] !== str[last]) {
			return false;
		}
		
		first++;
		last--;
	}
	return true;
};
