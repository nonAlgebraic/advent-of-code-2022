type Direction = 'L' | 'R' | 'U' | 'D';

type Move = {
	direction: Direction;
	numSteps: number;
};

type Position = [number, number];

const getNewHeadPosition = (currentHeadPosition: Position, direction: Direction) => {
	const headPosition: Position = [...currentHeadPosition];

	const component = direction === 'L' || direction === 'R' ? 0 : 1;
	const delta = direction === 'R' || direction === 'U' ? 1 : -1;

	headPosition[component] += delta;
	return headPosition;
};

const getNewTailPosition = (currentTailPosition: Position, headPosition: Position) => {
	const tailPosition: Position = [...currentTailPosition];

	const deltaX = headPosition[0] - tailPosition[0];
	const deltaXAbs = Math.abs(deltaX);
	const deltaY = headPosition[1] - tailPosition[1];
	const deltaYAbs = Math.abs(deltaY);

	if (deltaXAbs <= 1 && deltaYAbs <= 1) {
		return tailPosition;
	}

	if (!(deltaXAbs && deltaYAbs)) {
		tailPosition[0] += deltaX / 2;
		tailPosition[1] += deltaY / 2;
	} else {
		tailPosition[0] += deltaX / deltaXAbs;
		tailPosition[1] += deltaY / deltaYAbs;
	}

	return tailPosition;
};

export default (input: string) => {
	const moves = input.split('\n').map<Move>(line => {
		const [direction, steps] = line.split(' ');
		return {
			direction: direction as Direction,
			numSteps: Number(steps),
		};
	});

	let headPosition: Position = [0, 0];
	let tailPosition: Position = [0, 0];

	const positionsVisitedByTail = new Set<string>();
	positionsVisitedByTail.add(tailPosition.toString());

	for (const move of moves) {
		for (let i = 0; i < move.numSteps; i++) {
			headPosition = getNewHeadPosition(headPosition, move.direction);
			tailPosition = getNewTailPosition(tailPosition, headPosition);

			positionsVisitedByTail.add(tailPosition.toString());
		}
	}

	return positionsVisitedByTail.size;
};
