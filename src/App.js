import React, { Component } from "react";
import axios from "axios";
import loadingGif from "./media/loading.gif";
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
		this.getCardsFromServer();
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
			console.log(response);
			this.setState({
				favoritesList: response.data
			});
		});
	}

	postUserCardToTheServer() {
		// only saving url but have potential to save whatever we want from the card
		const savedCard = {
			imageUrl: this.state.selectedCard
		};
		axios.post("/api/favorites", savedCard).then((response) => {
			this.setState({
				favoritesList: response.data
			});
		});
	}

	updateCardOnServer(id) {
		const updatedCard = {
			imageUrl: this.state.selectedCard
		};

		axios.put(`/api/favorites/${id}`, updatedCard).then((response) => {
			this.setState({
				favoritesList: response.data
			});
		});
	}

	deleteCardFromServer(id) {
		console.log(id);
		axios.delete(`/api/favorites/${id}`).then((response) => {
			this.setState({
				favoritesList: response.data
			});
		});
	}

	render() {
		const { stuff, selectedCard, favoritesList } = this.state;

		const pokeCards = stuff.length ? (
			stuff.map((card) => {
				return (
					<img
						key={card.imageUrl}
						onClick={() => {
							this.setCard(card);
						}}
						src={card.imageUrl}
					/>
				);
			})
		) : (
			<img src={loadingGif} />
		);

		const myFavorites = favoritesList.map((card) => {
			return (
				<span key={card.id}>
					<img src={card.imageUrl} />
					<button onClick={() => this.deleteCardFromServer(card.id)}>
						delete
					</button>
					<button onClick={() => this.updateCardOnServer(card.id)}>
						update with selected
					</button>
				</span>
			);
		});

		return (
			<div className="App">
				<div>
					<div>{myFavorites}</div>
					<div>
						<img src={selectedCard} />
						<div>
							<button onClick={this.postUserCardToTheServer}>
								Add
							</button>
						</div>
					</div>
				</div>
				{pokeCards}
			</div>
		);
	}
}

export default App;
