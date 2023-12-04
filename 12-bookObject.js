class Book {
	constructor(title, author, year) {
		this.title = title;
		this.author = author;
		this.year = year;
	}
	
	getTitle() {
		return this.title;
	}
	
	getAuthor() {
		return this.author;
	}
	
	getYear() {
		return this.year;
	}
	
	setTitle(newTitle) {
		this.title = newTitle;
	}
	
	setAuthor(newAuthor) {
		this.author = newAuthor;
	}
	
	setYear(newYear) {
		this.year = newYear;
	}
}

const myBook = new Book("Гарри Поттер", "Джоан Роулинг", 1997);

console.log("Название книги:", myBook.getTitle());
console.log("Автор книги:", myBook.getAuthor());
console.log("Год издания книги:", myBook.getYear());

// Изменяем значения свойств
myBook.setTitle("50 оттенков серо... счастья");
myBook.setAuthor("Габриэль Гарсиа Маркес");
myBook.setYear(2010);

console.log("\nИзмененные значения:");
console.log("Название книги:", myBook.getTitle());
console.log("Автор книги:", myBook.getAuthor());
console.log("Год издания книги:", myBook.getYear());
