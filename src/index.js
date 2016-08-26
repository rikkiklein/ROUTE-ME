import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Router, Route, browserHistory } from 'react-router';
import Search from "./components/Search.js";

ReactDOM.render(
  <Router history={browserHistory}>
     <Route path="/" component={App}/>
     <Route path="/search" component={Search}>
     </Route>


 </Router>
  ,document.getElementById('root')
);
