import React, { Component }   from 'react';
import utils                  from '../utils/helper.js'
import GeoSuggest             from 'react-geosuggest';
import AdditionalLocation     from "./AdditionalLocation.js"
import NavBar                 from './NavBar.js';
import Footer                 from './Footer.js';
import Header                 from './Header.js';
import SavedRoutes            from './SavedRoutes.js';
import { browserHistory }     from 'react-router';
import ShortestPath           from './ShortestPath.js';
import '../css/search.css';
import '../css/suggest.css';

class Search extends Component {

  constructor(props){
    super(props);
    this.state = {
      start: "",
      end: "",
      mid_locations: [],
      gm_locations: [],
      shortest_route: [],
      start_lat_long: "",
      end_lat_long: "",
      mid_locationsLatLong: [],
      latLongs: []
    }
  }

  getDistance(event){
    event.preventDefault();
    let start = this.state.start;
    let end = this.state.end;
    let midLocations = []
    let latLong = []
    for(let prop in this.refs){
      midLocations.push(this.refs[prop].state.location);
      let key = this.refs[prop].state.location;
      latLong.push({[key]: this.refs[prop].state.latlong })
    }

    this.setState({mid_locationsLatLong: latLong});

    let data = {
      start: start,
      mid_locations: midLocations,
      end: end
    }

    utils.getDistanceMatrix(data).then((res) => {
      let bm = this.makeMatrixBM(res.data.BM);
      let mm = this.makeMatrixMM(res.data.MM);
      let gmMid_locations = [];

      for(let i = 0; i < mm.length; i++){
        if(!gmMid_locations.includes(mm[i].origin)){
          gmMid_locations.push(mm[i].origin);
        }
      }

      this.setState({gm_locations: gmMid_locations});
      let me = this.makeMatrixME(res.data.ME);
      this.makeFullMatrix(bm, mm, me);

      //get the lat and long
      let latLongs = [];

      latLongs.push(this.state.start_lat_long);
      let midLocs = this.state.mid_locationsLatLong;
      console.log("MIDDD LOCCC", midLocs);
      console.log("SHORTEST PATH", this.state.shortest_route);
      //latLongs.push(this.state.mid_locationsLatLong);
      latLongs.push(this.state.end_lat_long);

      console.log("LAT LONGGGG", latLongs);
      this.setState({latLongs: latLongs})
    })
  }

  solveTSP(matrix){
    // we are planning to solve the TSP by nearest neighbor
    //https://en.wikipedia.org/wiki/Nearest_neighbor_search

    let start = this.state.start;
    let shortestPath = [start]

    let min = matrix[0][0].distance;
    let minName = matrix[0][0].destination;

    for(let i = 1; i < matrix[0].length; i++){
      if(matrix[0][i].distance < min){
        min = matrix[0][i].distance;
        minName = matrix[0][i].destination;
      }
    }
    shortestPath.push(minName)

    let minOrigin = minName;
    let visited = 1;
    let midLocLength = this.state.mid_locations.length;
    let middleMatrix = matrix[1];

    middleMatrix.sort((a, b) => {
      return a.origin > b.origin;
    });

    while(visited !== midLocLength){
      let originArray = [];
      let currentVisitedNode = false;
      let currentMinName = minName;

      for(let i = 0; i < middleMatrix.length; i++){
        if(middleMatrix[i].origin === currentMinName){
          console.log("they are equal!");
          originArray.push(middleMatrix[i]);
        }
      }

      let originMinDistance = originArray[0].distance;
      let originMinName     = originArray[0].destination;

      for(let i = 1; i < originArray.length; i++){
        if(originArray[i].distance < originMinDistance){
          originMinDistance = originArray[i].distance;
          originMinName = originArray[i].destination;
        }
      }

      shortestPath.push(originMinName);
      minName = originMinName;
      visited++;
    }

    let gm_locations =  this.state.gm_locations;

    for(let i = 1; i < shortestPath.length; i++){
      if(gm_locations.includes(shortestPath[i])){
        let index = gm_locations.indexOf(shortestPath[i]);
        gm_locations.splice(index, 1);
      }
    }

    if(gm_locations.length !== 0){
        shortestPath[shortestPath.length-1] = gm_locations.pop();
    }
    shortestPath.push(this.state.end);

    console.log("WE ARE DONE", shortestPath);

    this.setState({
      shortest_route: shortestPath
    })
  }

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
    let arrayToPush = [];
    for(let i = 0; i < data.destination_addresses.length; i++){
      for(let j = 0; j < data.origin_addresses.length;j++)
        arrayToPush.push({origin: "", destination: "", distance: 0});
    }

    for(let prop in data){
      if(prop === "destination_addresses"){
        let len = data[prop].length;
        let count = 0;
        let limit = len * len;
          for(let d = 0; d < limit; d+=len){
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
        let limit = len * len;
          for(let d = 0; d < limit; d+=len){
            let upperBound = d + len;
            count++;
            for(let k = d; k < upperBound; k++){
              arrayToPush[k].origin = data[prop][count];
            }
          }
      }

      if(prop === "rows"){
        let len = data[prop].length;
        let index = 0;

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
    // let halfLength = Math.floor(arrayToPush.length / 2);
    // let upperHalf = arrayToPush.splice(0, halfLength);

    // console.log("array to push in mm", arrayToPush);
    // console.log("half of the array", upperHalf);
    return arrayToPush;
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
    this.setState({start: input.label, start_lat_long: input.location })
  }

  changeEndLoc(input){
    this.setState({end: input.label, end_lat_long: input.location })
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
    mid_locations.splice(index, 1);
    let updatedMidLocations = []
    for(let i = 0; i < mid_locations.length; i++){
        updatedMidLocations.push("mid-loc-"+i);
    }
    this.setState({mid_locations: updatedMidLocations})
  }

  render() {
    console.log("this.state.LL", this.state.latLongs);
    console.log("this.state.sp", this.state.shortest_route);
    return (
      <div>
        <div>
          <Header/>
          <NavBar/>
          <div className="search-fade">
            <div className="flex-search">
              <div className="left-search">
                <form onSubmit={(event)=>this.getDistance(event)}>
                  <GeoSuggest className="input search-fade" onSuggestSelect={this.changeStartLoc.bind(this)} placeholder="start location..."/>
                  {this.state.mid_locations.map((mid_loc, index) =>
                    <div id="additional" key={mid_loc}>
                      <AdditionalLocation ref={mid_loc} locKey={mid_loc} key={mid_loc} />
                      <button className="button-del" type="button" onClick={(event) => this.removeMidLocation(index)}>X</button>
                    </div>
                  )}
                  <GeoSuggest className="input search-fade" onSuggestSelect={this.changeEndLoc.bind(this)} placeholder="end location..." />
                  <div className="but-area">
                    <button className="button-add search-fade-in three" onClick={(event) => this.addMidLocation()}>Add Waypoint</button>
                    <button className="button-add search-fade-in four" onClick={(event) => this.getDistance(event)}>Calculate Distance</button>
                    </div>
                </form>
              </div>

              <div className="right-search">
                <SavedRoutes shortestPath={this.state.shortest_route} locations={this.state.latLongs}/>
              </div>
            </div>

            <div className="shortest">
              <ShortestPath shortestPath={this.state.shortest_route} locations={this.state.latLongs}/>
            </div>
          <Footer/>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;

// <SavedRoutes rt={this.state.shortest_route}/>
