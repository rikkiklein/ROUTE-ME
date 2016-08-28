import React, { Component } from 'react';

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
      <input type="text" id={this.props.locKey} onChange={this.handleLocation.bind(this)}></input>
    );
  }
}

export default AdditionalLocation;
