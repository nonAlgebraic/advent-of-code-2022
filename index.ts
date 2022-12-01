import { readFileSync } from 'fs';
import type { DayFunction, DayPart } from './types';

async function getAnswerForDayAndPart(day: number, part: DayPart) {
	const dayFunc = (await import(`./days/${day}/${part}`)).default as DayFunction;
	const dayInput = readFileSync(`./days/${day}/${part}.input`, 'utf-8');

	return await dayFunc(dayInput);
}

async function printAnswerForDayAndPart(day: number, part: DayPart) {
	const answer = await getAnswerForDayAndPart(day, part);

	console.log(Bun.inspect(answer));
}

printAnswerForDayAndPart(Number(process.argv[2]), Number(process.argv[3]) as DayPart);
