import React from 'react';
import './App.css';

class Timer extends React.Component {
    render() {
        return (
            <div className="timer-value">{this.props.initialValue}</div>
        );
    }
}

export default Timer;