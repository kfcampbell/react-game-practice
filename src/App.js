import React from 'react';
import Game from './Game';
import './App.css';

class App extends React.Component {

    // this can't be in a constructor for some reason.
    state = {
        gameId: 0,
        highScore: 0
    };

    resetGame = (wasWin) => {
        var currScore = 0;
        if(wasWin) {
            currScore = this.state.highScore + 1;
        }
        this.setState(prevState => ({
            gameId: prevState.gameId + 1,
            highScore: currScore
        }));
    };


    render() {
        return (
            <div>
                <Game
                    key={this.state.gameId}
                    autoPlay={this.state.gameId > 0}
                    challengeSize={6}
                    challengeRange={[2, 9]}
                    answerSize={4}
                    initialSeconds={10}
                    onPlayAgain={this.resetGame}
                />
                <div className="high-score-counter">High: {this.state.highScore}</div>
            </div>
        );
    }
}

export default App;