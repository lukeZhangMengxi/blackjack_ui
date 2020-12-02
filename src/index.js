import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';

import Home from './Home.js';
import SinglePlayerUI from './SinglePlayerUI.js';

ReactDOM.render(
  <Router history = {browserHistory}>
      <Route path = "/">
         <IndexRoute component = {Home} />
         <Route path = "game" component = {SinglePlayerUI} />
      </Route>
   </Router>,
  document.getElementById('root')
);
