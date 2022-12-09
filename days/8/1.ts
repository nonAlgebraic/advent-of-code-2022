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

	const getIsVisible = (i: number, j: number, direction: typeof DIRECTIONS[number]) => {
		switch (direction) {
			case 'top':
				if (j > 0) {
					for (let _j = 0; _j < j; _j++) {
						if (forest[i][_j] >= forest[i][j]) {
							return false;
						}
					}
				}

				return true;

			case 'bottom':
				if (j < forest[i].length - 1) {
					for (let _j = forest[i].length - 1; _j > j; _j--) {
						if (forest[i][_j] >= forest[i][j]) {
							return false;
						}
					}
				}

				return true;

			case 'left':
				if (i > 0) {
					for (let _i = 0; _i < i; _i++) {
						if (forest[_i][j] >= forest[i][j]) {
							return false;
						}
					}
				}

				return true;

			case 'right':
				if (i < forest.length - 1) {
					for (let _i = forest.length - 1; _i > i; _i--) {
						if (forest[_i][j] >= forest[i][j]) {
							return false;
						}
					}
				}

				return true;
		}
	};

	let numVisibleTrees = 0;

	for (let i = 0; i < forest.length; i++) {
		for (let j = 0; j < forest[i].length; j++) {
			if (DIRECTIONS.some(direction => getIsVisible(i, j, direction))) {
				numVisibleTrees++;
			}
		}
	}

	return numVisibleTrees;
};
