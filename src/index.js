import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import Home from './Home.js';
import SinglePlayerFluxUI from './single_player_flux_ui/SinglePlayerFluxUI';
import rootReducer from './single_player_flux_ui/reducers/Reducers'

import 'bootstrap/dist/css/bootstrap.min.css';

let store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/">
        <IndexRoute component={Home} />
        <Route path="game" component={SinglePlayerFluxUI} />
      </Route>
    </Router>
  </Provider>,

  document.getElementById('root')
);
