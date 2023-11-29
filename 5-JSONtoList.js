class LinkedListNode {
	constructor(data) {
		this.data = data;
		this.next = null;
	}
}

function convertJsonToLinkedList(json) {
	// Парсим JSON
	const dataArray = JSON.parse(json);

	// Если JSON не представляет собой массив объектов, возвращаем ошибку
	if (!Array.isArray(dataArray)) {
		throw new Error('Входной JSON должен содержать массив объектов.');
	}

	// Создаем первый узел связного списка
	const headNode = new LinkedListNode(dataArray[0]);

	// Идем по массиву объектов и добавляем их в связный список
	let currentNode = headNode;
	for (let i = 1; i < dataArray.length; i++) {
		const newNode = new LinkedListNode(dataArray[i]);
		currentNode.next = newNode;
		currentNode = newNode;
	}

	return headNode;
}

const jsonInput = '[{"value": 1}, {"value": 2}, {"value": 3}]';
const linkedList = convertJsonToLinkedList(jsonInput);

// Выводим результат в консоль
console.log(linkedList);

































































