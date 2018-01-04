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
    };

    componentDidMount() {
        if(this.props.autoPlay) {
            console.log('autoplay on');
            this.startGame();
        }
        else {
            console.log('autoplay off');
        }
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
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
    ).reduce((acc, curr) => acc + curr, 0);

    isNumberAvailable = (numberIndex) =>
        this.state.selectedIds.indexOf(numberIndex) === -1;

    startGame = () => {
        this.setState({ gameStatus: 'playing' }, () => {
            this.intervalId = setInterval(() => {
                this.setState((prevState) => {
                    const newRemainingSeconds = prevState.remainingSeconds - 1;
                    if (newRemainingSeconds < 0) {
                        clearInterval(this.intervalId);
                        return { gameStatus: 'lost', remainngSeconds: 0 };
                    }
                    return { remainingSeconds: newRemainingSeconds };
                });
            }, 1000);
        });
    };

    selectNumber = (numberIndex) => {
        if (this.state.gameStatus !== 'playing') {
            return;
        }
        this.setState((prevState) => ({
            selectedIds: [...prevState.selectedIds, numberIndex],
            gameStatus: this.calcGameStatus([
                ...prevState.selectedIds,
                numberIndex
            ]),
        }),
            () => {
                if (this.state.gameStatus !== 'playing') {
                    clearInterval(this.intervalId);
                }
            }
        );
    };

    calcGameStatus = (selectedIds) => {
        const sumSelected = selectedIds.reduce(
            (acc, curr) => acc + this.challengeNumbers[curr],
            0
        );
        if (sumSelected < this.target) {
            return 'playing';
        }
        return sumSelected === this.target ? 'won' : 'lost';
    };

    render() {
        return (
            <div className="game">
                <div className="help">
                    Pick {this.props.answerSize} numbers (or fewer) that sum to the target in {this.state.remainingSeconds} seconds
                </div>
                <Target
                    backgroundColor={Game.colors[this.state.gameStatus]}
                    value={this.state.gameStatus === 'new' ? '?' : this.target} />
                <div className="challenge-numbers">
                    {this.challengeNumbers.map((value, index) =>
                        <Number
                            clickable={this.isNumberAvailable(index)}
                            id={index}
                            key={index}
                            value={this.state.gameStatus === 'new' ? '?' : value}
                            onClick={this.selectNumber} />
                    )}
                </div>
                <div className="footer">
                    {this.state.gameStatus === 'new' ? (
                        <button onClick={this.startGame}>Start</button>
                    ) : (
                            <Timer initialValue={this.state.remainingSeconds} />
                        )}
                    {['won', 'lost'].includes(this.state.gameStatus) && (
                        <button onClick={this.props.onPlayAgain}>Play Again</button>
                    )}
                </div>
            </div>
        );
    }
}

export default Game;