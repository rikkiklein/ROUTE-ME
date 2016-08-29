import React, { Component }   from 'react';
import utils                  from '../utils/helper.js'
import GeoSuggest from 'react-geosuggest';
import AdditionalLocation     from "./AdditionalLocation.js"
import NavBar                 from './NavBar.js';
import Footer                 from './Footer.js';
import Header                 from './Header.js';
import '../css/search.css';
import '../css/suggest.css';

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
      mid_locations: midLocations,
      end: end
    }

    utils.getDistanceMatrix(data).then((res) => {
      console.log(res.data);
      let bm = this.makeMatrixBM(res.data.BM);
      let mm = this.makeMatrixMM(res.data.MM);
      let me = this.makeMatrixME(res.data.ME);

      this.makeFullMatrix(bm, mm, me);
    })

  }

  solveTSP(matrix){
    // we are planning to solve the TSP by nearest neighbor
    //https://en.wikipedia.org/wiki/Nearest_neighbor_search

    let start = this.state.start;
    let shortestPath = [start]

    //get the shortest path from the starting point and to any of the middle locations
    let min = matrix[0][0].distance;
    let minName = matrix[0][0].destination;

    //go through each B-M place and figure out the shortest initial path
    for(let i = 1; i < matrix[0].length; i++){
      if(matrix[0][i].distance < min){
        min = matrix[0][i].distance;
        minName = matrix[0][i].destination;
      }
    }
    shortestPath.push(minName)
    console.log("shortest path", shortestPath);

  }
å
  makeFullMatrix(bm, mm, me){
    let fullMatrix = [];

    fullMatrix.push(bm);
    fullMatrix.push(mm);
    fullMatrix.push(me);
    // // add bm
    // for(let i = 0; i < bm.length; i++){
    //   fullMatrix.push(bm[i]);
    // }
    //
    // //add mm
    // for(let i = 0; i < mm.length; i++){
    //   fullMatrix.push(mm[i]);
    // }
    // //add me
    // for(let i = 0; i < me.length; i++){
    //   fullMatrix.push(me[i]);
    // }

    console.log("full matrix", fullMatrix);

    //solve TSP
    this.solveTSP(fullMatrix);

  }

makeMatrixBM(data){
  let arrayToPush = [];

  for(let i = 0; i < data.destination_addresses.length; i++){
    arrayToPush.push({origin: "", destination: "", distance: 0});
  } //end for loop

  for(let prop in data){
    if(prop==="destination_addresses"){
      for(let i = 0; i < data[prop].length;i++){
        arrayToPush[i].destination = data[prop][i];
      }
    } //end if

    if(prop==="origin_addresses"){
      for(let i = 0; i <arrayToPush.length;i++){
        arrayToPush[i].origin = data[prop][0];
      }
    } //end if

    if(prop==="rows"){
      let elements = data[prop][0].elements;
      for(let i = 0; i < elements.length;i++){
        arrayToPush[i].distance = elements[i].distance.value;
      }
    }//end if
  }//end of for let prop

  console.log("ARRAY TO PUSH: ", arrayToPush);
  return arrayToPush;
} //end of function

