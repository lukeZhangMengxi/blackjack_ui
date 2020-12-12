import { PLAYER_LOGIN, NAVIGATE_SIGN_UP } from '../actions/Actions'
import { stages } from './Reducers'

export default function loginPageReducer(action) {
  switch (action.type) {
    case PLAYER_LOGIN:
      return {
        stage: stages.IDLE,
        playerId: action.playerId,
        jwt: action.jwt,
        playerName: action.playerName,
        playerBalance: action.playerBalance
      };
    case NAVIGATE_SIGN_UP:
      return {
        stage: stages.SIGNUP
      };
  }
}
