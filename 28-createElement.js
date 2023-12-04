function createElement(parent, html) {
    // Создаем шаблон элемента
    const template = document.createElement('template');

    template.innerHTML = html || `
        <div>
            Test
        </div>
    `;

    // Клонируем содержимое шаблона
    const clone = template.content.cloneNode(true);

    // Вставляем склонированный элемент в DOM
    parent.append(clone);
}