import React, { Component }   from 'react';
import utils                  from '../utils/helper.js'
import NavBar                 from './NavBar.js';
import Footer                 from './Footer.js';
import { Link }               from 'react-router';

import '../css/header.css';

class Header extends Component {

  render() {
    return (
      <div className="header-outer">
        <div className="left">
          <p>Welcome to Route Calculator!</p>
          <p>
            Optimize your multiple stop route by
            using the Traveling Saleman Algorithm!
            </p>
        </div>
        <div className="right">

        </div>
      </div>
    );
  }

}

export default Header;

// <div className="button"><Link to="/search">Get Started!</Link></div>
