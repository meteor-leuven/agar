import { randomLocation } from '/lib/collections'
export const myPlayerId = new ReactiveVar()

Tracker.autorun(function() {
	if (Meteor.status().connected)
		Meteor.call(
			'getMyPlayerId',
			(error, result) => myPlayerId.set(result)
		)
})

Tracker.autorun(function() {
	const me = Players.findOne(myPlayerId.get())
	if (me != undefined) {
		myPosition.x = me.x
		myPosition.y = me.y
		eatWhenPossible(me)
	}
})

// Movement
var myVelocity = 1.5
export const direction = {x: 0, y: 0}
const myPosition = {x: 0, y: 0}

const clamp = (direction, position) => Math.abs(position)>500 && Math.sign(position) == Math.sign(direction) ? 0 : direction

window.requestAnimationFrame(function updateMyPosition() {
	Players.update(myPlayerId.get(), {$inc: {
		x: clamp(direction.x, myPosition.x)*myVelocity,
		y: clamp(direction.y, myPosition.y)*myVelocity
	}})
	window.requestAnimationFrame(updateMyPosition)
})

// Eating behavior
function eatWhenPossible(player) {
	const radius = player.points+10

	// Eat food
	Food.find({
		x: {$gte: player.x-radius, $lte: player.x+radius},
		y: {$gte: player.y-radius, $lte: player.y+radius}
	}).forEach(function(pieceOfFood) {
		if (Math.hypot(pieceOfFood.x-player.x, pieceOfFood.y-player.y) < (radius - 5)) {
			Food.remove(pieceOfFood._id)
			Food.insert(randomLocation())
			Players.update(player._id, {$inc: {points: 1}})
			myVelocity *= 0.95
		}
	})
}