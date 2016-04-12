export const myPlayerId = new ReactiveVar()

Tracker.autorun(function() {
	if (Meteor.status().connected)
		Meteor.call(
			'getMyPlayerId',
			(error, result) => myPlayerId.set(result)
		)
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

Tracker.autorun(function() {
	const me = Players.findOne(myPlayerId.get())
	if (me != undefined) {
		myPosition.x = me.x
		myPosition.y = me.y
	}
})