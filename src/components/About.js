import React, { Component }   from 'react';
import utils                  from '../utils/helper.js'
import { Link }               from 'react-router';
import NavBar                 from './NavBar.js';
import Footer                 from './Footer.js';
import HeaderAbout            from './HeaderAbout.js';
import HomeHeaderAbout        from './HomeHeaderAbout.js';
import '../css/header.css';

class About extends Component {

  render() {
    return (
      <div>
        <div>
          <NavBar/>
          <HomeHeaderAbout/>
          <Footer/>
        </div>
      </div>
    );
  }

}

export default About;
