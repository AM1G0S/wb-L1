export const isStrangeNumber = (number) => {
	// Функция для вычисления суммы делителей числа
	function sumOfDivisors(n) {
		let sum = 0;
		for (let i = 1; i <= n / 2; i++) {
			if (n % i === 0) {
				sum += i;
			}
		}
		return sum;
	}
	
	// Вычисляем сумму делителей числа
	const divisorsSum = sumOfDivisors(number);
	
	// Проверяем, является ли число странным
	return divisorsSum === number;
}
