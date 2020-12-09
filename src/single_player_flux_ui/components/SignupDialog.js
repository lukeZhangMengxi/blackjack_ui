import axios from 'axios'
import React, { Component } from 'react'
import { Dialog, DialogActions, DialogTitle, DialogContent, TextField } from '@material-ui/core';
import { Button } from 'react-bootstrap';

import { stages } from '../reducers/Reducers'

export default class SignupDialog extends Component {

  render() {
    return (
      <Dialog
        open={this.props.currentStage === stages.SIGNUP}
      >
        <DialogTitle>Player login</DialogTitle>
        <DialogContent>
          <p id="signup-message" style={{ color: "red" }}></p>
          <TextField id="signup-email" label="Email" variant="outlined" /> <br /><br />
          <TextField id="signup-password" label="Password" variant="outlined" /> <br /><br />
          <TextField id="signup-displayName" label="Display Name" variant="outlined" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.signup(
            document.getElementById("signup-email").value,
            document.getElementById("signup-password").value,
            document.getElementById("signup-displayName").value
          )} color="primary">Signup</Button>
          <Button onClick={() => this.props.onCancelClick()} color="primary">Cancel</Button>
        </DialogActions>
      </Dialog>
    )
  }

  signup(email, password, displayName) {
    axios.post(`http://localhost:8080/player/create?email=${email}&password=${password}&displayName=${displayName}`)
      .then(
        () => {
          this.props.onPlayerSignupClick();
          document.getElementById("login-message").style.color = "green";
          document.getElementById("login-message").innerText = "Thank you for the signup! Please login now";
        },
        (error) => {
          console.log(error);
          document.getElementById("signup-message").style.color = "red";
          document.getElementById("signup-message").innerText = "Signup failed, please try again~";
        }
      )
  }

}
