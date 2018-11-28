import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stuff: [],
			selectedCard: null
		};
		this.getDataFromUrl = this.getDataFromUrl.bind(this);
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

	render() {
		const { stuff } = this.state;

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
					<img src={this.state.selectedCard} />
				</div>
				{myCards}
			</div>
		);
	}
}

export default App;
