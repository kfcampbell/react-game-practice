// TARGET SUM - Starting Template
import _ from 'lodash';
import React from 'react';
import Number from './Number';
import Target from './Target';
import Timer from './Timer';
import './App.css';


const randomNumberBetween = (min, max) => Math.floor(Math.random()
    * (max - min + 1)) + min;

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameStatus: 'new', // new, playing, won, lost
            remainingSeconds: this.props.initialSeconds,
            selectedIds: []
        };
    }

    static colors = {
        new: 'lightblue',
        playing: 'deepskyblue',
        won: 'lightgreen',
        lost: 'lightcoral'
    }; 

    challengeNumbers = Array.from({ length: this.props.challengeSize })
        .map(() => randomNumberBetween(...this.props.challengeRange));

    target = _.sampleSize(
        this.challengeNumbers,
        this.props.challengeSize - 2
    ).reduce((acc, curr) => acc + curr, 0)

    render() {
        return (
            <div className="game">
                <div className="help">
                    Pick {this.props.answerSize} numbers that sum to the target in {this.state.remainingSeconds} seconds
                </div>
                <Target value={this.target} />
                <div className="challenge-numbers">
                    {this.challengeNumbers.map((value, index) => 
                        <Number key={index} value={value} />
                    )}
                </div>
                <div className="footer">
                    <Timer initialValue={this.state.remainingSeconds} />
                    <button>Start</button>
                </div>
            </div>
        );
    }
}

export default Game;