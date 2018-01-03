import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './Game';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Game challengeSize={6} challengeRange={[2, 9]} 
                initialSeconds={8} answerSize={4} />,
                document.getElementById('root'));
registerServiceWorker();
