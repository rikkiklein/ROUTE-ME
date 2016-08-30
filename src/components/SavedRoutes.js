import React, {Component}              from 'react';
import utils                           from '../utils/helper.js'
import { Link }                        from 'react-router';
import {Map, Marker, InfoWindow}       from 'google-maps-react';
import Background                      from './Background.js';
import '../css/footer.css';
import '../css/search.css';

class SavedRoutes extends Component {
  constructor(props){
    super(props);
  }

  makeMap(){
    const shortestPath = this.props.shortestPath;
    const latLongs = this.props.locations;

    console.log("LAAATTTTTTT LONGGGGGGSS", latLongs);
    let markers = latLongs.map(function(marker, index){
      let latitude = marker.lat;
      let longitude = marker.lng;

      console.log("#marker", marker);
      console.log("#lat", latitude);
      console.log("#long", longitude);

      return (
        <Marker key={index}
        name={shortestPath[index]}
        position={{lat: latitude, lng: longitude}}/>
      )
    })

    {markers}

    return(
      <Map className="mapStyle" google={window.google}></Map>
    )
  }

  makeMarkers(latLongs){
    let markers = latLongs.map(function(marker, index){
      <Marker position={{lat: marker.lat, lng: marker.long}} />
    })
    return (
      markers
    )
  }

  render() {
    const shortestPath = this.props.shortestPath;
    const length = shortestPath.length;
    return (
      <div>
        {this.makeMap()}
      </div>
    )
  }
}

export default SavedRoutes;
// // {length > 0 ? this.makeMap() : ""}
