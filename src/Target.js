import React from 'react';

class Target extends React.Component {
    render() {
        return (
          <div className="target">{this.props.value}</div>
        );
    }
}

export default Target;