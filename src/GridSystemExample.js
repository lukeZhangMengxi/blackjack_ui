import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import React, {Component} from 'react';
import { Dialog, DialogActions, DialogTitle } from '@material-ui/core';

import 'bootstrap/dist/css/bootstrap.min.css';

const stages = {
  IDLE: 'IDLE',
  PLAYER_TURN: 'PLAYER_TURN'
}

class GridSystemExample extends Component {

  state = {
    gameId: '',
    playerCards: [],
    dealerCards: [],
    showResult: false,
    result: '',
    currentStage: stages.IDLE
  }

  handleClickOpen() {
    this.setState({ showResult: true });
  }

  handleClose() {
    this.setState({ showResult: false });
  }

  start() {
    console.log('Starting the game!');
    axios.post('http://localhost:8080/game/start?playerId=a6682fed-e764-43ff-8795-f2f2c7a45c84')
    .then(
      (rsp) => {
        console.log(rsp);
        this.setState({ gameId: rsp.data });
        axios.get(`http://localhost:8080/game/${rsp.data}/status`)
        .then((rsp) => {
            console.log(rsp);
            this.setState({ playerCards: rsp.data[0], dealerCards: rsp.data[1], currentStage: stages.PLAYER_TURN });
        });
      },
      (error) => { console.log(error); }
    );
  }

  hit() {
    console.log('Starting the game!');
    axios.post(`http://localhost:8080/game/${this.state.gameId}/hit?playerId=a6682fed-e764-43ff-8795-f2f2c7a45c84`)
    .then(
      (rsp) => {
        console.log(rsp);
        axios.get(`http://localhost:8080/game/${this.state.gameId}/status`)
        .then((rsp) => {
            console.log(rsp);
            this.setState({ playerCards: rsp.data[0] });
        });
      },
      (error) => { console.log(error); }
    );
  }

  stand() {
    console.log('Starting the game!');
    axios.post(`http://localhost:8080/game/${this.state.gameId}/stand?playerId=a6682fed-e764-43ff-8795-f2f2c7a45c84`)
    .then(
      (rsp) => {
        console.log(rsp);
        axios.get(`http://localhost:8080/game/${this.state.gameId}/status`)
        .then((rsp) => {
            console.log(rsp);
            this.setState({ dealerCards: rsp.data[1] });

            axios.get(`http://localhost:8080/game/${this.state.gameId}/result?playerId=a6682fed-e764-43ff-8795-f2f2c7a45c84`)
            .then((rsp) => {
              if (rsp.data == 1) {
                this.setState({ result: "You win!!!" });
              } else if (rsp.data == 0) {
                this.setState({ result: "Tied game!" });
              } else if (rsp.data == -1) {
                this.setState({ result: "You lose..." });
              }
              
              this.handleClickOpen();
              this.setState({ currentStage: stages.IDLE });
            });
        });
      },
      (error) => { console.log(error); }
    );
  }

  render() {
		return (
      <Container fluid>
        <Row>
          <Col sm={1}>Dealer's Cards: </Col>
          {
            this.state.dealerCards.map((element) => { return (
              <Col sm={2}>
                <Card style={{ width: '100%' }}>
                  <Card.Img variant="top" src="src/img/2.png" />
                  <Card.Body>
                    <Card.Title>{element}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            )})
          }
        </Row>
        <Row style={{position: "relative", top: 20}}>
          <Col >VS</Col>
        </Row>
        <Row style={{position: "relative", top: 50}}>
          <Col sm={1}>Your Cards: </Col>
          {
            this.state.playerCards.map((element) => { return (
              <Col sm={2}>
                <Card style={{ width: '100%' }}>
                  <Card.Img variant="top" src="src/img/2.png" />
                  <Card.Body>
                    <Card.Title>{element}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            )})
          }
        </Row>
        <Row style={{position: "relative", top: 100}}>
          { this.state.currentStage === stages.IDLE && <Col sm={2} offset={2}> <Button onClick={() => this.start()}>Start</Button> </Col> }
          { this.state.currentStage === stages.PLAYER_TURN && <Col sm={2} offset={2}> <Button onClick={() => this.hit()}>Hit</Button> </Col> }
          { this.state.currentStage === stages.PLAYER_TURN && <Col sm={2} offset={2}> <Button onClick={() => this.stand()}>Stand</Button> </Col> }
        </Row>
        <Row style={{position: "relative", top: 150}}>
          <Dialog
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={this.state.showResult}
            onClose={this.handleClose}
            BackdropProps={{
                timeout: 500,
            }}
          >
            <DialogTitle id="alert-dialog-title">{this.state.result}</DialogTitle>
            <DialogActions>
              <Button onClick={() => this.handleClose()} color="primary">
                Okey
              </Button>
            </DialogActions>
          </Dialog>
        </Row>
      </Container>
		)
  }
}

export default GridSystemExample;
