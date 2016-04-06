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
		saveMyPosition(me)
		eatWhenPossible(me)
	}
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

function saveMyPosition(player) {
	myPosition[0] = player.x
	myPosition[1] = player.y
}

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

	//Eat other players
	Players.find({
		_id: {$ne: player._id},
		points: {$lt: player.points},
		x: {$gte: player.x-radius, $lte: player.x+radius},
		y: {$gte: player.y-radius, $lte: player.y+radius},
		gameOver: {$ne: true}
	}).forEach(function(otherPlayer) {
		if (Math.hypot(otherPlayer.x-player.x, otherPlayer.y-player.y) < (radius - otherPlayer.points - 10)) {
			Players.update(otherPlayer._id, {$set: {gameOver: true}})
			Players.update(player._id, {$inc: {points: otherPlayer.points+1}})
			myVelocity *= 0.95
			console.log('eat another player')
		}
	})
}