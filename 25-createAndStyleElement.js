function createAndStyleElement(tagName, styles) {
    // Создаем новый элемент заданного тега
    const element = document.createElement(tagName);
  
    // Применяем стили к элементу
    for (const property in styles) {
        element.style[property] = styles[property];
    }
  
    // Добавляем элемент в DOM
    document.body.append(element);
}

// Пример вызова функции с заданными стилями
const elementStyles = {
  width: "200px",
  height: "200px",
  backgroundColor: "blue",
  color: "white",
  textAlign: "center",
  fontSize: "16px",
  borderRadius: '50%',
};

createAndStyleElement("div", elementStyles);
  