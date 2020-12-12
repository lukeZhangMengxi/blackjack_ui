import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import Home from './Home.js';
import SinglePlayerGame from './single_player_game/SinglePlayerGame';
import MultiPlayerGame from './multi_player_game/MultiPlayerGame'
import rootReducer from './single_player_game/reducers/Reducers'

import 'bootstrap/dist/css/bootstrap.min.css';

let store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/">
        <IndexRoute component={Home} />
        <Route path="sp_game" component={SinglePlayerGame} />
        <Route path="mp_game" component={MultiPlayerGame} />
      </Route>
    </Router>
  </Provider>,

  document.getElementById('root')
);
