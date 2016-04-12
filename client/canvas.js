import { Template } from 'meteor/templating'
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
		direction.x = event.clientX - event.currentTarget.offsetWidth /2
		direction.y = event.clientY - event.currentTarget.offsetHeight/2

		// We calculate the length of the vector to normalize it
		const length = Math.hypot(direction.x, direction.y)
		direction.x /= length
		direction.y /= length
	}
})