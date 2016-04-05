import { myPlayerId, direction } from './player'

Template.body.helpers({
	me() {
		return Players.findOne(myPlayerId.get())
	},

	food: function() {
        return Food.find()
    },

	otherPlayers() {
		return Players.find({_id: {$not: myPlayerId.get()} })
	},

	radiusFor(player) {
		return 10 + player.points
	},

	invert(number) {return -number}
})

Template.body.events({
	'mousemove svg'(event) {
		// Direction is a vector from the center of the window to the position of the mouse
		direction[0] = event.clientX - event.currentTarget.offsetWidth /2
		direction[1] = event.clientY - event.currentTarget.offsetHeight/2

		// We calculate the length of the vector to normalize it
		const length = Math.hypot(direction[0], direction[1])
		direction[0] /= length
		direction[1] /= length
	}
})