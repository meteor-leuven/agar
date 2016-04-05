Food = new Mongo.Collection('food')

randomLocation = function() {
	return {
		x: Math.random() * 1000 - 500,
		y: Math.random() * 1000 - 500
	}
}