import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import React, {Component} from 'react';
import { Dialog, DialogActions, DialogTitle } from '@material-ui/core';

import 'bootstrap/dist/css/bootstrap.min.css';

const stages = {
  IDLE: 'IDLE',
  BET: 'BET',
  PLAYER_TURN: 'PLAYER_TURN'
}

class SinglePlayerUI extends Component {

  state = {
    gameId: '',
    playerId: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    playerCards: [],
    dealerCards: [],
    showResult: false,
    result: '',
    currentStage: stages.IDLE
  }

  handleShowResult() { this.setState({ showResult: true }); }
  handleCloseResult() { this.setState({ showResult: false }); }

  start() {
    console.log('Starting the game!');
    axios.post(`http://localhost:8080/game/start?playerId=${this.state.playerId}`)
    .then(
      (rsp) => {
        console.log(rsp);
        this.setState({ gameId: rsp.data });
        axios.get(`http://localhost:8080/game/${rsp.data}/status`)
        .then((rsp) => {
            console.log(rsp);
            this.setState({ playerCards: rsp.data.playerCards, dealerCards: rsp.data.dealerCards, currentStage: stages.BET });
        });
      },
      (error) => { console.log(error); }
    );
  }

  bet(amount) {
    axios.post(`http://localhost:8080/game/${this.state.gameId}/bet?playerId=${this.state.playerId}&bet=${amount}`)
    .then(
      (rsp) => { console.log(rsp); this.setState({ currentStage: stages.PLAYER_TURN }); },
      (error) => { console.log(error); }
    );
  }

  hit() {
    console.log('Starting the game!');
    axios.post(`http://localhost:8080/game/${this.state.gameId}/hit?playerId=${this.state.playerId}`)
    .then(
      (rsp) => {
        console.log(rsp);
        axios.get(`http://localhost:8080/game/${this.state.gameId}/status`)
        .then((rsp) => {
            console.log(rsp);
            this.setState({ playerCards: rsp.data.playerCards });
        });
      },
      (error) => { console.log(error); }
    );
  }

  stand() {
    console.log('Starting the game!');
    axios.post(`http://localhost:8080/game/${this.state.gameId}/stand?playerId=${this.state.playerId}`)
    .then(
      (rsp) => {
        console.log(rsp);
        axios.get(`http://localhost:8080/game/${this.state.gameId}/status`)
        .then((rsp) => {
            console.log(rsp);
            this.setState({ dealerCards: rsp.data.dealerCards });

            axios.get(`http://localhost:8080/game/${this.state.gameId}/result?playerId=${this.state.playerId}`)
            .then((rsp) => {
              if (rsp.data.result === 1) {
                this.setState({ result: "You win!!! Now your deposit is: " + rsp.data.newDeposit });
              } else if (rsp.data.result === 0) {
                this.setState({ result: "Tied game! Now your deposit is: " + rsp.data.newDeposit });
              } else if (rsp.data.result === -1) {
                this.setState({ result: "You lose... Now your deposit is: " + rsp.data.newDeposit });
              }
              
              this.handleShowResult();
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
            onClose={this.handleCloseResult}
            BackdropProps={{ timeout: 500 }}
          >
            <DialogTitle id="alert-dialog-title">{this.state.result}</DialogTitle>
            <DialogActions>
              <Button onClick={() => this.handleCloseResult()} color="primary">
                Okay
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={this.state.currentStage === stages.BET}
            BackdropProps={{ timeout: 500 }}
          >
            <DialogTitle id="alert-dialog-title">Please select your bet amount:</DialogTitle>
            <DialogActions>
              <Button onClick={() => this.bet(10)} color="primary">10</Button>
              <Button onClick={() => this.bet(50)} color="primary">50</Button>
              <Button onClick={() => this.bet(100)} color="primary">100</Button>
              <Button onClick={() => this.bet(500)} color="primary">500</Button>
            </DialogActions>
          </Dialog>
        </Row>
      </Container>
		)
  }
}

export default SinglePlayerUI;
