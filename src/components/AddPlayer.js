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
                <h3>Add Player</h3>
                <p>Add three to five players</p>
                <div className="row">
                    <div className="col-xs-8">
                        <input 
                            className="form-control"
                            type="text" 
                            value={this.props.addPlayer} 
                            onChange={this.handlePlayerChange} 
                        />    
                    </div>
                    <div className="col-xs-4">
                        <button 
                            className="btn btn-primary"
                            onClick={this.onAddPlayer} 
                            disabled={this.props.addPlayer === ''}>
                                Add Player
                        </button>
                    </div>
                </div>
            </div>
        );

    }

}

export default AddPlayer;
