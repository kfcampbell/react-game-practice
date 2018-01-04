import React from 'react';

class Target extends React.Component {
    render() {
        return (
          <div 
          className="target"
          style={{ backgroundColor: this.props.backgroundColor }}
          >{this.props.value}</div>
        );
    }
}

export default Target;