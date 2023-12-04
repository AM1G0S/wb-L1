function debounce(func, delay) {
	let timerId;
	return function (...args) {
		clearTimeout(timerId);
		timerId = setTimeout(() => {
			func.apply(this, args);
		}, delay);
	};
}

function throttle(func, limit) {
	let inThrottle;
	return function (...args) {
		if (!inThrottle) {
			func.apply(this, args);
			inThrottle = true;
			setTimeout(() => inThrottle = false, limit);
		}
	};
}

document.addEventListener("DOMContentLoaded", function () {
	const addressInput = document.getElementById("addressInput");
	const resultsDropdown = document.getElementById("resultsDropdown");
	
	const geocode = debounce(async function (query) {
		try {
			const response = await ymaps.geocode(query);
			const suggestions = response.geoObjects.toArray().map(obj => obj.getAddressLine());
			updateDropdown(suggestions);
		} catch (error) {
			console.error("Ошибка геокодирования:", error);
		}
	}, 300);
	
	const updateDropdown = (suggestions) => {
		resultsDropdown.innerHTML = "";
		suggestions.forEach((suggestion) => {
			const option = document.createElement("option");
			option.innerHTML = suggestion;
			resultsDropdown.appendChild(option);
		});
	};
	
	const handleInput = throttle(function () {
		const query = addressInput.value.trim();
		if (query.length > 0) {
			geocode(query);
		} else {
			resultsDropdown.innerHTML = "";
		}
	}, 500);
	
	addressInput.addEventListener("input", handleInput);
});
