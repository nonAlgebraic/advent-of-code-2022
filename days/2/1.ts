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
	X: HandID.Rock,
	B: HandID.Paper,
	Y: HandID.Paper,
	C: HandID.Scissors,
	Z: HandID.Scissors,
};

const WIN_POINT_VALUE = 6;
const DRAW_POINT_VALUE = 3;

const getRoundPointValue = (playerHandID: HandID, opponentHandID: HandID) => {
	const playerHand = HANDS[playerHandID];
	const opponentHand = HANDS[opponentHandID];

	const baseRoundPointValue =
		playerHand.beats === opponentHandID
			? WIN_POINT_VALUE
			: playerHand.beatenBy === opponentHandID
			? 0
			: DRAW_POINT_VALUE;

	return baseRoundPointValue + playerHand.pointValue;
};

export default (input: string) => {
	const rounds = input.split('\n').map(line => line.split(' '));

	return rounds.reduce((total, round) => {
		const [opponentHandID, playerHandID] = [
			HAND_SYMBOL_ID_MAP[round[0]],
			HAND_SYMBOL_ID_MAP[round[1]],
		];

		return total + getRoundPointValue(playerHandID, opponentHandID);
	}, 0);
};
