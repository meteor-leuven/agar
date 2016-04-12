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

window.requestAnimationFrame(function updateMyPosition() {
	Players.update(myPlayerId.get(), {$inc: {
		x: direction.x*myVelocity,
		y: direction.y*myVelocity
	}})
	window.requestAnimationFrame(updateMyPosition)
})