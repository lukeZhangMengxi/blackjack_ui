import { SP_GAME_START, NAVIGATE_SIGN_OUT, SP_GAME_BET, SP_GAME_HIT, SP_GAME_STAND, SP_GAME_DEALER_DONE, SP_GAME_RESULT_READY, NAVIGATE_FINISH } from '../actions/Actions'
import { stages } from './Reducers'

export function idleStateReducer(state, action) {
  switch (action.type) {
    case SP_GAME_START:
      state.stage = stages.BET;
      state.gameId = action.gameId;
      state.dealerCards = action.dealerCards;
      state.playerCards = action.playerCards;
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
      return state;
  }
}

export function playerTurnStateReducer(state, action) {
  switch (action.type) {
    case SP_GAME_HIT:
      state.stage = stages.PLAYER_TURN;
      state.playerCards = action.playerCards;
      return state;
    case SP_GAME_STAND:
      state.stage = stages.DEALER_TURN;
      return state;
  }
}

export function dealerTurnStateReducer(state, action) {
  switch (action.type) {
    case SP_GAME_DEALER_DONE:
      state.stage = stages.PREPARE_RESULT;
      state.dealerCards = action.dealerCards;
      return state;
  }
}

export function prepareResultStateReducer(state, action) {
  switch (action.type) {
    case SP_GAME_RESULT_READY:
      state.stage = stages.SHOW_RESULT;
      state.resultMessage = action.resultMessage;
      state.playerBalance = action.newBalance;
      return state;
  }
}

export function showResultStateReducer(state, action) {
  switch (action.type) {
    case NAVIGATE_FINISH:
      state.stage = stages.IDLE;
      state.dealerCards = [];
      state.playerCards = [];
      state.resultMessage = '';
      state.gameId = '';
      return state;
  }
}
