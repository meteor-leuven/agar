Template.body.helpers({
	me: {x: 10, y: 0, radius: 10},

	food: function() {
        return Food.find()
    },

	otherPlayers: [
		{x: 9, y: -150, radius: 12},
		{x: 130, y: 30, radius: 20}
	],

	invert(number) {return -number}
})