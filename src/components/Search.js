import React, { Component } from 'react';
import utils from '../utils/helper.js'
import AdditionalLocation from "./AdditionalLocation.js"

class Search extends Component {

  constructor(props){
    super(props);
    this.state = {
      start: "",
      end: ""
    }
  }

  getDistance(event){
    event.preventDefault();
    let start = this.state.start;
    let end = this.state.end;

    console.log("start is", start, "end is", end);
    let data = {
      start: start,
      end: end
    }
    utils.getDistanceMatrix(data).then((res) => {
      console.log(res.data);
  })
}

changeStartLoc(event){
  this.setState({start: event.target.value })
}

changeEndLoc(event){
  this.setState({end: event.target.value })
}

  render() {
    return (
      <div>
        <form onSubmit={(event)=>this.getDistance(event)}>
          <input type="text" onChange={this.changeStartLoc.bind(this)}></input>
          <AdditionalLocation location={this.getLocationState}/>
          <input type="text" onChange={this.changeEndLoc.bind(this)}></input>
        </form>
        <button onClick={this.getDistance.bind(this)}>click me</button>
      </div>
    );
  }
}

export default Search;
