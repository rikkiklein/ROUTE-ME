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
      <div className="home-header-outer-left">
        <div className="welcome-message">
          <div className="welcome-title">
            Welcome to Route ME
          </div>
          <p className="welcome-p">
            Optimize your multiple stop route by
            using the Traveling Saleman Algorithm!
            </p>
            <div className="outer-start">
              <div className="start-button">
                <Link to="/search">Get Started</Link>
              </div>
            </div>
        </div>
      </div>
    );
  }

}

export default HomeHeader;

// <div className="button"><Link to="/search">Get Started!</Link></div>
