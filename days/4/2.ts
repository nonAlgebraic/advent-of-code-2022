export default (input: string) => {
	const pairs = input
		.split('\n')
		.map(pair => pair.split(',').map(range => range.split('-').map(str => Number(str))));

	return pairs.reduce((numOverlaps, pair) => {
		const [rangeWithLowerStart, rangeWithHigherStart] =
			pair[0][0] <= pair[1][0] ? [pair[0], pair[1]] : [pair[1], pair[0]];

		return rangeWithLowerStart[1] >= rangeWithHigherStart[0] ? numOverlaps + 1 : numOverlaps;
	}, 0);
};
