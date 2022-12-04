export default (input: string) => {
	const pairs = input
		.split('\n')
		.map(pair => pair.split(',').map(range => range.split('-').map(str => Number(str))));

	return pairs.reduce((numTotalOverlap, pair) => {
		if (
			(pair[0][0] >= pair[1][0] && pair[0][1] <= pair[1][1]) ||
			(pair[0][0] <= pair[1][0] && pair[0][1] >= pair[1][1])
		) {
			return numTotalOverlap + 1;
		} else {
			return numTotalOverlap;
		}
	}, 0);
};
