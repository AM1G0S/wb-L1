// Константа, содержащая набор различных символов для генерации паролей
const TEST_STRING = '!"#$%&()*+-/0123456789<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_abcdefghijklmnopqrstuvwxyz{|}~';

// Минимальная длина пароля
const MIN_LENGTH = 8;

// Объект, в котором будем хранить предложения по улучшению пароля
const passwordSuggestions = {};

// Функция для оценки сложности пароля и предоставления рекомендаций по улучшению
function evaluatePasswordStrength(password) {
  const strength = calculatePasswordStrength(password);

  if (strength > 0) {
    return `Сложность пароля: ${strength} единиц`;
  } else {
    return `Пароль слишком простой. Рекомендация: ${getPasswordSuggestion(password, passwordSuggestions)}`;
  }
}

// Рассчитывает оценку сложности пароля
function calculatePasswordStrength(password) {
  let score = 0;

  // Критерии оценки сложности пароля
  const requirements = {
    length: {
      criteria: MIN_LENGTH,
      matches: password.length >= MIN_LENGTH,
      rate: 5,
    },
    lowercase: {
      criteria: /[a-z]/g,
      matches: /[a-z]/g.test(password),
      rate: 1,
    },
    uppercase: {
      criteria: /[A-Z]/g,
      matches: /[A-Z]/g.test(password),
      rate: 1,
    },
    digits: {
      criteria: /\d/g,
      matches: /\d/g.test(password),
      rate: 1,
    },
    symbols: {
      criteria: /[\W_]/g,
      matches: /[\W_]/g.test(password),
      rate: 1,
    },
  };

  // Проходим по всем критериям и вычисляем сложность пароля
  for (const key in requirements) {
    // Если критерий выполняется, увеличиваем величину сложности,
    // иначе, сохраняем этот критерий для дальнейших рекомендаций
    if (requirements[key].matches) {
      score += requirements[key].rate;
    } else {
      passwordSuggestions[key] = requirements[key];
    }
  }

  // Если есть невыполненные критерии, возвращаем -1
  if (Object.keys(passwordSuggestions).length > 0) {
    return -1;
  }

  return score;
}

// Генерирует рекомендации для улучшения пароля
function getPasswordSuggestion(password, suggestions) {
  let symbolsToAdd = '';

  // Добавляем случайные символы на основе невыполненных критериев
  for (const key in suggestions) {
    const criteria = suggestions[key].criteria;

    if (criteria instanceof RegExp) {
      // Получаем те символы, что соответствуют этому критерию
      const symbols = TEST_STRING.match(criteria);
      // Выбираем из всех символов два случайных
      const randomSymbols = [symbols[getRandomNumber(symbols.length)], symbols[getRandomNumber(symbols.length)]];
      // Сохраняем эти символы
      symbolsToAdd += randomSymbols.join('');
    }
  }

  // Все полученные символы добавляем в конец пароля
  let result = password + shuffleString(symbolsToAdd);

  // Добавляем дополнительные случайные символы, если длина пароля недостаточна
  if (result.length < MIN_LENGTH) {
    const symbolsLeft = MIN_LENGTH - result.length;
    for (let i = 0; i < symbolsLeft; i++) {
      result += TEST_STRING[getRandomNumber(TEST_STRING.length)];
    }
  }

  return result;
}

// Генерирует случайное число в заданном диапазоне
function getRandomNumber(maxNumber) {
  return Math.floor(Math.random() * maxNumber);
}

// Перемешивает символы в строке случайным образом
function shuffleString(string) {
  const arr = string.split('');

  for (let i = arr.length - 1; i > 0; i--) {
    const randomIndex = getRandomNumber(i + 1);
    const temp = arr[i];
    arr[i] = arr[randomIndex];
    arr[randomIndex] = temp;
  }

  return arr.join('');
}

// Пример использования функции для оценки сложности пароля
console.log(evaluatePasswordStrength('12345678'));
