import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login, nav_signup, signup } from './actions/Actions.js'

import LoginDialog from './components/LoginDialog'



class SinglePlayerFluxUI extends Component {
  render() {
    const { dispatch, stage } = this.props

    return (
      <div>
        <LoginDialog
          currentStage = {stage.stage}
          onPlayerLoginClick = { (email, password) => dispatch(login(email, password)) }
          onNavSignupClick = { () => dispatch(nav_signup()) }
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    stage: state.nextStage
  }
}

export default connect(mapStateToProps)(SinglePlayerFluxUI);
