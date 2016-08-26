import React, { Component } from 'react';

class AdditionalLocation extends Component {

  constructor(){
    super();
    this.state = {
      location: "",
    }
  }

getLocationState(){
  return this.state.location;
}

changeLocation(event){
  this.setState({location: event.target.value })
}

  render() {
    return (
      <div>
        <input type="text" onChange={this.changeLocation.bind(this)}></input>
      </div>
    );
  }
}

export default AdditionalLocation;
