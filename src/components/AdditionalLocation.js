import React, { Component } from 'react';
import GeoSuggest from 'react-geosuggest';
import '../css/search.css';
import '../css/suggest.css';

class AdditionalLocation extends Component {

  constructor(props){
    super(props);
    this.state = {
      location: "",
      latlong: ""
    }
  }

  handleLocation(value){
    console.log(value.label);
    this.setState({location: value.label, latlong: value.location})
  }

  render() {
    let _this=this;
    console.log(this.state);
    return (
      <GeoSuggest id={_this.props.locKey}  onSuggestSelect={_this.handleLocation.bind(this)}/>
    );
  }
}

export default AdditionalLocation;
