import { SP_GAME_START, NAVIGATE_SIGN_OUT } from '../actions/Actions'
import { stages } from './Reducers'

export default function idleStateReducer(state, action) {
  switch (action.type) {
    case SP_GAME_START:
      state.stage = stages.BET;
      state.gameId = action.gameId;
      state.dealerCards = action.dealerCards;
      state.playerCards = action.playerCards;
      console.log(state);
      return state;
    case NAVIGATE_SIGN_OUT:
      return {
        stage: stages.LOGIN
      };
  }
}
