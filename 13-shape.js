class Shape {
	constructor() {
		// По умолчанию у фигуры нет конкретных свойств
	}
	
	// Метод для расчета площади (возвращаем 0, так как у абстрактной фигуры нет конкретной площади)
	calculateArea() {
		return 0;
	}
	
	// Метод для расчета периметра (возвращаем 0, так как у абстрактной фигуры нет конкретного периметра)
	calculatePerimeter() {
		return 0;
	}
}

class Rectangle extends Shape {
	constructor(width, height) {
		super();
		this.width = width;
		this.height = height;
	}
	
	// Переопределение методов для расчета площади и периметра прямоугольника
	calculateArea() {
		return this.width * this.height;
	}
	
	calculatePerimeter() {
		return 2 * (this.width + this.height);
	}
}

class Circle extends Shape {
	constructor(radius) {
		super();
		this.radius = radius;
	}
	
	// Переопределение методов для расчета площади и периметра круга
	calculateArea() {
		return Math.PI * this.radius ** 2;
	}
	
	calculatePerimeter() {
		return 2 * Math.PI * this.radius;
	}
}

class Triangle extends Shape {
	constructor(side1, side2, side3) {
		super();
		this.side1 = side1;
		this.side2 = side2;
		this.side3 = side3;
	}
	
	// Переопределение методов для расчета площади и периметра треугольника
	calculateArea() {
		// Используем формулу Герона для нахождения площади треугольника по длинам сторон
		const s = (this.side1 + this.side2 + this.side3) / 2;
		return Math.sqrt(s * (s - this.side1) * (s - this.side2) * (s - this.side3));
	}
	
	calculatePerimeter() {
		return this.side1 + this.side2 + this.side3;
	}
}

// Пример использования классов
const rectangle = new Rectangle(5, 10);
const circle = new Circle(7);
const triangle = new Triangle(3, 4, 5);

console.log("Прямоугольник:");
console.log("Площадь:", rectangle.calculateArea());
console.log("Периметр:", rectangle.calculatePerimeter());

console.log("\nКруг:");
console.log("Площадь:", circle.calculateArea());
console.log("Периметр:", circle.calculatePerimeter());

console.log("\nТреугольник:");
console.log("Площадь:", triangle.calculateArea());
console.log("Периметр:", triangle.calculatePerimeter());
