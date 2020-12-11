import { SP_GAME_START, NAVIGATE_SIGN_OUT, SP_GAME_BET, SP_GAME_HIT } from '../actions/Actions'
import { stages } from './Reducers'

export function idleStateReducer(state, action) {
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

export function betStateReducer(state, action) {
  switch (action.type) {
    case SP_GAME_BET:
      state.stage = stages.PLAYER_TURN;
      state.playerBalance = action.newBalance;
      console.log(state);
      return state;
  }
}

export function playerTurnStateReducer(state, action) {
  switch (action.type) {
    case SP_GAME_HIT:
      state.stage = stages.PLAYER_TURN;
      state.playerCards = action.playerCards;
      console.log(state);
      return state;
  }
}
