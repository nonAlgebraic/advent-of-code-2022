type Forest = number[][];

const DIRECTIONS = ['top', 'bottom', 'left', 'right'] as const;

const getForest = (input: string) => {
	const forest: Forest = [];

	let i = 0;
	let j = 0;

	for (const char of input) {
		if (char === '\n') {
			i = 0;
			j++;
		} else {
			if (forest.length === i) {
				forest[i] = [];
			}
			forest[i].push(Number(char));
			i++;
		}
	}

	return forest;
};

export default (input: string) => {
	const forest = getForest(input);

	const getSenicScoreForDirection = (
		i: number,
		j: number,
		direction: typeof DIRECTIONS[number]
	) => {
		let senicScoreForDirection = 0;

		switch (direction) {
			case 'top':
				if (j > 0) {
					for (let _j = j - 1; _j >= 0; _j--) {
						senicScoreForDirection++;
						if (forest[i][_j] >= forest[i][j]) {
							break;
						}
					}
				}

				break;

			case 'bottom':
				if (j < forest[i].length - 1) {
					for (let _j = j + 1; _j < forest[i].length; _j++) {
						senicScoreForDirection++;
						if (forest[i][_j] >= forest[i][j]) {
							break;
						}
					}
				}

				break;

			case 'left':
				if (i > 0) {
					for (let _i = i - 1; _i >= 0; _i--) {
						senicScoreForDirection++;
						if (forest[_i][j] >= forest[i][j]) {
							break;
						}
					}
				}

				break;

			case 'right':
				if (i < forest.length - 1) {
					for (let _i = i + 1; _i < forest.length; _i++) {
						senicScoreForDirection++;
						if (forest[_i][j] >= forest[i][j]) {
							break;
						}
					}
				}

				break;
		}

		return senicScoreForDirection;
	};

	let highestScenicScore = 0;

	for (let i = 0; i < forest.length; i++) {
		for (let j = 0; j < forest[i].length; j++) {
			const scenicScore = DIRECTIONS.reduce(
				(total, direction) => total * getSenicScoreForDirection(i, j, direction),
				1
			);

			if (scenicScore > highestScenicScore) {
				highestScenicScore = scenicScore;
			}
		}
	}

	return highestScenicScore;
};
