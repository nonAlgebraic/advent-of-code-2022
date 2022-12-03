const GROUP_SIZE = 3;

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

	const badges: string[] = [];

	let comparisonSet: Set<string>;

	for (let i = 0; i < sacks.length; i++) {
		const groupMemberSack = sacks[i];
		const groupMemberIndex = i % GROUP_SIZE;
		const isLastGroupMember = groupMemberIndex === GROUP_SIZE - 1;

		if (groupMemberIndex === 0) {
			comparisonSet = new Set(groupMemberSack);
		} else {
			const newComparisonSet = new Set<string>();

			for (const item of groupMemberSack) {
				if (comparisonSet!.has(item)) {
					if (isLastGroupMember) {
						badges.push(item);
						break;
					} else {
						newComparisonSet.add(item);
					}
				}
			}

			comparisonSet = newComparisonSet;
		}
	}

	return badges.reduce((total, char) => total + getCharPriority(char), 0);
};
