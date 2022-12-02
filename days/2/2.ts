enum HandID {
	Rock,
	Paper,
	Scissors,
}

interface Hand {
	pointValue: number;
	beats: HandID;
	beatenBy: HandID;
}

enum Outcome {
	Lose,
	Draw,
	Win,
}

const HANDS: Record<HandID, Hand> = {
	[HandID.Rock]: {
		pointValue: 1,
		beats: HandID.Scissors,
		beatenBy: HandID.Paper,
	},

	[HandID.Paper]: {
		pointValue: 2,
		beats: HandID.Rock,
		beatenBy: HandID.Scissors,
	},

	[HandID.Scissors]: {
		pointValue: 3,
		beats: HandID.Paper,
		beatenBy: HandID.Rock,
	},
};

const HAND_SYMBOL_ID_MAP: Record<string, HandID> = {
	A: HandID.Rock,
	B: HandID.Paper,
	C: HandID.Scissors,
};
const OUTCOME_SYMBOL_MAP: Record<string, Outcome> = {
	X: Outcome.Lose,
	Y: Outcome.Draw,
	Z: Outcome.Win,
};

const OUTCOME_POINT_VALUE_MAP: Record<Outcome, number> = {
	[Outcome.Lose]: 0,
	[Outcome.Draw]: 3,
	[Outcome.Win]: 6,
};

const getRoundPointValue = (playerHandID: HandID, opponentHandID: HandID) => {
	const playerHand = HANDS[playerHandID];
	const opponentHand = HANDS[opponentHandID];

	const outcome =
		playerHand.beatenBy === opponentHandID
			? Outcome.Lose
			: playerHand.beats === opponentHandID
			? Outcome.Win
			: Outcome.Draw;

	return OUTCOME_POINT_VALUE_MAP[outcome] + playerHand.pointValue;
};

const getHandIDForDesiredOutcome = (opponentHandID: HandID, desiredOutcome: Outcome): HandID => {
	switch (desiredOutcome) {
		case Outcome.Lose:
			return HANDS[opponentHandID].beats;

		case Outcome.Draw:
			return opponentHandID;

		case Outcome.Win:
			return HANDS[opponentHandID].beatenBy;

		default:
			const exhaustiveCheck: never = desiredOutcome;
			throw new Error(exhaustiveCheck);
	}
};

export default (input: string) => {
	const rounds = input.split('\n').map(line => line.split(' '));

	return rounds.reduce((total, round) => {
		const [opponentHandID, desiredOutcome] = [
			HAND_SYMBOL_ID_MAP[round[0]],
			OUTCOME_SYMBOL_MAP[round[1]],
		];

		const playerHandID = getHandIDForDesiredOutcome(opponentHandID, desiredOutcome);

		return total + getRoundPointValue(playerHandID, opponentHandID);
	}, 0);
};
