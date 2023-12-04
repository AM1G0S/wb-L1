// Функция с использованием async/await
async function executeAsyncFunctions(functions) {
	const result = []

	for (const func of functions) {
		result.push(await func())
	}

	return result
}

// Функция с использованием Promise.all
async function executeAsyncFunctionsPromiseAll(functions) {
	return Promise.all(functions.map(async func => await func()))
}
