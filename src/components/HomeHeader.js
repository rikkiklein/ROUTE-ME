import React, { Component }       from 'react';
import utils                      from '../utils/helper.js'
import NavBar                     from './NavBar.js';
import Footer                     from './Footer.js';
import { Link }                   from 'react-router';
import { Glyphicon }          from 'react-bootstrap';

import '../css/header.css';

class HomeHeader extends Component {

  render() {
    return (
      <div className="home-header-outer">
        <div className="welcome-message">
          Hey here is a moving welcome message
        </div>
      </div>
    );
  }

}

export default HomeHeader;

// <div className="button"><Link to="/search">Get Started!</Link></div>
