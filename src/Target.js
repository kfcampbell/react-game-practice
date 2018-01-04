import React from 'react';

class Target extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
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