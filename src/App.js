import React from 'react';
import Game from './Game';

class App extends React.Component {
    
    // this can't be in a constructor for some reason.
    state = {
        gameId: 1
    };

    resetGame = () => {
        console.log('game reset');
        this.setState((prevState) => {
            gameId: prevState.gameId + 1
        });
    };

    render() {
        return (
            <Game
                key={this.state.gameId}
                autoPlay={this.state.gameId > 1}
                challengeSize={6}
                challengeRange={[2, 9]}
                initialSeconds={10}
                onPlayAgain={this.resetGame}
            />
        );
    }
}

export default App;