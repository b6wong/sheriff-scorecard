import React, { Component } from 'react';

class AddPlayer extends Component {

    constructor(props) {
        super(props);
        this.handlePlayerChange = this.props.handlePlayerChange.bind(this);
        this.onAddPlayer = this.props.onAddPlayer.bind(this);
    }

    render() {

        return (
            <div>
                <input 
                    type="text" 
                    value={this.props.addPlayer} 
                    onChange={this.handlePlayerChange} 
                />
                <button 
                    onClick={this.onAddPlayer} 
                    disabled={this.props.addPlayer === ''}>
                        Add Player
                </button>
            </div>
        );

    }

}

export default AddPlayer;
