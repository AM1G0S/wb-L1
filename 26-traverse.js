// Рекурсивный обход DOM дерева в глубину
function DFSTraverse(element, action) {
    // Выполняем переданную функцию для текущего элемента
    action(element);

    // Получаем массив дочерних элементов
    const elementChildren = Array.from(element.children);

    // Обходим все дочерние элементы в цикле и для каждого вызываем функцию traverseDOM
    for (let i = 0; i < elementChildren.length; i++) {
        DFSTraverse(elementChildren[i], action);
    }
}

// Обход DOM дерева в ширину с использованием цикла
function BFSTraverse(element, action) {
    // Очередь для хранения DOM - узлов
    const queue = [element];

    // Пока в очереди есть хоть один элемент
    while (queue.length > 0) {
        // Достаем первый в очереди элемент
        const currentElement = queue.shift();

        // Если у этого элемента есть дочерние элементы, то добавляем их в очередь
        if (currentElement.children.length > 0) {
            queue.push(...currentElement.children);
        }

        // Выполняем функцию для текущего элемента
        action(currentElement);
    }
}