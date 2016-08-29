import React                              from 'react';
import ReactDOM                           from 'react-dom';
import App                                from './App';
import { Router, Route, browserHistory }  from 'react-router';
import Search                             from './components/Search.js';
import About                              from './components/About.js';
import SavedRoutes                        from './components/SavedRoutes.js';
import './css/index.css';

ReactDOM.render(
  <Router history={browserHistory}>
     <Route path="/" component={App}/>
     <Route path="/search" component={Search}></Route>
      <Route path="/saved-routes" component={SavedRoutes}></Route>
     <Route path="/about" component={About}></Route>
 </Router>
  ,document.getElementById('root')
);
