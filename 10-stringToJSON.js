function stringToJSON(jsonString) {
	jsonString = jsonString.trim();
	
	if (jsonString === "") {
		return '';
	}
	
	let index = 0;
	
	function parseValue() {
		const char = jsonString[index];
		
		switch (char) {
			case "{":
				return parseObject();
			case "[":
				return parseArray();
			case '"':
				return parseString();
			case "t":
				if (jsonString.slice(index, index + 4) === "true") {
					index += 4;
					return true;
				}
				break;
			case "f":
				if (jsonString.slice(index, index + 5) === "false") {
					index += 5;
					return false;
				}
				break;
			case "n":
				if (jsonString.slice(index, index + 4) === "null") {
					index += 4;
					return null;
				}
				break;
			case "-":
			case "0":
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9":
				return parseNumber();
			default:
				throw new SyntaxError(`Unexpected token: ${char}`);
		}
	}
	
	function parseString() {
		index++;
		let result = "";
		
		while (index < jsonString.length) {
			const char = jsonString[index];
			
			if (char === '"') {
				index++;
				return result;
			} else if (char === "\\") {
				handleEscapeSequence();
			} else {
				result += char;
				index++;
			}
		}
		
		throw new SyntaxError("Unterminated string literal");
	}
	
	function handleEscapeSequence() {
		const nextChar = jsonString[index + 1];
		
		if (nextChar === '"' || nextChar === "\\" || nextChar === "/" || nextChar === "b" || nextChar === "f" || nextChar === "n" || nextChar === "r" || nextChar === "t" || nextChar === "u") {
			result += nextChar;
			index += 2;
		} else {
			throw new SyntaxError(`Invalid escape sequence: \\${nextChar}`);
		}
	}
	
	function parseNumber() {
		const start = index;
		
		while (index < jsonString.length && (jsonString[index] === "-" || (jsonString[index] >= "0" && jsonString[index] <= "9") || jsonString[index] === "." || jsonString[index] === "e" || jsonString[index] === "E")) {
			index++;
		}
		
		const numberString = jsonString.slice(start, index);
		const parsedNumber = parseFloat(numberString);
		
		if (isNaN(parsedNumber)) {
			throw new SyntaxError(`Invalid number: ${numberString}`);
		}
		
		return parsedNumber;
	}
	
	function parseArray() {
		index++;
		const array = [];
		
		while (index < jsonString.length) {
			const char = jsonString[index];
			
			if (char === "]") {
				index++;
				return array;
			}
			
			const value = parseValue();
			array.push(value);
			
			if (jsonString[index] === ",") {
				index++;
			} else if (jsonString[index] !== "]") {
				throw new SyntaxError(`Unexpected token: ${jsonString[index]}`);
			}
		}
		
		throw new SyntaxError("Unterminated array");
	}
	
	function parseObject() {
		index++;
		const obj = {};
		
		while (index < jsonString.length) {
			const char = jsonString[index];
			
			if (char === "}") {
				index++;
				return obj;
			}
			
			const key = parseString();
			
			if (jsonString[index] !== ":") {
				throw new SyntaxError(`Expected ':' after key in object, but found '${jsonString[index]}'`);
			}
			
			index++;
			const value = parseValue();
			obj[key] = value;
			
			if (jsonString[index] === ",") {
				index++;
			} else if (jsonString[index] !== "}") {
				throw new SyntaxError(`Unexpected token: ${jsonString[index]}`);
			}
		}
		
		throw new SyntaxError("Unterminated object");
	}
	
	const result = parseValue();
	
	if (index !== jsonString.length) {
		throw new SyntaxError(`Unexpected token: ${jsonString[index]}`);
	}
	
	return result;
}

const jsonString = '{"name":"Chups","age":2,"isAdult":true,"isMarried":false,"city":"Petrovsk","data":{}}';
const parsedObject = stringToJSON(jsonString);
console.log(parsedObject);
