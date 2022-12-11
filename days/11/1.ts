type Operation = (old: number) => number;

type Monkey = {
	items: number[];
	operation: Operation;
	testDivisor: number;
	toMonkeyIfTrue: number;
	toMonkeyIfFalse: number;
	inspectionCount: number;
};

const NUM_ROUNDS = 20;

export default (input: string) => {
	const monkeys = input.split('\n\n').map(monkeyString => {
		const lines = monkeyString.split('\n');

		const monkey: Monkey = {
			items: lines[1]
				.substring(18)
				.split(', ')
				.map(itemString => Number(itemString)),
			operation: eval(`(old) => ${lines[2].substring(19)}`),
			testDivisor: Number(lines[3].match(/\d+$/)![0]),
			toMonkeyIfTrue: Number(lines[4].match(/\d+$/)![0]),
			toMonkeyIfFalse: Number(lines[5].match(/\d+$/)![0]),
			inspectionCount: 0,
		};

		return monkey;
	});

	for (let i = 0; i < NUM_ROUNDS; i++) {
		for (let j = 0; j < monkeys.length; j++) {
			const monkey = monkeys[j];

			let worryLevel = 0;
			while (monkey.items.length) {
				const item = monkey.items.shift()!;

				monkey.inspectionCount++;
				worryLevel = monkey.operation(item);
				worryLevel = Math.floor(worryLevel / 3);

				const toMonkeyIndex =
					worryLevel % monkey.testDivisor === 0 ? monkey.toMonkeyIfTrue : monkey.toMonkeyIfFalse;
				monkeys[toMonkeyIndex].items.push(worryLevel);
			}
		}
	}

	const monkeysByInspectionCount = monkeys.sort(
		(monkeyA, monkeyB) => monkeyA.inspectionCount - monkeyB.inspectionCount
	);

	return (
		monkeysByInspectionCount[monkeysByInspectionCount.length - 1].inspectionCount *
		monkeysByInspectionCount[monkeysByInspectionCount.length - 2].inspectionCount
	);
};
