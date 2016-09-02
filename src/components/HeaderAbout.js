import React, { Component }   from 'react';
import utils                  from '../utils/helper.js'
import NavBar                 from './NavBar.js';
import Footer                 from './Footer.js';
import { Link }               from 'react-router';

import '../css/header.css';

class HeaderAbout extends Component {

  render() {
    return (
      <div className="header-outer">
        <div className="left-about-header">
          <p>Welcome to Route ME!</p>
          <p>
            Optimize your multiple stop route by
            using the Traveling Salesman Algorithm!
            </p>
        </div>
        <div className="right-about-header">

        </div>
      </div>
    );
  }

}

export default HeaderAbout;

// <div className="button"><Link to="/search">Get Started!</Link></div>
