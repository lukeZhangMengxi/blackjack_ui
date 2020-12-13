import React, { Component } from 'react'
import { connect } from 'react-redux'

import { player_login, nav_signup, player_signup, nav_signup_cancel } from './actions/Actions.js'
import LoginDialog from './components/LoginDialog'
import SignupDialog from './components/SignupDialog'
import GameList from './components/GameList'


class MultiPlayerGame extends Component {

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
        <GameList
          currentStage={myState.stage}
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

export default connect(mapStateToProps)(MultiPlayerGame);
