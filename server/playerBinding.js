import { randomLocation } from '/lib/collections';

Meteor.onConnection(function(connection) {
	const newPlayer = randomLocation()
	newPlayer.points = 0;
	newPlayer.gameOver = false

	const playerId = Players.insert(newPlayer)
	connection.playerId = playerId

	connection.onClose(function() {
		Players.remove(playerId)
	})
})

Meteor.methods({
	getMyPlayerId() { return this.connection.playerId }
})

Players.remove({})