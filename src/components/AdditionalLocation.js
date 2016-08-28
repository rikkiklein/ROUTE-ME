import React, { Component } from 'react';
import '../css/search.css';

class AdditionalLocation extends Component {

  constructor(props){
    super(props);
    this.state = {
      location: ""
    }
  }

  handleLocation(event){
    let location = event.target.value;
    this.setState({location: location})
  }

  render() {
    return (
      <input className="input-mid" type="text" id={this.props.locKey} onChange={this.handleLocation.bind(this)}></input>
    );
  }
}

export default AdditionalLocation;
