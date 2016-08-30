import React, {Component}   from 'react';
import utils                           from '../utils/helper.js'
import { Link }                        from 'react-router';
import '../css/footer.css';
import '../css/search.css';
import Background                      from './Background.js';

import GoogleMap                       from 'google-map-react';

class SavedRoutes extends Component {


  constructor(props){
    super(props);
  }

  showMap(){
    console.log(" in map");
  }

  render() {
    console.log(this.props.rt, "propsssssss");
    const data = this.props.rt;
    return (
      <div>
        {data.map((item, index)=>{
          return(
            <div key={index}>{item}</div>
          )
        })}
        <button className="button" onClick={(event) => this.showMap()}>Show Directions</button>

      </div>
    );
  }

}

export default SavedRoutes;
