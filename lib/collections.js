Food = new Mongo.Collection('food')
Players = new Mongo.Collection('players')

export function randomLocation() {
	return {
		x: Math.random() * 1000 - 500,
		y: Math.random() * 1000 - 500
	}
}