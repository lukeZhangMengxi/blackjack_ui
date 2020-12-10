import React, { Component } from 'react'
import { connect } from 'react-redux'
import { player_login, nav_signup, player_signup, nav_signup_cancel, nav_signout, sp_game_start } from './actions/Actions.js'

import LoginDialog from './components/LoginDialog'
import SignupDialog from './components/SignupDialog'
import GameBoard from './components/GameBoard'



class SinglePlayerFluxUI extends Component {
  render() {
    const { dispatch, myState } = this.props

    return (
      <div>
        <LoginDialog
          currentStage={myState.stage}
          onPlayerLoginClick={(playerId, jwt) => dispatch(player_login(playerId, jwt))}
          onNavSignupClick={() => dispatch(nav_signup())}
        />
        <SignupDialog
          currentStage={myState.stage}
          onPlayerSignupClick={() => dispatch(player_signup())}
          onCancelClick={() => dispatch(nav_signup_cancel())}
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
