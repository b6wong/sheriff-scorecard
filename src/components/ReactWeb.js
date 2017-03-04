import React, { Component } from 'react';
import { Modal, ModalHeader, ModalTitle, ModalClose, ModalBody, ModalFooter } from 'react-modal-bootstrap';
import PlayersList from './PlayersList';
import AddPlayer from './AddPlayer';

class ReactWeb extends Component {

    constructor(props) {
        super(props);
        this.onFinishUpdatePlayer = this.props.onFinishUpdatePlayer.bind(this);
        this.handleGoodsChange = this.props.handleGoodsChange.bind(this);
        this.handlePlayerChange = this.props.handlePlayerChange.bind(this);
        this.onAddPlayer = this.props.onAddPlayer.bind(this);
        this.onSelectPlayer = this.props.onSelectPlayer.bind(this);
        this.handleCalculateScore = this.props.handleCalculateScore.bind(this);
    }

    render() {

        const canAddMorePlayers = this.props.players.length < 5;
        const canCalculateScore = this.props.players.length > 2;
        const isUpdatingPlayer = this.props.updatePlayer !== null;

        return (
            <div>
                { isUpdatingPlayer ?
                    <Modal isOpen={true}>
                        <ModalHeader>
                            <ModalClose onClick={() => this.onFinishUpdatePlayer()} />
                            <ModalTitle>Update Player</ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                            <p>Update Player: {this.props.updatePlayer.name}</p>
                            <p>Apple: <input name="apple" type="number" value={this.props.updatePlayer.apple} onChange={this.handleGoodsChange} /></p>
                            <p>Bread: <input name="bread" type="number" value={this.props.updatePlayer.bread} onChange={this.handleGoodsChange} /></p>
                            <p>Cheese: <input name="cheese" type="number" value={this.props.updatePlayer.cheese} onChange={this.handleGoodsChange} /></p>
                            <p>Chicken: <input name="chicken" type="number" value={this.props.updatePlayer.chicken} onChange={this.handleGoodsChange} /></p>
                            <p>Contraband: <input name="contraband" type="number" value={this.props.updatePlayer.contraband} onChange={this.handleGoodsChange} /></p>
                            <p>Gold: <input name="gold" type="number" value={this.props.updatePlayer.gold} onChange={this.handleGoodsChange} /></p>
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

                { 
                    canAddMorePlayers ?       
                        <AddPlayer 
                            addPlayer={this.props.addPlayer} 
                            handlePlayerChange={this.handlePlayerChange}
                            onAddPlayer={this.onAddPlayer}
                        />
                    :
                        null
                }

                <PlayersList 
                    playerList={this.props.players} 
                    onSelectPlayer={this.onSelectPlayer} 
                />

                <button 
                    onClick={this.handleCalculateScore} 
                    disabled={!canCalculateScore}>
                        Calculate Score
                </button>
            </div>
        );

    }

}

export default ReactWeb;
