import React, { Component }   from 'react';
import utils                  from '../utils/helper.js'
import { Link }               from 'react-router';
import NavBar                 from './NavBar.js';
import Footer                 from './Footer.js';
import Header                 from './Header.js';

import '../css/header.css';

class About extends Component {

  render() {
    return (
      <div>
        <NavBar/>

        <div className="header-outer">
          <div className="left-about">

          </div>
          <div className="right-about">
            <p>Welcome to Route Calculator!</p>
            <p>
              About Us!
              </p>
          </div>
        </div>
        <Header/>
      </div>
    );
  }

}

export default About;

// <div className="button"><Link to="/search">Get Started!</Link></div>
