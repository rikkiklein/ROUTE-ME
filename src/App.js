import React, { Component } from 'react';
import { Link }             from 'react-router';
import Background           from "./components/Background.js";
import './css/App.css';
import Home                 from "./components/Home.js";

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
// <Background/>
