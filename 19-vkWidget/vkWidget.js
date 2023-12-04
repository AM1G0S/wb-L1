// Константы
const ACCESS_TOKEN = ''
const GROUP_ID = '34788285'
const MAX_CACHED_POSTS = 100
const POSTS_COUNT = 5

// Элементы DOM
const widget = document.getElementById("widget")
const postList = document.getElementById("postList")

// Переменные состояния
let offset = 0
let cache = []
let isFetching = false
const maxLocalStorageSize = getMaxLocalStorageSize()

// Обработчик ответа от сервера VK
function handleResponse(result) {
	isFetching = false
	
	if (result.error) {
		console.error(result.error.error_msg)
		return
	}
	
	// Получаем новые посты, сразу сохраняем их в кеш и увеличиваем пременную offset
	// для получения следующей группы постов в следующем запросе
	const newPosts = result.response.items
	cache = cache.concat(newPosts)
	offset += POSTS_COUNT
	
	// Удаление старых постов, если превышен лимит кэша
	if (cache.length > MAX_CACHED_POSTS) {
		const postsToRemove = cache.length - MAX_CACHED_POSTS
		cache.splice(0, postsToRemove)
	}
	
	displayPosts(newPosts)
	
	// Обновление кэшированных данных
	localStorage.setItem("cachedPosts", JSON.stringify(cache))
	localStorage.setItem("cachedOffset", offset)
	
	console.log(`${getLocalStorageSize()} / ${maxLocalStorageSize}`)
}

// Загрузка постов
function fetchPosts() {
	// Проверка наличия кэшированных данных
	const cachedPosts = localStorage.getItem('cachedPosts')
	const cachedOffset = +localStorage.getItem('cachedOffset')
	// Если в кеше найдены сохраненные посты и при этом значение текущего offset
	// отличается от offset, сохраненного в кеше
	if (cachedPosts && cachedOffset !== offset) {
		// Устанавливаем текущий offset равным cachedOffset, благодаря чему
		// будут грузиться актуальные посты, а не те, что уже были загружены
		offset = cachedOffset
		cache = JSON.parse(cachedPosts)
		displayPosts(cache)
		return
	}
	
	// Запрос на получение новых постов
	makeJSONPRequest(handleResponse)
}

// Отображение постов
function displayPosts(posts) {
	posts.forEach(post => {
		// Достаем первое изображение из поста или используем плейсхолдер, если его нет
		const imageURL = post.attachments[0]?.photo?.sizes[0].url || 'https://www.alquicatering.net/uploads/0jHh8F2Q/nohay.jpg'
		const postItem = document.createElement("li")
		postItem.insertAdjacentHTML('afterbegin', `
            <div class="image-wrapper"><img src="${imageURL}" alt="Изображение поста" /></div>
            <p>${post.text}</p>
        `)
		postList.appendChild(postItem)
	})
}

// Обработчик события прокрутки
widget.addEventListener("scroll", debounce(() => {
	const isScrolledToBottom = widget.scrollTop + widget.clientHeight + 10 >= widget.scrollHeight
	// Если сейчас не идет загрузка и если лента прокручена в самый низ, подгружаем новые посты
	if (!isFetching && isScrolledToBottom) {
		fetchPosts()
	}
}, 200))

// Декоратор debounce для задержки
function debounce(func, delay) {
	let timerID = null
	return (...args) => {
		clearTimeout(timerID)
		timerID = setTimeout(() => {
			return func(...args)
		}, delay)
	}
}

// Начальная загрузка постов
fetchPosts()

// Функция создания JSONP-запроса для выполнения кроссдоменных запросов
function makeJSONPRequest(callback) {
	isFetching = true
	const script = document.createElement('SCRIPT')
	script.src = `https://api.vk.com/method/wall.get?owner_id=-${GROUP_ID}&count=${POSTS_COUNT}&offset=${offset}&access_token=${ACCESS_TOKEN}&v=5.131&callback=${callback.name}`
	document.head.append(script)
}
