import React, { Component } from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import MultiPlayerGame from './MultiPlayerGame';
import rootReducer from './reducers/Root'


let store = createStore(rootReducer)

export default class MultiPlayerGameWrapper extends Component {

  render() {
    return (
      <Provider store={store}>
        <MultiPlayerGame />
      </Provider>
    )
  }
}
