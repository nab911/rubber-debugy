import React, { Component } from 'react';
import '../App.css';

class Duck extends Component {
  render() {
    return (
      <div className="Duck">
        <img alt="Rubber Duck" width="400" src="/img/rubber-duck-glasses-512.png" />
      </div>
    );
  }
}

export default Duck;