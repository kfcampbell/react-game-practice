import React from 'react';
import Game from './Game';

class App extends React.Component {

    // this can't be in a constructor for some reason.
    state = {
        gameId: 0
    };

    resetGame = () => 
        this.setState(prevState => ({
            gameId: prevState.gameId + 1
        }));
    

    render() {
        return (
            <Game
                key={this.state.gameId}
                autoPlay={this.state.gameId > 0}
                challengeSize={6}
                challengeRange={[2, 9]}
                answerSize={4}
                initialSeconds={10}
                onPlayAgain={this.resetGame}
            />
        );
    }
}

export default App;