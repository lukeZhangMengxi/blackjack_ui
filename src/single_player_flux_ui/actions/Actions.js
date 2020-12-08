export const PLAYER_LOGIN = 'PLAYER_LOGIN';
export const NAVIGATE_SIGN_UP = 'NAVIGATE_SIGN_UP';
export const NAVIGATE_SIGN_UP_CANCEL = 'NAVIGATE_SIGN_UP_CANCEL';
export const PLAYER_SIGN_UP = 'PLAYER_SIGN_UP';
export const NAVIGATE_SIGN_OUT = 'NAVIGATE_SIGN_OUT';
// export const SP_GAME_START = 'SP_GAME_START';
// export const SP_GAME_BET = 'SP_GAME_BET';
// export const SP_GAME_HIT = 'SP_GAME_HIT';
// export const SP_GAME_STAND = 'SP_GAME_STAND';
// export const NAVIGATE_FINISH = 'NAVIGATE_FINISH';


export function login(playerId, jwt) {
  return {
    type: PLAYER_LOGIN,
    playerId: playerId,
    jwt: jwt
  };
}

export function nav_signup() {
  return {
    type: NAVIGATE_SIGN_UP
  };
}

export function signup(email, passowrd, name) {
  return {
    type: PLAYER_SIGN_UP,
    email: email,
    passowrd: passowrd,
    name: name
  };
}
