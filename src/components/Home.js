import React, { Component }   from 'react';
import utils                  from '../utils/helper.js'
import GeoSuggest             from 'react-geosuggest';
import AdditionalLocation     from "./AdditionalLocation.js"
import NavBar                 from './NavBar.js';
import Footer                 from './Footer.js';
import Header                 from './Header.js';
import SavedRoutes            from './SavedRoutes.js';
import HomeHeader             from './HomeHeader.js';
import { browserHistory }     from 'react-router';

import '../css/search.css';
import '../css/suggest.css';

class Home extends Component {
  render() {
    return (
      <div>
        <div>
          <NavBar/>
          <HomeHeader/>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default Home;
