import React, { Component } from 'react';
import './App.css';
import utils from './utils/helper.js'

class App extends Component {

  getDistance(){
    utils.getDistanceMatrix().then((res) => {
      console.log(res.data);
  })
}

  render() {
    return (
      <div className="App">
        <button onClick={this.getDistance.bind(this)}>click me</button>
      </div>
    );
  }
}

export default App;
