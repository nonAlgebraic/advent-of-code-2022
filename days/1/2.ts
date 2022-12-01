const N = 3;

export default (input: string) => {
	const lists = input.split('\n\n');

	let maxN = new Array(N).fill(0);
	for (let list of lists) {
		const totalForThisElf = list.split('\n').reduce((total, line) => (total += Number(line)), 0);

		const sortedMaxN = maxN.sort((a, b) => a - b);

		for (let i = 0; i < sortedMaxN.length; i++) {
			if (totalForThisElf > sortedMaxN[i]) {
				sortedMaxN[i] = totalForThisElf;
				maxN = sortedMaxN;
				break;
			}
		}
	}

	const totalMaxN = maxN.reduce((total, el) => (total += el));

	return totalMaxN;
};
