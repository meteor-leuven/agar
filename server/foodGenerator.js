for (let foodCount = Food.find().count(); foodCount < 200; foodCount++) {
	Food.insert(randomLocation())
}