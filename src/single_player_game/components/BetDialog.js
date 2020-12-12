import axios from 'axios'
import React, { Component } from 'react'
import { Dialog, DialogActions, DialogTitle } from '@material-ui/core'
import { Button } from 'react-bootstrap'

import { stages } from '../reducers/Reducers'


export default class BetDialog extends Component {

  render() {
    return (
      <Dialog
        open={this.props.currentStage === stages.BET}
      >
        <DialogTitle id="alert-dialog-title">Please select your bet amount:</DialogTitle>
        <DialogActions>
          <Button onClick={() => this.bet(10)} color="primary">10</Button>
          <Button onClick={() => this.bet(50)} color="primary">50</Button>
          <Button onClick={() => this.bet(100)} color="primary">100</Button>
          <Button onClick={() => this.bet(500)} color="primary">500</Button>
        </DialogActions>
      </Dialog>
    )
  }

  bet(amount) {
    axios.post(`http://localhost:8080/game/${this.props.gameId}/bet?playerId=${this.props.playerId}&bet=${amount}`, null, { "headers": { "jwt": this.props.jwt } })
      .then(
        () => {
          console.log('New balance: ' + (parseInt(this.props.playerBalance) - amount));
          this.props.onBetClick(parseInt(this.props.playerBalance) - amount);
          this.props.updateParent();
        },
        (error) => { console.log(error); }
      );
  }

}
