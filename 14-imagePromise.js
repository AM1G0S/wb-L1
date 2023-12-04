function loadImage(url) {
	return new Promise((resolve, reject) => {
		const image = new Image();
		
		image.onload = () => {
			resolve({
				width: image.width,
				height: image.height,
				src: url,
			});
		};
		
		image.onerror = () => {
			reject(new Error(`Не удалось загрузить изображение по адресу: ${url}`));
		};
		
		image.src = url;
	});
}

// Пример использования
const imageUrl = 'https://galeev-denis.netlify.app/img/puzik.webp';

loadImage(imageUrl)
	.then((imageData) => {
		console.log('Изображение успешно загружено:', imageData);
	})
	.catch((error) => {
		console.error('Ошибка загрузки изображения:', error.message);
	});
