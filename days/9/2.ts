type Direction = 'L' | 'R' | 'U' | 'D';

type Move = {
	direction: Direction;
	numSteps: number;
};

type Position = [number, number];

const ROPE_LENGTH = 10;

const getNewHeadPosition = (currentHeadPosition: Position, direction: Direction) => {
	const headPosition: Position = [...currentHeadPosition];

	// The axis of movement
	const component = direction === 'L' || direction === 'R' ? 0 : 1;

	// The positional delta along that axis
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
		// tail still touching the head; no movement necessary
		return tailPosition;
	}

	if (!(deltaXAbs && deltaYAbs)) {
		// purely horizontal or vertical gap; one of the following will be 0
		tailPosition[0] += deltaX / 2;
		tailPosition[1] += deltaY / 2;
	} else {
		// diagonal gap
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

	const knotPositions = new Array<Position>(ROPE_LENGTH);

	for (let i = 0; i < knotPositions.length; i++) {
		knotPositions[i] = [0, 0];
	}

	const positionsVisitedByTail = new Set<string>();
	positionsVisitedByTail.add(knotPositions[knotPositions.length - 1].toString());

	for (const move of moves) {
		for (let i = 0; i < move.numSteps; i++) {
			knotPositions[0] = getNewHeadPosition(knotPositions[0], move.direction);

			for (let j = 1; j < knotPositions.length; j++) {
				knotPositions[j] = getNewTailPosition(knotPositions[j], knotPositions[j - 1]);
			}

			positionsVisitedByTail.add(knotPositions[knotPositions.length - 1].toString());
		}
	}

	return positionsVisitedByTail.size;
};
