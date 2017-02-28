import React, { Component } from 'react';
import { Modal, ModalHeader, ModalTitle, ModalClose, ModalBody, ModalFooter } from 'react-modal-bootstrap';
import PlayersList from './PlayersList';
import AddPlayer from './AddPlayer';

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
        this.handleCalculateScore = this.handleCalculateScore.bind(this);
        this.onSelectPlayer = this.onSelectPlayer.bind(this);
    }

    handlePlayerChange(event) {
        this.setState({addPlayer: event.target.value});
    }

    onAddPlayer() {
        const player = {
            name: this.state.addPlayer,
            apple: 0,
            appleScore: 0,
            appleKing: 0,
            appleQueen: 0,
            bread: 0,
            breadScore: 0,
            breadKing: 0,
            breadQueen: 0,
            cheese: 0,
            cheeseScore: 0,
            cheeseKing: 0,
            cheeseQueen: 0,
            chicken: 0,
            chickenScore: 0,
            chickenKing: 0,
            chickenQueen: 0,
            contraband: 0,
            gold: 0,
            totalScore: 0
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
    

    handleCalculateScore() {
        const P_APPLE = 2;
        const P_BREAD = 3;
        const P_CHEESE = 3;
        const P_CHICKEN = 4;
        const P_APPLE_KING = 20;
        const P_APPLE_QUEEN = 10;
        const P_BREAD_KING = 15;
        const P_BREAD_QUEEN = 10;
        const P_CHEESE_KING = 15;
        const P_CHEESE_QUEEN = 10;
        const P_CHICKEN_KING = 10;
        const P_CHICKEN_QUEEN = 5;

        let players = this.state.players;

        // Apple King / Queen
        let appleRanking = players.sort(function(a,b) {
            return a.apple < b.apple;
        });
        this.determindGoodsKingQueen(appleRanking, 'apple', 'appleKing', 'appleQueen', P_APPLE_KING, P_APPLE_QUEEN);
        
        // Bread King / Queen
        let breadRanking = appleRanking.sort(function(a,b) {
            return a.bread < b.bread;
        });
        this.determindGoodsKingQueen(breadRanking, 'bread', 'breadKing', 'breadQueen', P_BREAD_KING, P_BREAD_QUEEN);

        // Cheese King / Queen
        let cheeseRanking = breadRanking.sort(function(a,b) {
            return a.cheese < b.cheese;
        });
        this.determindGoodsKingQueen(cheeseRanking, 'cheese', 'cheeseKing', 'cheeseQueen', P_CHEESE_KING, P_CHEESE_QUEEN);

        // Chicken King / Queen
        let chickenRanking = cheeseRanking.sort(function(a,b) {
            return a.chicken < b.chicken;
        })
        this.determindGoodsKingQueen(chickenRanking, 'chicken', 'chickenKing', 'chickenQueen', P_CHICKEN_KING, P_CHICKEN_QUEEN);

        for (let player of chickenRanking) {
            player.appleScore = player.apple * P_APPLE;
            player.breadScore = player.bread * P_BREAD;
            player.cheeseScore = player.cheese * P_CHEESE;
            player.chickenScore = player.chicken * P_CHICKEN;
            player.totalScore = player.appleScore + player.breadScore + player.cheeseScore + player.chickenScore + player.contraband + player.gold;
            console.log(player.name, "apple", player.appleKing, player.appleQueen, "bread", player.breadKing, player.breadQueen, "cheese", player.cheeseKing, player.cheeseQueen, "chicken", player.chickenKing, player.chickenQueen);
        }

        this.setState({
            players: players
        })

    }

    render() {

        const canAddMorePlayers = this.state.players.length < 5;
        const canCalculateScore = this.state.players.length > 2;
        const isUpdatingPlayer = this.state.updatePlayer !== null;

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

                { 
                    canAddMorePlayers ?       
                        <AddPlayer 
                            addPlayer={this.state.addPlayer} 
                            handlePlayerChange={this.handlePlayerChange}
                            onAddPlayer={this.onAddPlayer}
                        />
                    :
                        null
                }

                <PlayersList 
                    playerList={this.state.players} 
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

    determindGoodsKingQueen(goodsRanking, goods, goodsKing, goodsQueen, GOODS_KING_BONUS, GOODS_QUEEN_BONUS) {
        let kingScore = -1;
        let queenScore = -1;
        let kings = [];
        let queens = [];
        for (let player of goodsRanking) {
            player[goodsKing] = 0;
            player[goodsQueen] = 0;
            if (queenScore < 0 && kingScore >= 0) {
                queenScore = player[goods];
            }
            if (kingScore < 0) {
                kingScore = player[goods];
            }
            if (player[goods] >= kingScore) {
                kings.push(player);
            }
            if (player[goods] < kingScore && kings.length < 2 && player[goods] >= queenScore && queenScore !== -1) {
                queens.push(player);
            }
        }
        // If two+ kings, then they split the KING + QUEEN bonus
        if (kings.length > 1) {
            const bonus = Math.floor((GOODS_KING_BONUS + GOODS_QUEEN_BONUS) / kings.length);
            for (let player of kings) {
                player[goodsKing] = bonus;
            }
        }
        if (kings.length === 1) {
            kings[0][goodsKing] = GOODS_KING_BONUS;
        }
        // Queen(s) split the queen bonus
        const appleBonus = Math.floor((GOODS_QUEEN_BONUS) / queens.length);
        for (let player of queens) {
            player[goodsQueen] = appleBonus;
        }
    }
}

export default Main;


/*
{
                    name: 'Bill',
                    apple: 1,
                    appleScore: 0,
                    bread: 2,
                    breadScore: 0,
                    cheese: 3,
                    cheeseScore: 0,
                    chicken: 4,
                    chickenScore: 0,
                    contraband: 0,
                    gold: 0,
                    totalScore: 0,
                    appleKing: 0,
                    appleQueen: 0,
                    breadKing: 0,
                    breadQueen: 0,
                    cheeseKing: 0,
                    cheeseQueen: 0,
                    chickenKing: 0,
                    chickenQueen: 0
                },
                {
                    name: 'Andrea',
                    apple: 3,
                    appleScore: 0,
                    bread: 3,
                    breadScore: 0,
                    cheese: 4,
                    cheeseScore: 0,
                    chicken: 1,
                    chickenScore: 0,
                    contraband: 0,
                    gold: 0,
                    totalScore: 0,
                    appleKing: 0,
                    appleQueen: 0,
                    breadKing: 0,
                    breadQueen: 0,
                    cheeseKing: 0,
                    cheeseQueen: 0,
                    chickenKing: 0,
                    chickenQueen: 0
                },
                {
                    name: 'Heidi',
                    apple: 3,
                    appleScore: 0,
                    bread: 4,
                    breadScore: 0,
                    cheese: 1,
                    cheeseScore: 0,
                    chicken: 2,
                    chickenScore: 0,
                    contraband: 1,
                    gold: 0,
                    totalScore: 0,
                    appleKing: 0,
                    appleQueen: 0,
                    breadKing: 0,
                    breadQueen: 0,
                    cheeseKing: 0,
                    cheeseQueen: 0,
                    chickenKing: 0,
                    chickenQueen: 0
                },
                {
                    name: 'Kevin',
                    apple: 4,
                    appleScore: 0,
                    bread: 1,
                    breadScore: 0,
                    cheese: 2,
                    cheeseScore: 0,
                    chicken: 3,
                    chickenScore: 0,
                    contraband: 0,
                    gold: 1,
                    totalScore: 0,
                    appleKing: 0,
                    appleQueen: 0,
                    breadKing: 0,
                    breadQueen: 0,
                    cheeseKing: 0,
                    cheeseQueen: 0,
                    chickenKing: 0,
                    chickenQueen: 0
                }
*/


 