export const PLAYER_LOGIN = 'PLAYER_LOGIN';
export const NAVIGATE_SIGN_UP = 'NAVIGATE_SIGN_UP';
export const NAVIGATE_SIGN_UP_CANCEL = 'NAVIGATE_SIGN_UP_CANCEL';
export const PLAYER_SIGN_UP = 'PLAYER_SIGN_UP';
export const NAVIGATE_SIGN_OUT = 'NAVIGATE_SIGN_OUT';


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

