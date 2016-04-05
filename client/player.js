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
const myPosition = [0, 0]

const clamp = (direction, position) => Math.abs(position)>500 && Math.sign(position) == Math.sign(direction) ? 0 : direction

window.requestAnimationFrame(function updateMyPosition() {
	Players.update(myPlayerId.get(), {$inc: {
		x: clamp(direction[0], myPosition[0])*myVelocity,
		y: clamp(direction[1], myPosition[1])*myVelocity
	}})
	window.requestAnimationFrame(updateMyPosition)
})

Tracker.autorun(function() {
	const me = Players.findOne(myPlayerId.get())
	if (me != undefined) {
		myPosition[0] = me.x
		myPosition[1] = me.y
	}
})