import { readFileSync } from 'fs';
import type { DayFunction, DayPart } from './types';

async function getAnswerForDayAndPart(day: number, part: DayPart) {
	const dayPartFunc = (await import(`./days/${day}/${part}`)).default as DayFunction;

	const dayInput = readFileSync(`./days/${day}/input`, 'utf-8');

	console.time('execution time');
	const answer = dayPartFunc(dayInput);
	console.timeEnd('execution time');

	return answer;
}

async function printAnswerForDayAndPart(day: number, part: DayPart) {
	try {
		const answer = await getAnswerForDayAndPart(day, part);
		console.log(Bun.inspect(answer));
	} catch (e) {
		console.error(e);
	}
}

printAnswerForDayAndPart(Number(process.argv[2]), Number(process.argv[3]) as DayPart);
