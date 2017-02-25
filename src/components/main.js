import React, { Component } from 'react';
import { Modal, ModalHeader, ModalTitle, ModalClose, ModalBody, ModalFooter } from 'react-modal-bootstrap';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            players: [],
            addPlayer: '',
            updatePlayer: null
        };

        this.handlePlayerChange = this.handlePlayerChange.bind(this);
        this.onAddPlayer = this.onAddPlayer.bind(this);
        this.handleGoodsChange = this.handleGoodsChange.bind(this);
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

    onFinishUpdatePlayer() {
        this.setState({
            updatePlayer: null
        })
    }

    onSelectPlayer(player) {
        this.setState({
            updatePlayer: player
        })
    }

    handleGoodsChange(event) {
        const name = event.target.name;
        let value = event.target.value < 0 ? 0 : parseInt(event.target.value, 10);
        if (Number.isNaN(value)) {
            value = 0;
        }
        
        let updatePlayer = this.state.updatePlayer;
        updatePlayer[name] = value;

        this.setState({
            updatePlayer: updatePlayer
        })
    }

    render() {

        const canAddMorePlayers = this.state.players.length < 5;
        const isUpdatingPlayer = this.state.updatePlayer !== null;

        const playerList = this.state.players.map((obj, idx) => {
            return (<li onClick={() => this.onSelectPlayer(obj)} key={idx}>{obj.name}, {obj.apple}, {obj.bread}, {obj.cheese}, {obj.chicken}, {obj.contraband}, {obj.gold}</li>);
        })

        return (
            <div>
                { isUpdatingPlayer ?
                    <Modal isOpen={true}>
                        <ModalHeader>
                            <ModalClose onClick={() => this.onFinishUpdatePlayer()} />
                            <ModalTitle>Update Player</ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                            <p>Update Player: {this.state.updatePlayer.name}</p>
                            <p>Apple: <input name="apple" type="number" value={this.state.updatePlayer.apple} onChange={this.handleGoodsChange} /></p>
                            <p>Bread: <input name="bread" type="number" value={this.state.updatePlayer.bread} onChange={this.handleGoodsChange} /></p>
                            <p>Cheese: <input name="cheese" type="number" value={this.state.updatePlayer.cheese} onChange={this.handleGoodsChange} /></p>
                            <p>Chicken: <input name="chicken" type="number" value={this.state.updatePlayer.chicken} onChange={this.handleGoodsChange} /></p>
                            <p>Contraband: <input name="contraband" type="number" value={this.state.updatePlayer.contraband} onChange={this.handleGoodsChange} /></p>
                            <p>Gold: <input name="gold" type="number" value={this.state.updatePlayer.gold} onChange={this.handleGoodsChange} /></p>
                        </ModalBody>
                        <ModalFooter>
                            <button className="btn btn-default btn-sm" onClick={() => this.onFinishUpdatePlayer()}>
                                Close
                            </button>
                        </ModalFooter>
                    </Modal>
                    :
                    null
                }

                <h2>Welcome to Sheriff of Nottingham</h2>

                { canAddMorePlayers ?
                    <div>
                        <input type="text" value={this.state.addPlayer} onChange={this.handlePlayerChange} />
                        <button onClick={this.onAddPlayer} disabled={this.state.addPlayer === ''}>
                            Add Player
                        </button>
                    </div> :
                    null
                }
                
                <ul>
                    {playerList}
                </ul>
            </div>
        );
    }
}

export default Main;



 