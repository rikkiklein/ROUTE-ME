import React, { Component } from 'react';
import { Link }             from 'react-router';
import Background           from "./components/Background.js";
import './css/App.css';

class App extends Component {

  render() {
    return (
      <div>
        <Background/>
      </div>
    );
  }
}

export default App;
