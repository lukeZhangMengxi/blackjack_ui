import { combineReducers } from 'redux'
import loginPageReducer from './LoginPageReducer'
import signupPageReducer from './SignupPageReducer'
import { idleStateReducer, betStateReducer, playerTurnStateReducer } from './GameBoardReducer'


export const stages = {
  LOGIN: 'LOGIN',
  SIGNUP: 'SIGNUP',
  IDLE: 'IDLE',
  BET: 'BET',
  PLAYER_TURN: 'PLAYER_TURN',
  PENDING: 'PENDING'
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
    default: return {
      stage: stages.LOGIN
    };
  }
}

const rootReducer = combineReducers({
  nextStage
});

export default rootReducer
