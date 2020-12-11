export const PLAYER_LOGIN = 'PLAYER_LOGIN';
export const NAVIGATE_SIGN_UP = 'NAVIGATE_SIGN_UP';
export const NAVIGATE_SIGN_UP_CANCEL = 'NAVIGATE_SIGN_UP_CANCEL';
export const PLAYER_SIGN_UP = 'PLAYER_SIGN_UP';
export const NAVIGATE_SIGN_OUT = 'NAVIGATE_SIGN_OUT';
export const SP_GAME_START = 'SP_GAME_START';
export const SP_GAME_BET = 'SP_GAME_BET';
export const SP_GAME_HIT = 'SP_GAME_HIT';
export const SP_GAME_STAND = 'SP_GAME_STAND';
export const SP_GAME_DEALER_DONE = 'SP_GAME_DEALER_DONE';
export const NAVIGATE_FINISH = 'NAVIGATE_FINISH';


export function player_login(playerId, jwt, playerName, playerBalance) {
  return {
    type: PLAYER_LOGIN,
    playerId: playerId,
    jwt: jwt,
    playerName: playerName,
    playerBalance: playerBalance
  };
}

export function nav_signup() {
  return {
    type: NAVIGATE_SIGN_UP
  };
}

export function player_signup() {
  return {
    type: PLAYER_SIGN_UP
  };
}

export function nav_signout() {
  return {
    type: NAVIGATE_SIGN_OUT
  };
}

export function nav_signup_cancel() {
  return {
    type: NAVIGATE_SIGN_UP_CANCEL
  };
}

export function sp_game_start(gameId, dealerCards, playerCards) {
  return {
    type: SP_GAME_START,
    gameId: gameId,
    dealerCards: dealerCards,
    playerCards: playerCards
  }
}

export function sp_game_bet(newBalance) {
  return {
    type: SP_GAME_BET,
    newBalance: newBalance
  }
}

export function sp_game_hit(playerCards) {
  return {
    type: SP_GAME_HIT,
    playerCards: playerCards
  }
}

export function sp_game_stand() {
  return {
    type: SP_GAME_STAND
  }
}

export function sp_game_dealer_done(dealerCards) {
  return {
    type: SP_GAME_DEALER_DONE,
    dealerCards: dealerCards
  }
}
