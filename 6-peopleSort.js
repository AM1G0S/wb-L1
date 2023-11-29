const people = [
	{ name: 'John', age: 25 },
	{ name: 'Anna', age: 25 },
	{ name: 'Peder', age: 25 },
];

people.sort((a, b) => {
	// Сначала сравниваем возраст
	if (a.age !== b.age) {
		return a.age - b.age;
	}
	
	// Если возрасты равны, сравниваем имена по алфавиту
	return a.name.localeCompare(b.name);
});

console.log(people);
