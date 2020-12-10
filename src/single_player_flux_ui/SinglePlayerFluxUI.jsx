import React, { Component } from 'react'
import { connect } from 'react-redux'
import { player_login, nav_signup, player_signup, nav_signup_cancel, nav_signout, sp_game_start, sp_game_bet } from './actions/Actions.js'

import LoginDialog from './components/LoginDialog'
import SignupDialog from './components/SignupDialog'
import GameBoard from './components/GameBoard'
import BetDialog from './components/BetDialog'


class SinglePlayerFluxUI extends Component {
  render() {
    const { dispatch, myState } = this.props

    return (
      <div>
        <LoginDialog
          currentStage={myState.stage}
          onPlayerLoginClick={(playerId, jwt, playerName, playerBalance) => dispatch(player_login(playerId, jwt, playerName, playerBalance))}
          onNavSignupClick={() => dispatch(nav_signup())}
        />
        <SignupDialog
          currentStage={myState.stage}
          onPlayerSignupClick={() => dispatch(player_signup())}
          onCancelClick={() => dispatch(nav_signup_cancel())}
        />
        <BetDialog
          currentStage={myState.stage}
          gameId={myState.gameId}
          playerId={myState.playerId}
          jwt={myState.jwt}
          playerBalance={myState.playerBalance}
          updateParent={this.forceUpdate.bind(this)}
          onBetClick={(newBalance) => dispatch(sp_game_bet(newBalance))}
        />
        <GameBoard
          currentStage={myState.stage}
          playerId={myState.playerId}
          jwt={myState.jwt}
          dealerCards={myState.dealerCards || []}
          playerCards={myState.playerCards || []}
          playerBalance={myState.playerBalance}
          playerName={myState.playerName}
          updateParent={this.forceUpdate.bind(this)}
          onSignOutClick={() => dispatch(nav_signout())}
          onGameStartClick={(gameId, dealerCards, playerCards) => dispatch(sp_game_start(gameId, dealerCards, playerCards))}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    myState: state.nextStage
  }
}

export default connect(mapStateToProps)(SinglePlayerFluxUI);
