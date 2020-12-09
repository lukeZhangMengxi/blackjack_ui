import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import Home from './Home.js';
import SinglePlayerUI from './SinglePlayerUI.js';
import SinglePlayerFluxUI from './single_player_flux_ui/SinglePlayerFluxUI';
import rootReducer from './single_player_flux_ui/reducers/Reducers'

let store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/">
        <IndexRoute component={Home} />
        <Route path="game" component={SinglePlayerUI} />
        <Route path="game_flux" component={SinglePlayerFluxUI} />
      </Route>
    </Router>
  </Provider>,

  document.getElementById('root')
);
