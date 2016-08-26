import React, { Component } from 'react';
import './App.css';
import Distance from './components/Distance.js';
import Search from './components/Search.js';
import { Link } from 'react-router';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="header-link"><Link to="/">Home</Link></div>
        <div className="header-link"><Link to="/search">Search</Link></div>      
      </div>
    );
  }
}

export default App;
//
// <Distance/>
