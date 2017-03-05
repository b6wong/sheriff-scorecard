import React, { Component } from 'react';

class PlayersList extends Component {

    constructor(props) {
        super(props);
        this.onSelectPlayer = this.props.onSelectPlayer.bind(this);
    }

    render() {

        const playerList = this.props.playerList.map((obj, idx) => {
            return (
                <tr 
                    onClick={() => this.onSelectPlayer(obj)} 
                    key={idx}
                >
                    <td>{obj.name}</td> 
                    <td>{obj.apple} ({obj.appleScore} {obj.appleKing > 0 ? <span>+ {obj.appleKing}</span> : null }{obj.appleQueen > 0 ? <span>+ {obj.appleQueen}</span> : null })</td>
                    <td>{obj.bread} ({obj.breadScore} {obj.breadKing > 0 ? <span>+ {obj.breadKing}</span> : null }{obj.breadQueen > 0 ? <span>+ {obj.breadQueen}</span> : null })</td>
                    <td>{obj.cheese} ({obj.cheeseScore} {obj.cheeseKing > 0 ? <span>+ {obj.cheeseKing}</span> : null }{obj.cheeseQueen > 0 ? <span>+ {obj.cheeseQueen}</span> : null })</td>
                    <td>{obj.chicken} ({obj.chickenScore} {obj.chickenKing > 0 ? <span>+ {obj.chickenKing}</span> : null }{obj.chickenQueen > 0 ? <span>+ {obj.chickenQueen}</span> : null })</td>
                    <td>{obj.contraband}</td>
                    <td>{obj.gold}</td>
                    <td className="success">{obj.totalScore}</td>                
                </tr>
            );
        })

        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Apple</th>
                        <th>Bread</th>
                        <th>Cheese</th>
                        <th>Chicken</th>
                        <th>Contraband</th>
                        <th>Gold</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {playerList}
                </tbody>
            </table>
        );
    }


}

export default PlayersList;
