import React, { Component }   from 'react';
import utils                  from '../utils/helper.js'
import { Link }               from 'react-router';
import '../css/footer.css';
import Background             from './Background.js';

class About extends Component {

  render() {
    return (
      <div>
        <div className="About">
          <Background/>
          About
        </div>
      </div>
    );
  }

}

export default About;
