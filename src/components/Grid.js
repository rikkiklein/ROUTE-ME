import React, { Component }   from 'react';
import utils                  from '../utils/helper.js'
import { Link }               from 'react-router';
import NavBar                 from './NavBar.js';
import Footer                 from './Footer.js';
import HeaderAbout            from './HeaderAbout.js';
import HomeHeaderAbout        from './HomeHeaderAbout.js';
import '../css/header.css';
import '../css/about.css';

class Grid extends Component {

  render() {
    return (
      <div>
        <div className="flexGrid">
          <div className="colAFlex">
            <div className="rowAFlex"></div>
            <div className="rowBFlex"></div>
            <div className="rowCFlex">  </div>
          </div>

          <div className="colBFlex">
            <div className="rowAFlex"></div>
            <div className="rowBFlex">hi</div>
            <div className="rowCFlex"></div>
          </div>

          <div className="colBFlex">
            <div className="rowAFlex"></div>
            <div className="rowBFlex"></div>
            <div className="rowCFlex"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Grid;
