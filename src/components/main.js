import React, { Component } from 'react';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            players: [],
            addPlayer: '',
        };

        this.handlePlayerChange = this.handlePlayerChange.bind(this);
        this.onAddPlayer = this.onAddPlayer.bind(this);
    }

    handlePlayerChange(event) {
        this.setState({addPlayer: event.target.value});
    }

    onAddPlayer() {
        const player = {
            name: this.state.addPlayer,
            apple: 0,
            bread: 0,
            cheese: 0,
            chicken: 0,
            contraband: 0,
            gold: 0
        }
        this.state.players.push(player);
        this.setState({
            players: this.state.players,
            addPlayer: ''
        });
    }

    render() {

        const playerList = this.state.players.map((obj, idx) => {
            return (<li key={idx}>{obj.name}</li>);
        })

        return (
            <div>
                <h2>Welcome to Sheriff of Nottingham {this.state.players.length}</h2>
                <input type="text" value={this.state.addPlayer} onChange={this.handlePlayerChange} />
                <button onClick={this.onAddPlayer} disabled={this.state.addPlayer === ''}>
                    Add Player
                </button>
                <ul>
                    {playerList}
                </ul>
            </div>
        );
    }
}

export default Main;



 