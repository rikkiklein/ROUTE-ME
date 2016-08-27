import React, { Component } from 'react';
import utils from '../utils/helper.js'
import AdditionalLocation from "./AdditionalLocation.js"

class Search extends Component {

  constructor(props){
    super(props);
    this.state = {
      start: "",
      end: "",
      mid_locations: []
    }
  }

  getDistance(event){
    event.preventDefault();
    let start = this.state.start;
    let end = this.state.end;
    let midLocations = []
    //look at the refs and get each of the mid-locations values
    for(let prop in this.refs){
      midLocations.push(this.refs[prop].state.location);
    }

    console.log("start is", start, "end is", end);
    console.log("mid locations are: ", midLocations);
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


// editMidLocation(id, value){
//   console.log(value);
//   console.log(id);
//   let mid_location_values = this.state.mid_location_values;
//   //loop through the children and edit that one
//   for(let i = 0; i < mid_location_values.length; i++){
//         for(prop in mid_location_values[i]){
//           if(prop =)
//         }
//   }
//
//   //let newMidLoc = []
//   //newMidLoc[id] = value;
//   //let existing_mid_locs = this.state.mid_location_values;
//   //existing_mid_locs.push(newMidLoc);
//   //console.log(existing_mid_locs);
//   // this.setState(mid_loc_values: existing_mid_locs);
//   // console.log(this.state.mid_loc_values);
// }

addMidLocation(){
  let newMidLocation = `mid-loc-${this.state.mid_locations.length}`;
  let updatedLocations = this.state.mid_locations;
  updatedLocations.push(newMidLocation)
  this.setState({mid_locations: updatedLocations});
}

removeMidLocation(index){
  let mid_locations = this.state.mid_locations;
  mid_locations.splice(index, 1);
  this.setState({mid_locations: mid_locations})
}

  render() {
    return (
      <div>
        <form onSubmit={(event)=>this.getDistance(event)}>
          <input type="text" onChange={this.changeStartLoc.bind(this)}></input>
          {this.state.mid_locations.map((mid_loc, index) =>
            <div key={mid_loc}>
             <AdditionalLocation ref={mid_loc} locKey={mid_loc} key={mid_loc} />
             <button type="button" onClick={(event) => this.removeMidLocation(index)}>Remove</button>
            </div>
          )}
          <input type="text" onChange={this.changeEndLoc.bind(this)}></input>
        </form>
        <button onClick={(event) => this.addMidLocation()}>Add Another Waypoint</button>
        <button onClick={(event) => this.getDistance(event)}>Calculate Distance</button>
      </div>
    );
  }
}

export default Search;
