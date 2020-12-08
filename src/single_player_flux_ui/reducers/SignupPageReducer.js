import { PLAYER_SIGN_UP, NAVIGATE_SIGN_UP_CANCEL } from '../actions/Actions'
import { stages } from './Reducers'

export default function signupPageReducer(action) {
  switch (action.type) {
    case PLAYER_SIGN_UP:
      console.log('Player signup now');
      return {
        stage: stages.LOGIN
      };
    case NAVIGATE_SIGN_UP_CANCEL:
      console.log('Player navigate to signup page');
      return {
        stage: stages.LOGIN
      };
  }
}