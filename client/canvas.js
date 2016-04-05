import { myPlayerId } from './player'

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