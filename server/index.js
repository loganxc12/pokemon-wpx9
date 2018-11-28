const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

let favorites = [];
let id = 0;

app.get("/api/favorites", (req, res) => {
	res.status(200).send(favorites);
});

app.post("/api/favorites", (req, res) => {
	const { imageUrl } = req.body;
	const newFavorite = {
		id,
		imageUrl
	};

	if (favorites.length < 6) {
		favorites.push(newFavorite);
		id++;

		res.status(200).send(favorites);
	} else {
		res.status(403).send(
			"You cant add anymore cards, try deleting one first"
		);
	}
});

app.put("/api/favorites/:id", (req, res) => {
	const { imageUrl } = req.body;
	const { id } = req.params;

	favorites.forEach((card) => {
		if (card.id === parseInt(id)) {
			card.imageUrl = imageUrl;
		}
	});

	res.status(200).send(favorites);
});

app.delete("/api/favorites/:id", (req, res) => {
	const { id } = req.params;
	favorites = favorites.filter((card) => {
		// console.log("line 51", card.id !== +id);
		if (card.id !== parseInt(id)) {
			return card;
		}
	});

	console.log(favorites);
	res.status(200).send(favorites);
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
