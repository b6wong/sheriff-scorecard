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

    onSetGoods(type, increment) {
        let updatePlayer = this.state.updatePlayer;
        switch(type) {
            case 'apple':
                updatePlayer.apple += increment;
                if (updatePlayer.apple < 0) updatePlayer.apple = 0;
                break;
            case 'bread':
                updatePlayer.bread += increment;
                if (updatePlayer.bread < 0) updatePlayer.bread = 0;
                break;
            case 'cheese':
                updatePlayer.cheese += increment;
                if (updatePlayer.cheese < 0) updatePlayer.cheese = 0;
                break;
            case 'chicken':
                updatePlayer.chicken += increment;
                if (updatePlayer.chicken < 0) updatePlayer.chicken = 0;
                break;
            default:
                break;
        }
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
                            <p>Apple: <button onClick={() => this.onSetGoods('apple', 1)}>+</button><button onClick={() => this.onSetGoods('apple', -1)}>-</button> {this.state.updatePlayer.apple}</p>
                            <p>Bread: <button onClick={() => this.onSetGoods('bread', 1)}>+</button><button onClick={() => this.onSetGoods('bread', -1)}>-</button> {this.state.updatePlayer.bread}</p>
                            <p>Cheese: <button onClick={() => this.onSetGoods('cheese', 1)}>+</button><button onClick={() => this.onSetGoods('cheese', -1)}>-</button> {this.state.updatePlayer.cheese}</p>
                            <p>Chicken: <button onClick={() => this.onSetGoods('chicken', 1)}>+</button><button onClick={() => this.onSetGoods('chicken', -1)}>-</button> {this.state.updatePlayer.chicken}</p>
                            <p>Contraband: {this.state.updatePlayer.contraband}</p>
                            <p>Gold: {this.state.updatePlayer.gold}</p>
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



 