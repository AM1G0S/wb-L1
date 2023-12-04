// Функция с использованием async/await
async function executeAsyncFunctions(functions) {
	const result = []

	for (const func of functions) {
		result.push(await func())
	}

	return result
}

//Второе решение
const getDataFromApi = async (url) => {
	try {
		//делаем запрос
		//здесь я захардкодил url, но можно сделать функцию универсальнее и url добапвить в параметры функции
		const request = await fetch(url);
		if (request.ok){
			//в случае успешного выполнения возвращаем промис и при вызове функции его обрабатываем, в случае ошибки отлавливаем ее с помощью блока catch
			return await request.json();
		}
	} catch (e) {
		console.error(e);
	}
};

getDataFromApi('https://jsonplaceholder.typicode.com/users')
	.then(r => console.log(r))
	.catch(e => console.error(e));
