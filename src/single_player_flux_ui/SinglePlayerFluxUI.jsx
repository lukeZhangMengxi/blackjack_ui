import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login, nav_signup, signup, nav_signup_cancel } from './actions/Actions.js'

import LoginDialog from './components/LoginDialog'
import SignupDialog from './components/SignupDialog'



class SinglePlayerFluxUI extends Component {
  render() {
    const { dispatch, myState } = this.props

    return (
      <div>
        <LoginDialog
          currentStage={myState.stage}
          onPlayerLoginClick={(playerId, jwt) => dispatch(login(playerId, jwt))}
          onNavSignupClick={() => dispatch(nav_signup())}
        />
        <SignupDialog
          currentStage={myState.stage}
          onPlayerSignupClick={() => dispatch(signup())}
          onCancelClick={() => dispatch(nav_signup_cancel())}
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
