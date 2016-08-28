import React, { Component }   from 'react';
import utils                  from '../utils/helper.js'
import { Link }               from 'react-router';
import '../css/footer.css';
import Background             from './Background.js';

class SavedRoutes extends Component {

  render() {
    return (
      <div>
        <div className="About">
          <Background/>
          Saved
        </div>
      </div>
    );
  }

}

export default SavedRoutes;
