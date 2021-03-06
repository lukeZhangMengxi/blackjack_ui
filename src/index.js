import React from 'react'
import ReactDOM from 'react-dom'
import { Router, IndexRoute, Route, browserHistory } from 'react-router'

import Home from './Home.js'
import SinglePlayerGameWrapper from './single_player_game/index'
import MultiPlayerGameWrapper from './multi_player_game/index'

import 'bootstrap/dist/css/bootstrap.min.css'


ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/">
      <IndexRoute component={Home} />
      <Route path="sp_game" component={SinglePlayerGameWrapper} />
      <Route path="mp_game" component={MultiPlayerGameWrapper} />
    </Route>
  </Router>,

  document.getElementById('root')
);
