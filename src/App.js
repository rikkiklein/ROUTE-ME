import React, { Component } from 'react';
import { Link }             from 'react-router';
import Background           from "./components/Background.js";
import Home                 from "./components/Home.js";
import './css/App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Home/>
      </div>
    );
  }
}

export default App;
