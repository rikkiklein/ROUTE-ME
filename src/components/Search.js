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
import DisplayMap             from './DisplayMap.js';
import DisplayDirections      from './DisplayDirections.js';

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

      let latLongs = [];
      latLongs.push(this.state.start_lat_long);
      latLongs.push(this.state.mid_locationsLatLong);
      latLongs.push(this.state.end_lat_long);
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
          originArray.push(middleMatrix[i]);
        }
      } //end for loop

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

    this.setState({
      shortest_route: shortestPath
    })
  }

  makeFullMatrix(bm, mm, me){
    let fullMatrix = [];
    fullMatrix.push(bm);
    fullMatrix.push(mm);
    fullMatrix.push(me);
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
            arrayToPush[index].distance = data[prop][i].elements[j].distance.value;
            index++;
          }
        }

        for(let i = 0; i < arrayToPush.length; i++){
          if(arrayToPush[i].distance === 0){
            arrayToPush.splice(i, 1);
          }
        }
      }
    }
    return arrayToPush;
  } //end of function

  makeMatrixME(data){
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

    return arrayToPush;
  } //end of function

  changeStartLoc(input){
    this.setState({start: input.label, start_lat_long: input.location })
  }

  changeEndLoc(input){
    this.setState({end: input.label, end_lat_long: input.location })
  }

  addMidLocation(){
      if(this.state.mid_locations.length < 10){
        let newMidLocation = `mid-loc-${this.state.mid_locations.length}`;
        let updatedLocations = this.state.mid_locations;
        updatedLocations.push(newMidLocation)
        this.setState({mid_locations: updatedLocations});
      }

      if(this.state.mid_locations.length >= 10){
        let addButton = document.getElementById('add-way-point');
        addButton.classList.add("disabled");
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
      <div className="search-background">
        <div>
          <NavBar/>
          <div className="search-fade">
            <div className="flex-title">
              <h3>Begin Calculating your route! </h3>
              <h4>Enter your starting, middle and ending locations, then press <span className="calcDist">calculate distance!</span></h4>
            </div>
            <div className="flex-search">
              <div className="left-search">
                <div className="but-area">
                  <button className="button-add search-fade-in three" id="add-way-point" onClick={(event) => this.addMidLocation()}>Add Waypoint</button>

                  <button className="button-add search-fade-in four" onClick={(event) => this.getDistance(event)}>Calculate Distance</button>
                </div>

                <form onSubmit={(event)=>this.getDistance(event)}>
                  <GeoSuggest className="input beginning search-fade" onSuggestSelect={this.changeStartLoc.bind(this)} placeholder="start location..."/>
                  {this.state.mid_locations.map((mid_loc, index) =>
                    <div id="additional" key={mid_loc}>
                      <AdditionalLocation id="addLoc" ref={mid_loc} locKey={mid_loc} key={mid_loc} />
                      <button className="button-del" type="button" onClick={(event) => this.removeMidLocation(index)}>X</button>
                    </div>
                  )}
                  <GeoSuggest className="input ending search-fade" onSuggestSelect={this.changeEndLoc.bind(this)} placeholder="end location..." />
                </form>

                <DisplayDirections shortestPath={this.state.shortest_route} locations={this.state.latLongs}/>

              <ShortestPath shortestPath={this.state.shortest_route}/>
              </div>

              <div className="right-search">
                <DisplayMap shortestPath={this.state.shortest_route} locations={this.state.latLongs}/>
              </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default Search;
