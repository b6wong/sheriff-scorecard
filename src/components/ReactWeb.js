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
            <div className="container">
                <div className="page-header">
                    <h1>Sheriff of Nottingham Scorecard</h1>
                    <p className="lead">Add Players.  Enter Goods.  Calculate Score.</p>
                </div>

                { isUpdatingPlayer ?
                    <Modal isOpen={true}>
                        <ModalHeader>
                            <ModalClose onClick={() => this.onFinishUpdatePlayer()} />
                            <ModalTitle>{this.props.updatePlayer.name}</ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                            <table className="table table-hover">
                                <tbody>
                                    <tr>
                                        <td>Apple</td>
                                        <td><input name="apple" type="number" value={this.props.updatePlayer.apple} onChange={this.handleGoodsChange} /></td>
                                    </tr>
                                    <tr>
                                        <td>Bread</td>
                                        <td><input name="bread" type="number" value={this.props.updatePlayer.bread} onChange={this.handleGoodsChange} /></td>
                                    </tr>
                                    <tr>
                                        <td>Cheese</td>
                                        <td><input name="cheese" type="number" value={this.props.updatePlayer.cheese} onChange={this.handleGoodsChange} /></td>
                                    </tr>
                                    <tr>
                                        <td>Chicken</td>
                                        <td><input name="chicken" type="number" value={this.props.updatePlayer.chicken} onChange={this.handleGoodsChange} /></td>
                                    </tr>
                                    <tr>
                                        <td>Contraband</td>
                                        <td><input name="contraband" type="number" value={this.props.updatePlayer.contraband} onChange={this.handleGoodsChange} /></td>
                                    </tr>
                                    <tr>
                                        <td>Gold</td>
                                        <td><input name="gold" type="number" value={this.props.updatePlayer.gold} onChange={this.handleGoodsChange} /></td>
                                    </tr>
                                </tbody>
                            </table>
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

                {
                    this.props.players.length > 0 ?
                        <PlayersList 
                            playerList={this.props.players} 
                            onSelectPlayer={this.onSelectPlayer} 
                        />
                    :
                        null
                }

                {
                    canCalculateScore ?
                        <button 
                            onClick={this.handleCalculateScore} 
                            >
                                Calculate Score
                        </button>
                    :
                        null
                }
            </div>
        );

    }

}

export default ReactWeb;
