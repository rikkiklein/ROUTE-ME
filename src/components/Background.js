import React, { Component }   from 'react';
import utils                  from '../utils/helper.js'
import NavBar                 from './NavBar.js';
import Footer                 from './Footer.js';
import Header                 from './Header.js';

class Background extends Component {

  render() {
    return (
      <div>
        <div>
        <Header/>
        <NavBar/>
        </div>
      </div>
    );
  }

}

export default Background;
