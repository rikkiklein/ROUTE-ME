import React, {Component}              from 'react';
import utils                           from '../utils/helper.js'
import { Link }                        from 'react-router';
import {Map, Marker, InfoWindow}       from 'google-maps-react';
import Background                      from './Background.js';
import '../css/footer.css';
import '../css/search.css';

class ShortestPath extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const shortestPath = this.props.shortestPath;
    console.log("shortest path is", this.props.shortestPath);
    return (
      <div>
        {shortestPath.map((item, index)=>{
            return(
              <div key={index}>{item}</div>
            )
        })}
      </div>
    )
  }
}

export default ShortestPath;
