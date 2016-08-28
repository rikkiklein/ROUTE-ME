import React, { Component }   from 'react';
import utils                  from '../utils/helper.js'
import AdditionalLocation     from "./AdditionalLocation.js"
import NavBar                 from './NavBar.js';
import Footer                 from './Footer.js';
import Header                 from './Header.js';
import '../css/search.css';

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

// <div dangerouslySetInnerHTML ={{__html: 'Head \u003cb\u003esoutheast\u003c/b\u003e on \u003cb\u003eW 16th St\u003c/b\u003e toward \u003cb\u003eNinth Ave\u003c/b\u003e'}}/>

addMidLocation(){
  let newMidLocation = `mid-loc-${this.state.mid_locations.length}`;
  let updatedLocations = this.state.mid_locations;
  updatedLocations.push(newMidLocation)
  this.setState({mid_locations: updatedLocations});

}

removeMidLocation(index){
  let mid_locations = this.state.mid_locations;
  //remove mid-location
  mid_locations.splice(index, 1);
  let updatedMidLocations = []
  //adjust the new ids
  for(let i = 0; i < mid_locations.length; i++){
      updatedMidLocations.push("mid-loc-"+i);
  }
  this.setState({mid_locations: updatedMidLocations})
}

  render() {
    return (
      <div>
        <div>
          <Header/>
          <NavBar/>
          <div className="middle-outer-outer-search">
            <div className="middle-outer-search">
              <div className="middle-search">
                <div className="header">
                  <h5>Fill out your start, midddle and end locations!</h5>
                </div>



                <div className="mid-form">
                  <form onSubmit={(event)=>this.getDistance(event)}>
                    <input className="input" type="text" onChange={this.changeStartLoc.bind(this)} placeholder="start location..."></input>
                    {this.state.mid_locations.map((mid_loc, index) =>
                      <div key={mid_loc}>
                        <AdditionalLocation ref={mid_loc} locKey={mid_loc} key={mid_loc} />
                        <button className="button-del" type="button" onClick={(event) => this.removeMidLocation(index)}>X</button>
                      </div>
                    )}
                    <input className="input" type="text" onChange={this.changeEndLoc.bind(this)} placeholder="end location..."></input>
                  </form>
                </div>

                <div className="but-area">
                  <button className="button" onClick={(event) => this.addMidLocation()}>Add Waypoint</button>
                  <button className="button" onClick={(event) => this.getDistance(event)}>Calculate Distance</button>
                </div>

              </div>
            </div>
          </div>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default Search;
