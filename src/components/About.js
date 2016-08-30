import React, { Component }   from 'react';
import utils                  from '../utils/helper.js'
import { Link }               from 'react-router';
import '../css/about.css';
import Background             from './Background.js';

class About extends Component {

  render() {
    return (
      <div>
        <div className="About">
          <Background/>
            
        </div>
      </div>
    );
  }

}

export default About;
