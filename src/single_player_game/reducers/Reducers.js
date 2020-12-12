import { combineReducers } from 'redux'

import loginPageReducer from './LoginPageReducer'
import signupPageReducer from './SignupPageReducer'
import { idleStateReducer, betStateReducer, playerTurnStateReducer, dealerTurnStateReducer, prepareResultStateReducer, showResultStateReducer } from './GameBoardReducer'


export const stages = {
  LOGIN: 'LOGIN',
  SIGNUP: 'SIGNUP',
  IDLE: 'IDLE',
  BET: 'BET',
  PLAYER_TURN: 'PLAYER_TURN',
  DEALER_TURN: 'DEALER_TURN',
  PREPARE_RESULT: 'PREPARE_RESULT',
  SHOW_RESULT: 'RESULT'
}

function nextStage(state = {}, action) {
  console.log('Current state is: ');
  console.log(state);

  switch (state.stage) {
    case stages.LOGIN: return loginPageReducer(action);
    case stages.SIGNUP: return signupPageReducer(action);
    case stages.IDLE: return idleStateReducer(state, action);
    case stages.BET: return betStateReducer(state, action);
    case stages.PLAYER_TURN: return playerTurnStateReducer(state, action);
    case stages.DEALER_TURN: return dealerTurnStateReducer(state, action);
    case stages.PREPARE_RESULT: return prepareResultStateReducer(state, action);
    case stages.SHOW_RESULT: return showResultStateReducer(state, action);
    default: return {
      stage: stages.LOGIN
    };
  }
}

const rootReducer = combineReducers({
  nextStage
});

export default rootReducer