makeMatrixMM(data){
  console.log("mm is", data);
  let arrayToPush = [];
  for(let i = 0; i < data.destination_addresses.length; i++){
    for(let j = 0; j < data.origin_addresses.length;j++)
      arrayToPush.push({origin: "", destination: "", distance: 0});
  }

  for(let prop in data){
    if(prop === "destination_addresses"){
      let len = data[prop].length;
      let count = 0;
      console.log("len is", len);
      let limit = len * len;
        for(let d = 0; d < limit; d+=len){
          console.log("d is", d);
          let upperBound = d + len;
          count = 0;
          for(let k = d; k < upperBound; k++){
            arrayToPush[k].destination = data[prop][count];
            count++;
          }
        }
    }
    if(prop === "origin_addresses"){
      let len = data[prop].length;
      let count = -1;
      console.log("len is", len);
      let limit = len * len;
        for(let d = 0; d < limit; d+=len){
          console.log("d is", d);
          let upperBound = d + len;
          count++;
          for(let k = d; k < upperBound; k++){
            arrayToPush[k].origin = data[prop][count];
          }
        }
    }

    if(prop === "rows"){
      console.log("rows prop", data[prop]);
      let len = data[prop].length;
      let index = 0;
      // let count = -1;
      console.log("len is", len);
      //looping thru outer rows
      for(let i = 0; i < len; i++){
        //loop thru elements
        for(let j = 0; j<data[prop][i].elements.length; j++){
          console.log("$$$$",j, data[prop][i].elements[j].distance.value);
          arrayToPush[index].distance = data[prop][i].elements[j].distance.value;
          index++;
        }
      }

      //edit the MM matrix for extra data
      for(let i = 0; i < arrayToPush.length; i++){
      // prune the rows that have distance equal to 0
        if(arrayToPush[i].distance === 0){
          arrayToPush.splice(i, 1);
        }
      }

    }

  }
  //only need half of the results because A-B and B-A are the same thing, we don't need both since they are associative
  let halfLength = Math.ceil(arrayToPush.length / 2)
  let upperHalf = arrayToPush.splice(0, halfLength);

  console.log("array to push in mm", arrayToPush);
  console.log("half of the array", upperHalf);
  return upperHalf;
} //end of function

makeMatrixME(data){
  console.log(data);
  let arrayToPush = [];
  for(let i = 0; i < data.origin_addresses.length; i++){
    arrayToPush.push({origin: "", destination: "", distance: 0});
  }
  for(let prop in data){
    if(prop === "destination_addresses"){
      for(let i = 0; i < arrayToPush.length;i++){
        arrayToPush[i].destination = data[prop][0];
      }
    }
    if(prop === "origin_addresses"){
      for(let i = 0; i < data[prop].length;i++){
        arrayToPush[i].origin = data[prop][i];
      }
    }
    if(prop === "rows"){
      let rows = data[prop];
      for(let i = 0; i < rows.length;i++){
         arrayToPush[i].distance = rows[i].elements[0].distance.value;
      }
    }
  }

  console.log("atP", arrayToPush);
  return arrayToPush;
} //end of function

changeStartLoc(input){
  this.setState({start: input.label })
}

changeEndLoc(input){
  this.setState({end: input.label })
}
// <div dangerouslySetInnerHTML ={{__html: 'Head \u003cb\u003esoutheast\u003c/b\u003e on \u003cb\u003eW 16th St\u003c/b\u003e toward \u003cb\u003eNinth Ave\u003c/b\u003e'}}/>

addMidLocation(){
    //limit the mid locations since solving TSP get's longer the more points you have
    if(this.state.mid_locations.length < 5){
      let newMidLocation = `mid-loc-${this.state.mid_locations.length}`;
      let updatedLocations = this.state.mid_locations;
      updatedLocations.push(newMidLocation)
      this.setState({mid_locations: updatedLocations});
    }

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
                  <h5>Fill out your start, middle and end locations!</h5>
                </div>




                <div className="mid-form">
                  <form onSubmit={(event)=>this.getDistance(event)}>
                    <GeoSuggest className="input" onSuggestSelect={this.changeStartLoc.bind(this)} placeholder="start location..."/>
                    {this.state.mid_locations.map((mid_loc, index) =>
                      <div id="additional" key={mid_loc}>
                        <AdditionalLocation ref={mid_loc} locKey={mid_loc} key={mid_loc} />
                        <button className="button-del" type="button" onClick={(event) => this.removeMidLocation(index)}>X</button>
                      </div>
                    )}
                    <GeoSuggest className="input" onSuggestSelect={this.changeEndLoc.bind(this)} placeholder="end location..." />
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
