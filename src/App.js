import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stuff: [],
			selectedCard: null,
			favoritesList: []
		};
		this.getDataFromUrl = this.getDataFromUrl.bind(this);
		this.postUserCardToTheServer = this.postUserCardToTheServer.bind(this);
		this.getCardsFromServer = this.getCardsFromServer.bind(this);
		this.updateCardOnServer = this.updateCardOnServer.bind(this);
	}

	componentDidMount() {
		this.getDataFromUrl();
	}

	setCard(card) {
		this.setState({
			selectedCard: card.imageUrl
		});
	}

	getDataFromUrl() {
		axios.get("https://api.pokemontcg.io/v1/cards").then((response) => {
			this.setState({
				stuff: response.data.cards
			});
		});
	}

	getCardsFromServer() {
		axios.get("/api/favorites").then((response) => {
			this.setState({
				favoritesList: response.data
			});
		});
	}

	postUserCardToOurServer() {
		// only saving url but have potential to save whatever we want from the card
		const savedCard = {
			imageUrl: this.state.selectedCard
		};
		axios.post("/api/add_to_favorites", savedCard).then((response) => {
			this.setState({
				favoritesList: response.data
			});
		});
	}

	updateCardOnServer(id) {
		const updatedCard = {
			imageUrl: this.state.selectedCard
		};

		axios
			.put(`/api/add_to_favorites/${id}`, updatedCard)
			.then((response) => {
				this.setState({
					favoritesList: response.data
				});
			});
	}

	deleteCardFromServer(id) {
		axios.delete(`/api/delete_from_favorites/${id}`).then((response) => {
			this.setState({
				favoritesList: response.data
			});
		});
	}

	render() {
		const { stuff, selectedCard } = this.state;

		const myCards = stuff.map((card) => {
			return (
				<img
					onClick={() => {
						this.setCard(card);
					}}
					src={card.imageUrl}
				/>
			);
		});

		return (
			<div className="App">
				<div>
					<img src={selectedCard} />
				</div>
				{myCards}
			</div>
		);
	}
}

export default App;
