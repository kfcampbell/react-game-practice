import React from 'react';

class Number extends React.Component {
    render() {
        return <div className="number">{this.props.value}</div>;
    }
}

export default Number;