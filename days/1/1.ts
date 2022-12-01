import type { DayFunction } from '../../types';

const day1: DayFunction = (input: string) => {
	const lists = input.split('\n\n');

	let max = 0;
	for (let list of lists) {
		const totalForThisElf = list.split('\n').reduce((total, line) => (total += Number(line)), 0);

		max = Math.max(max, totalForThisElf);
	}

	return max;
};

export default day1;
