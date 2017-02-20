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
        console.log("close modal");
        this.setState({
            updatePlayer: null
        })
    }

    render() {

        const canAddMorePlayers = this.state.players.length < 5;

        const playerList = this.state.players.map((obj, idx) => {
            return (<li key={idx}>{obj.name}</li>);
        })

        return (
            <div>

                <Modal isOpen={this.state.updatePlayer !== null}>
                    <ModalHeader>
                        <ModalClose onClick={() => this.onFinishUpdatePlayer()} />
                        <ModalTitle>Update Player</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <p>Update Player: ---</p>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-default btn-sm" onClick={() => this.onFinishUpdatePlayer()}>
                            Close
                        </button>
                    </ModalFooter>
                </Modal>

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



 