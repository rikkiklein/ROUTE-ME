import React, { Component }   from 'react';
import utils                  from '../utils/helper.js'
import { Link }               from 'react-router';
import '../css/nav_bar.css';
import { Glyphicon }          from 'react-bootstrap';

class NavBar extends Component {

  render() {
    return (
      <div>
        <div className="nav-ul">
          <div className="nav-div"><Link to="/">
            <span className="hideGlyph"><Glyphicon glyph="home"/></span>
            <span className="hideText">Home</span></Link>
          </div>
          <div className="nav-div"><Link to="/search">
            <span className="hideGlyph"><Glyphicon glyph="search"/></span>
            <span className="hideText">Search</span></Link>
          </div>
          <div className="nav-div"><Link to="/view-routes">
            <span className="hideGlyph"><Glyphicon glyph="map-marker"/></span>
            <span className="hideText">My Saved Routes</span></Link>
          </div>
          <div className="nav-div"><Link to="/about">
            <span className="hideGlyph"><Glyphicon glyph="info-sign"/></span>
            <span className="hideText">About Us</span></Link>
          </div>
      </div>
      </div>
    );
  }

}

export default NavBar;
