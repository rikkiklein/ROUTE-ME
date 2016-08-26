import React, { Component } from 'react';
import utils from '../utils/helper.js'

class Distance extends Component {

  getDistance(){
    utils.getDistanceMatrix().then((res) => {
      console.log(res.data);
  })
}

  render() {
    return (
      <div>
        <button onClick={this.getDistance.bind(this)}>click me</button>
      </div>
    );
  }
}

export default Distance;
