import React, { Component } from 'react'
import { Dialog, DialogActions, DialogTitle } from '@material-ui/core'
import { Button } from 'react-bootstrap'

import { stages } from '../reducers/Reducers'


export default class ResultDialog extends Component {

  render() {
    return (
      <Dialog
        open={this.props.currentStage === stages.SHOW_RESULT}
      >
        <DialogTitle>{this.props.resultMessage}</DialogTitle>
        <DialogActions>
          <Button onClick={() => {
            this.props.onFinishClick();
            this.props.updateParent();
          }} color="primary">
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

}
