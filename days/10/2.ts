const DISPLAY_W = 40;
const DISPLAY_H = 6;

export default (input: string) => {
	const instructions = input.split('\n').map(line => {
		const [, value] = line.split(' ');

		return !value ? null : Number(value);
	});

	let x = 1;
	let cycle = 1;

	const display: string[][] = new Array(DISPLAY_H);
	for (let i = 0; i < display.length; i++) {
		display[i] = new Array(DISPLAY_W).fill('.');
	}

	const tick = () => {
		const currentPixel = (cycle - 1) % DISPLAY_W;
		const currentLine = Math.floor((cycle - 1) / DISPLAY_W) % DISPLAY_H;

		const isCurrentPixelLit = currentPixel >= x - 1 && currentPixel <= x + 1;

		display[currentLine][currentPixel] = isCurrentPixelLit ? '#' : '.';

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

	let resultStr = '';

	for (const line of display) {
		resultStr += `${line.join('')}\n`;
	}

	return resultStr;
};
