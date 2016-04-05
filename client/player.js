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
export const direction = [0,0]

window.requestAnimationFrame(function updateMyPosition() {
	Players.update(myPlayerId.get(), {$inc: {
		x: direction[0]*myVelocity,
		y: direction[1]*myVelocity
	}})
	window.requestAnimationFrame(updateMyPosition)
})