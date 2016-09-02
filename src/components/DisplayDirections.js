import React, {Component}         from 'react';
import utils                      from '../utils/helper.js'
import { Link }                   from 'react-router';
import Background                 from './Background.js';
import {Map, Marker, InfoWindow}  from 'google-maps-react';
import Directions                 from './Directions.js';
import '../css/search.css';

class DisplayDirections extends Component {

  constructor(props){
    super(props);
    this.state = {
      directions: ""
    }
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
        <div>
          {dLength > 0 ? <Directions directions={directions} shortestPath={shortestPath} /> : "" }
          {length > 0 ?
            <button className="directions-button" onClick={(event)=>this.viewDirections()}>View Directions</button> : ""}
        </div>
      </div>
    );
  }
}

export default DisplayDirections;
