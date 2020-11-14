import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import React, {Component} from 'react';
import { Dialog, DialogActions, DialogTitle } from '@material-ui/core';

import 'bootstrap/dist/css/bootstrap.min.css';

const stages = {
  IDLE: 'IDLE',
  BET: 'BET',
  PLAYER_TURN: 'PLAYER_TURN',
  PENDING: 'PENDING'
}

class SinglePlayerUI extends Component {

  state = {
    gameId: '',
    playerId: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    playerCards: [],
    playerBalance: 0,
    dealerCards: [],
    showResult: false,
    result: '',
    currentStage: stages.IDLE
  }

  handleShowResultWithDelay(seconds) {
    this.setState({ currentStage: stages.PENDING });

    // Sleep to give player time to see the result
    setTimeout(() => { this.setState({ showResult: true }) } , seconds*1000); 
  }
  handleCloseResult() {
    this.setState({ 
      showResult: false, playerCards: [], dealerCards: [],
      currentStage: stages.IDLE
    });
  }

  getPlayerInfo() {
    axios.get(`http://localhost:8080/player/${this.state.playerId}`)
    .then(
      (rsp) => { this.setState({ playerBalance: rsp.data.balance }) },
      (error) => { console.log(error); }
    )
  }

  start() {
    console.log('Starting the game!');
    axios.post(`http://localhost:8080/game/start?playerId=${this.state.playerId}`)
    .then(
      (rsp) => {
        console.log(rsp);
        this.setState({ gameId: rsp.data });
        axios.get(`http://localhost:8080/game/${rsp.data}/status?playerId=${this.state.playerId}`)
        .then((rsp) => {
            console.log(rsp);
            this.setState({ 
              playerCards: rsp.data.playerCards, dealerCards: rsp.data.dealerCards,
              playerBalance: rsp.data.playerbalance, currentStage: stages.BET
            });
        });
      },
      (error) => { console.log(error); }
    );
  }

  bet(amount) {
    axios.post(`http://localhost:8080/game/${this.state.gameId}/bet?playerId=${this.state.playerId}&bet=${amount}`)
    .then(
      (rsp) => { 
        console.log(rsp);
        this.setState({ 
          playerBalance: this.state.playerBalance - amount,
          currentStage: stages.PLAYER_TURN
        });
      },
      (error) => { console.log(error); }
    );
  }

  hit() {
    axios.post(`http://localhost:8080/game/${this.state.gameId}/hit?playerId=${this.state.playerId}`)
    .then(
      (rsp) => {
        console.log(rsp);
        axios.get(`http://localhost:8080/game/${this.state.gameId}/status?playerId=${this.state.playerId}`)
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
        axios.get(`http://localhost:8080/game/${this.state.gameId}/status?playerId=${this.state.playerId}`)
        .then((rsp) => {
            console.log(rsp);
            this.setState({ dealerCards: rsp.data.dealerCards });

            axios.get(`http://localhost:8080/game/${this.state.gameId}/result?playerId=${this.state.playerId}`)
            .then((rsp) => {
              if (rsp.data.result === 1) {
                this.setState({ result: "You win!!! Now your balance is: " + rsp.data.newBalance });
              } else if (rsp.data.result === 0) {
                this.setState({ result: "Tied game! Now your balance is: " + rsp.data.newBalance });
              } else if (rsp.data.result === -1) {
                this.setState({ result: "You lose... Now your balance is: " + rsp.data.newBalance });
              }
              
              this.handleShowResultWithDelay(1.5);
              this.setState({ playerBalance: rsp.data.newBalance });
            });
        });
      },
      (error) => { console.log(error); }
    );
  }

  componentDidMount() {
    this.getPlayerInfo()
  }

  render() {
		return (
      <Container fluid>
        <Row style={{position: "relative", top: 20}}>
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
        <Row style={{position: "relative", top: 50}}>
          <Col >VS</Col>
        </Row>
        <Row style={{position: "relative", top: 100}}>
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
        <Row style={{position: "relative", top: 120}}>
          <Col>Current Balance: {this.state.playerBalance}</Col>
        </Row>
        <Row style={{position: "relative", top: 150}}>
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
