import React, {Component}   from 'react';
import utils                           from '../utils/helper.js'
import { Link }                        from 'react-router';
import '../css/footer.css';
import '../css/search.css';
import Background                      from './Background.js';

import {Map, Marker, InfoWindow}       from 'google-maps-react';


class SavedRoutes extends Component {


  constructor(props){
    super(props);
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



    return(
      <Map style={{width: '100%', height: '75%'}} google={window.google}>
        {start}
        {middle}
        {end}
      </Map>
    )
  }

  render() {
    const shortestPath = this.props.shortestPath;
    const length = shortestPath.length;

    return (
      <div>
        {shortestPath.map((item, index)=>{
          return(
            <div key={index}>{item}</div>
          )
        })}
            {length > 0 ? this.makeMap() : ""}
      </div>
    );
  }

}

export default SavedRoutes;
