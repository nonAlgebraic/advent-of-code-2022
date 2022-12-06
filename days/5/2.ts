const LAST_STACK_LABEL_INDEX_FROM_END = 2;

export default (input: string) => {
	const [stacksStr, movesStr] = input.split('\n\n');

	const stackLines = stacksStr.split('\n');
	const stacklabelsLine = stackLines[stackLines.length - 1];

	const numStacks = Number(
		stacklabelsLine.charAt(stacklabelsLine.length - LAST_STACK_LABEL_INDEX_FROM_END)
	);

	const stacks: string[][] = [];

	for (let i = stackLines.length - 2; i >= 0; i--) {
		for (let j = 0; j < numStacks; j++) {
			const slotIndex = j * 4 + 1;
			if (stackLines[i][slotIndex] !== ' ') {
				if (typeof stacks[j] === 'undefined') {
					stacks[j] = [];
				}

				stacks[j].push(stackLines[i][slotIndex]);
			}
		}
	}

	const moves = movesStr.split('\n');

	const tempMoveArr: string[] = [];

	for (const move of moves) {
		const [, amtStr, , srcStr, , destStr] = move.split(' ');

		const amt = Number(amtStr);
		const src = Number(srcStr);
		const dest = Number(destStr);

		for (let i = 0; i < amt; i++) {
			tempMoveArr.push(stacks[src - 1].pop()!);
		}

		for (let i = 0; i < amt; i++) {
			stacks[dest - 1].push(tempMoveArr.pop()!);
		}
	}

	return stacks.map(stack => stack[stack.length - 1]).join('');
};
