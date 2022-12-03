const LOWERCASE_ASCII_OFFSET = 96;
const UPPERCASE_ASCII_OFFSET = 38;

const getCharPriority = (char: string) => {
	const code = char.charCodeAt(0);
	const codeOffset =
		code > LOWERCASE_ASCII_OFFSET ? LOWERCASE_ASCII_OFFSET : UPPERCASE_ASCII_OFFSET;
	return code - codeOffset;
};

export default (input: string) => {
	const sacks = input.split('\n').map(sackString => [...sackString]);

	const dupes: string[] = [];

	for (const sack of sacks) {
		const comp2Items = sack.splice(sack.length / 2, sack.length / 2);
		const comp1Items = new Set(sack);

		for (const item of comp2Items) {
			if (comp1Items.has(item)) {
				dupes.push(item);
				break;
			}
		}
	}

	return dupes.reduce((total, char) => total + getCharPriority(char), 0);
};
