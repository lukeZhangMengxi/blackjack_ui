import React, { Component } from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import SinglePlayerGame from './SinglePlayerGame';
import rootReducer from './reducers/Reducers'


let store = createStore(rootReducer)

export default class SinglePlayerGameWrapper extends Component {

  render() {
    return (
      <Provider store={store}>
        <SinglePlayerGame />
      </Provider>
    )
  }
}
