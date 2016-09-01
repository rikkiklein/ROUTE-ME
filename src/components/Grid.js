import React, { Component }   from 'react';
import utils                  from '../utils/helper.js'
import { Link }               from 'react-router';
import NavBar                 from './NavBar.js';
import Footer                 from './Footer.js';
import HeaderAbout            from './HeaderAbout.js';
import HomeHeaderAbout        from './HomeHeaderAbout.js';
import '../css/header.css';
import '../css/about.css';
import '../css/grid.css';

class Grid extends Component {

  render() {
    return (
      <div>
        <div className="flexGrid">
          <div className="colAFlex">
            <div className="rowFlex">{this.props.gridPath}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Grid;
