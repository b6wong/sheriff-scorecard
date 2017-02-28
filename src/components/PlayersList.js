import React, { Component } from 'react';

class PlayersList extends Component {

    constructor(props) {
        super(props);
        this.onSelectPlayer = this.props.onSelectPlayer.bind(this);
    }

    render() {

        const playerList = this.props.playerList.map((obj, idx) => {
            return (<li onClick={() => this.onSelectPlayer(obj)} key={idx}>{obj.name}, {obj.apple}, {obj.bread}, {obj.cheese}, {obj.chicken}, {obj.contraband}, {obj.gold}, {obj.totalScore}</li>);
        })

        return (
            <ul>
                {playerList}
            </ul>
        );
    }


}

export default PlayersList;
