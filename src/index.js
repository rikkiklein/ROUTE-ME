import React                              from 'react';
import ReactDOM                           from 'react-dom';
import App                                from './App';
import { Router, Route, browserHistory }  from 'react-router';
import Search                             from './components/Search.js';
import About                              from './components/About.js';
import ViewRoutes                        from './components/ViewRoutes.js';
import Modal                              from './components/NameModal.js';
import './css/index.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route    path="/"             component={App}/>
    <Route    path="/search"       component={Search}/>
    <Route    path="/view-routes"   component={ViewRoutes}/>
    <Route    path="/addName"      component={Modal}/>
    <Route    path="/about"        component={About}/>

  </Router>
  ,document.getElementById('root')
);
