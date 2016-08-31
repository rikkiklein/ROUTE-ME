import React, {Component}   from 'react';
import utils                           from '../utils/helper.js'
import { Link }                        from 'react-router';
import '../css/footer.css';
import '../css/search.css';
import Background                      from './Background.js';
import {Map, Marker, InfoWindow}       from 'google-maps-react';
import Directions                      from './Directions.js';

class SavedRoutes extends Component {


  constructor(props){
    super(props);
    this.state = {
      directions: ""
    }
  }

  makeMap(){
    const shortestPath = this.props.shortestPath;
    const latLongs = this.props.locations;
    let startLocation = [];
    let middle_locations = [];
    let endLocation = [];

    let locations = latLongs.map(function(marker, index){
      let name, lat, long;

        if(index === 0){
          name = shortestPath[0];
          lat = marker.lat;
          long = marker.lng;
          startLocation.push({name: name, lat:lat, long:long});
        }

        //it's the middle routes need to map over them
        if(index === 1){
          console.log("MARKER", marker);
          for(let prop in marker){
            let temp = marker[prop];
            for(let geo in temp){
              let midLoc = [];
              lat = temp[geo].lat;
              long = temp[geo].lng;
              name = geo;
              midLoc.push({name:name, lat:lat, long:long});
              middle_locations.push(midLoc);
            }
          }
        }

        if(index === 2){
          name = shortestPath[shortestPath.length-1];
          lat = marker.lat;
          long = marker.lng;
          endLocation.push({name: name, lat:lat, long:long});
      }


    //   return (
    //     <Marker key={index}
    //     name={shortestPath[index]}
    //     position={{lat: latitude, lng: longitude}}/>
    //   )
    })


    let start = startLocation.map(function(loc, index){
      let name, lat, long;
      name = loc.name;
      lat = loc.lat;
      long = loc.long;

      return(
        <Marker key={name}
        name={name}
        position={{lat: lat, lng: long}} />
      )
    })

    let end = endLocation.map(function(loc, index){
      let name, lat, long;
      name = loc.name;
      lat = loc.lat;
      long = loc.long;

      return(
        <Marker key={name}
        name={name}
        position={{lat: lat, lng: long}} />
      )
    })

    let middle = middle_locations.map(function(loc, index){
      let middleMarker = [];
      let m = loc.map(function(a, b){
        let name, lat, long;
        name = a.name;
        lat = a.lat;
        long = a.long;
        console.log(name, lat, long);
        return(
          <Marker key={b}
          name={name}
          position={{lat: lat, lng: long}} />
        )
      })

      middleMarker.push(m);

      return(
        middleMarker
      )

    })
    let startLat = "";
    let startLong = "";

    // console.log('#',startLat, startLong);
    console.log('#',this.props.locations);
    console.log('#',this.props.locations[0]);
    let lox = this.props.locations[0];
    console.log("LOX", lox);
    for(let l in lox){
      console.log("$", lox[l]);
      if(l === "lat"){
        startLat = lox[l];
      }
      if(l === "lng"){
        startLong = lox[l]
      }
    }

    console.log("start lat finally", startLat);
    console.log("start long finally", startLong);

    return(
      <Map className="mapStyles2" center={{lat: startLat, lng: startLong}} zoom={9}

         style={{border: '10px solid red', position: 'static', width: '100%', height: '100%'}}  google={window.google}>
        {start}
        {middle}
        {end}
      </Map>
    )
  }

  viewDirections(){
    let data = {
      route: this.props.shortestPath
    }

    utils.getDirections(data).then((res) => {
      console.log("res", res.data.routes[0].legs);
      this.setState({directions: res.data.routes[0].legs})
    })
  }

  render() {
    const shortestPath = this.props.shortestPath;
    const length = shortestPath.length;
    const directions = this.state.directions;
    const dLength = directions.length;
    return (
      <div>
        {length > 0 ?
          <button onClick={(event)=>this.viewDirections()}>View Directions</button> : ""}

        {dLength > 0 ? <Directions directions={directions} /> : "" }

        {length > 0 ? this.makeMap() : ""}

      </div>
    );
  }

}

export default SavedRoutes;

// style={{width: "40%"}}
// //   container: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%'
//   },
//   map: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     bottom: 0,
//     top: 0
//   }
//
// Map.defaultProps = {
//   zoom: 14,
//   initialCenter: {
//     lat: 37.774929,
//     lng: -122.419416
//   },
//   center: {},
//   centerAroundCurrentLocation: false,
//   style: {},
//   containerStyle: {},
//   visible: true
// };
