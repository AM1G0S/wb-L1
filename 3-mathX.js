const MathX = {
	fibonacciNth: function(n) {
		if (n <= 1) return n;
		let a = 0, b = 1;
		for (let i = 2; i <= n; i++) {
			const temp = a + b;
			a = b;
			b = temp;
		}
		return b;
	},
	
	fibonacciSequenceUntilN: function(N) {
		const sequence = [];
		let a = 0, b = 1;
		while (a <= N) {
			sequence.push(a);
			const temp = a + b;
			a = b;
			b = temp;
		}
		return sequence;
	},
	
	isPrime: function(num) {
		if (num < 2) return false;
		for (let i = 2; i <= Math.sqrt(num); i++) {
			if (num % i === 0) {
				return false;
			}
		}
		return true;
	},
	
	nthPrime: function(N) {
		if (N === 1) return 2;
		let count = 1;
		let num = 3;
		while (count < N) {
			if (MathX.isPrime(num)) {
				count++;
			}
			if (count < N) {
				num += 2; // Пропускаем четные числа
			}
		}
		return num;
	},
	
	primesUntilN: function(N) {
		const primes = [];
		for (let i = 2; i <= N; i++) {
			if (MathX.isPrime(i)) {
				primes.push(i);
			}
		}
		return primes;
	}
};

export default MathX;
