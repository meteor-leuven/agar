Template.body.helpers({
	me: {x: 10, y: 0, radius: 10},

	food: [
		{x: -100, y:-30},
		{x: 30, y: 130},
		{x: 87, y: 100}
	],

	otherPlayers: [
		{x: 9, y: -150, radius: 12},
		{x: 130, y: 30, radius: 20}
	],

	invert(number) {return -number}
})