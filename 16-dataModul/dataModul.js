const moment = require('./moment');

// Функция для получения текущей даты и времени
const getCurrentDateTime = () => {
	return moment().format('YYYY-MM-DD HH:mm:ss');
}

// Функция для форматирования даты по пользовательскому формату
const formatCustom = (date, format) => {
	return moment(date).format(format);
}

// Функция для добавления часов к дате
const addHoursToDate = (date, hours) => {
	return moment(date).add(hours, 'hours').format('YYYY-MM-DD HH:mm:ss');
}

// Экспорт функций
module.exports = {
	getCurrentDateTime,
	formatCustom,
	addHoursToDate,
};

//Использование модуля
const currentDateTime = getCurrentDateTime();
console.log(`Текущая дата и время: ${currentDateTime}`);

const customFormattedDate = formatCustom(currentDateTime, 'YYYY/MM/DD HH:mm');
console.log(`Пользовательский формат даты: ${customFormattedDate}`);

const futureDateTime = addHoursToDate(currentDateTime, 3);
console.log(`Дата и время через 3 часа: ${futureDateTime}`);
