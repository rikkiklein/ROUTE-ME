import React, { Component }   from 'react';
import utils                  from '../utils/helper.js'
import { Link }               from 'react-router';
import '../css/footer.css';

class Footer extends Component {

  render() {
    return (
      <div>
        <div className="footer">
          &copy Route Me by Rikki Rifka Rabinowitz & Austin Hudson.  All rights reserved. 2016
        </div>
      </div>
    );
  }
}

export default Footer;
