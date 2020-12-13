import axios from 'axios'
import React, { Component } from 'react'
import { Dialog, DialogActions, DialogTitle, DialogContent, TextField } from '@material-ui/core';
import { Button } from 'react-bootstrap';

import { stages } from '../reducers/Root'

export default class LoginDialog extends Component {


  render() {
    return (
      <Dialog
        open={this.props.currentStage === stages.LOGIN}
      >
        <DialogTitle>Player login</DialogTitle>
        <DialogContent>
          <p id="login-message" style={{ color: "red" }}></p>
          <TextField id="login-email" label="Email" variant="outlined" /><br /><br />
          <TextField id="login-password" label="Password" variant="outlined" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.login(
            document.getElementById("login-email").value,
            document.getElementById("login-password").value
          )} color="primary">Login</Button>
          <Button onClick={() => this.props.onNavSignupClick()} color="primary">Signup Now</Button>
        </DialogActions>
      </Dialog>
    )
  }

  login(email, password) {
    axios.post(`http://localhost:8080/player/login?email=${email}&password=${password}`)
      .then(
        (rsp) => {
          let playerId = rsp.data.playerId;
          let jwt = rsp.data.token;
          axios.get(`http://localhost:8080/player/${playerId}`, { "headers": { "jwt": jwt } })
            .then(
              (rsp) => {
                this.props.onPlayerLoginClick(
                  playerId,
                  jwt,
                  rsp.data.displayName,
                  rsp.data.balance
                );
              },
              (error) => { console.log(error); }
            )
        },
        (error) => {
          console.log(error);
          document.getElementById("login-message").style.color = "red";
          document.getElementById("login-message").innerText = "Login failed, please try again~";
        }
      )
  }
}