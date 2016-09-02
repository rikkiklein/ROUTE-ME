import React, { Component }       from 'react';
import utils                      from '../utils/helper.js'
import NavBar                     from './NavBar.js';
import Footer                     from './Footer.js';
import { Link }                   from 'react-router';
import { Glyphicon }          from 'react-bootstrap';

import '../css/header.css';

class HomeHeaderAbout extends Component {

  render() {
    return (
      <div className="outer-div">
        <div className="home-header-outer">

          <div className="about-message-austin">
            <div className="welcome-title-about">
              <div className="name-austin">Austin <br/>Hudson</div>
              <div className="img-austin"></div>
            </div>
            <p className="welcome-p">
              B.S. in Computer Science<br/> Stony Brook University SUNY

              </p>
              <div className="outer-start">
                <div className="glyp-button">
                  <a target="_blank" href="https://www.linkedin.com/in/austin-hudson">Austin's LinkedIn</a>
                  <a className="links" target="_blank" href="https://github.com/austin-hudson">Austin's GitHub</a>
                </div>
              </div>
            </div>

          <div className="about-message-rikki">
              <div className="welcome-title-about">
                <div className="name">Rikki <br/> Rifka <br/> Rabinowitz</div>
                <div className="img-rikki"></div>
              </div>
              <p className="welcome-p">
              B.S. in Computer Science<br/> Brooklyn College CUNY
              </p>
              <div className="outer-start">
                <div className="glyp-button">
<a target="_blank" href="https://www.linkedin.com/in/rifkarabinowitz">Rikki's LinkedIn</a>
  <a className="links" target="_blank" href="https://github.com/rikkirabz">Rikki's GitHub</a>
</div>
              </div>
            </div>
        </div>

        <div className="outer-TSP">

          <div className="about-traveling-salesman">
            <div className="welcome-title-TSP">
              <div className="name">Traveling Salesman Problem <br/>The Nearest Neighbor Approach</div>
            </div>

            <div className="outer-start-tsp">

              <p className="welcome-p">
                Optimize your multiple stop route by
                using the Traveling Saleman Algorithm!
                </p>

            </div>

            <div className="outer-start-tsp">
              <p className="tsp-p">
                Traveling Salesman Problem (TSP) is an NP-Complete problem that attempts to solve the issue that arises when multiple stops are needed to be made along a route.
              <br/>
                <br/>

                What is the shortest path that visits each location exactly once.  There are various algorithms to solve TSP.  This app is incorporated using the Nearest Neighbor Algorithm (NNA).
              <br/>
                <br/>

                 NNA starts at a start location and repeatedly visits the next shortest path and continuesly does so until each location has been visited.  This algorithm quickly returns a tour but not necessarily is is the most optimal solution.
                 <br/>
                   <br/>


                 APIS that were used in creating this app:
                 <br/>
                 <a className="tsp-a" target="_blank" href="https://developers.google.com/maps/documentation/distance-matrix/">Google Distance Matrix API</a> <br/>

                 <a className="tsp-a" target="_blank" href="https://developers.google.com/maps/documentation/directions/">Google Directions API</a> <br/>

                 <a  className="tsp-a" target="_blank" href="https://developers.google.com/maps/web/">Google Maps API</a> <br/>



              </p>
            </div>

            <div className="outer-start">
              <div className="img-tsp"></div>
            </div>

          </div>
        </div>
      </div>
    );
  }

}

export default HomeHeaderAbout;

// <div className="button"><Link to="/search">Get Started!</Link></div>
