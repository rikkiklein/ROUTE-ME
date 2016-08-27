import React, { Component } from 'react';
import utils from '../utils/helper.js'
import AdditionalLocation from "./AdditionalLocation.js"

class Search extends Component {

  constructor(props){
    super(props);
    this.state = {
      start: "",
      end: "",
      mid_locations: ['mid-loc-0']
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
  //   utils.getDistanceMatrix(data).then((res) => {
  //     console.log(res.data);
  // })
}

changeStartLoc(event){
  this.setState({start: event.target.value })
}

changeEndLoc(event){
  this.setState({end: event.target.value })
}

addMidLocation(){
  let newMidLocation = `mid-loc-${this.state.mid_locations.length}`;
  let updatedLocations = this.state.mid_locations;
  updatedLocations.push(newMidLocation)
  this.setState({mid_locations: updatedLocations});
}

  render() {

    return (
      <div>
        <form onSubmit={(event)=>this.getDistance(event)}>
          <input type="text" onChange={this.changeStartLoc.bind(this)}></input>
          {this.state.mid_locations.map(mid_loc => <AdditionalLocation key={mid_loc}/>)}
          <input type="text" onChange={this.changeEndLoc.bind(this)}></input>
        </form>
        <button onClick={this.addMidLocation.bind(this)}>Add Another Waypoint</button>
        <button onClick={this.getDistance.bind(this)}>Calculate Distance</button>
      </div>
    );
  }
}

export default Search;
