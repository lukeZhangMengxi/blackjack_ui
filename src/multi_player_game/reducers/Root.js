import { combineReducers } from 'redux'

import loginPageReducer from './LoginPageReducer'
import signupPageReducer from './SignupPageReducer'


export const stages = {
  LOGIN: 'LOGIN',
  SIGNUP: 'SIGNUP',
  IDLE: 'IDLE'
}

function nextStage(state = {}, action) {
  console.log('Current state is: ');
  console.log(state);

  switch (state.stage) {
    case stages.LOGIN: return loginPageReducer(action);
    case stages.SIGNUP: return signupPageReducer(action);
    default: return {
      stage: stages.LOGIN
    };
  }
}

const rootReducer = combineReducers({
  nextStage
});

export default rootReducer
