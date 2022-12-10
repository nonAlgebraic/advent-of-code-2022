export default (input: string) => {
	const instructions = input.split('\n').map(line => {
		const [instructionType, value] = line.split(' ');

		return !value ? null : Number(value);
	});

	let sumSignalStrengths = 0;
	let x = 1;
	let cycle = 1;

	const tick = () => {
		console.log({ cycle, x });
		if ((cycle - 20) % 40 === 0) {
			sumSignalStrengths += cycle * x;
		}
		cycle++;
	};

	for (const instruction of instructions) {
		if (instruction === null) {
			tick();
		} else {
			tick();
			tick();

			x += instruction;
		}
	}

	return sumSignalStrengths;
};
