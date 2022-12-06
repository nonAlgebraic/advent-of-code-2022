const SIGNAL_LENGTH = 4;

export default (input: string) => {
	let candidateI = 0;

	for (let i = 1; i < input.length; i++) {
		let uniqueCount = 0;

		for (let j = candidateI; j < i; j++) {
			if (input[i] !== input[j]) {
				uniqueCount++;
			} else {
				candidateI = j;
			}
		}

		if (uniqueCount === SIGNAL_LENGTH) {
			return i + 1;
		}
	}
};
