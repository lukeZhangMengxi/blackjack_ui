import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import React, {Component} from 'react';
import { Dialog, DialogActions, DialogTitle, DialogContent, TextField } from '@material-ui/core';

import 'bootstrap/dist/css/bootstrap.min.css';

const PokerMapper = require('./PokerMapper');

const stages = {
  LOGIN: 'LOGIN',
  SIGNUP: 'SIGNUP',
  IDLE: 'IDLE',
  BET: 'BET',
  PLAYER_TURN: 'PLAYER_TURN',
  PENDING: 'PENDING'
}

class SinglePlayerUI extends Component {

  state = {
    gameId: '',
    playerId: '',
    playerCards: [],
    playerBalance: 0,
    dealerCards: [],
    showResult: false,
    result: '',
    currentStage: stages.LOGIN,
    jwt: '',
    displayPlayerName: ''
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

  login(email, password) {
    axios.post(`http://localhost:8080/player/login?email=${email}&password=${password}`)
    .then(
      (rsp) => { 
        this.setState({ jwt: rsp.data.token, playerId: rsp.data.playerId, currentStage: stages.IDLE });
        this.getPlayerInfo();
      },
      (error) => {
        console.log(error);
        document.getElementById("login-message").style.color = "red";
        document.getElementById("login-message").innerText = "Login failed, please try again~";
      }
    )
  }

  signup(email, password, displayName) {
    axios.post(`http://localhost:8080/player/create?email=${email}&password=${password}&displayName=${displayName}`)
    .then(
      (rsp) => {
        this.setState({currentStage: stages.LOGIN});
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

  signout() {
    this.setState(
      {
        gameId: '',
        playerId: '',
        playerCards: [],
        playerBalance: 0,
        dealerCards: [],
        showResult: false,
        result: '',
        currentStage: stages.LOGIN,
        jwt: '',
        displayPlayerName: ''
      }
    );
  }

  getPlayerInfo() {
    axios.get(`http://localhost:8080/player/${this.state.playerId}`, {"headers": {"jwt" : this.state.jwt}})
    .then(
      (rsp) => { this.setState({ playerBalance: rsp.data.balance, displayPlayerName: rsp.data.displayName }); },
      (error) => { console.log(error); }
    )
  }

  start() {
    console.log('Starting the game!');
    axios.post(`http://localhost:8080/game/start?playerId=${this.state.playerId}`, null, {"headers": {"jwt" : this.state.jwt}})
    .then(
      (rsp) => {
        console.log(rsp);
        this.setState({ gameId: rsp.data });
        axios.get(`http://localhost:8080/game/${rsp.data}/status?playerId=${this.state.playerId}`, {"headers": {"jwt" : this.state.jwt}})
        .then((rsp) => {
            console.log(rsp);
            this.setState({ 
              playerCards: rsp.data.playerCards, dealerCards: rsp.data.dealerCards,
              currentStage: stages.BET
            });
        });
      },
      (error) => { console.log(error); }
    );
  }

  bet(amount) {
    axios.post(`http://localhost:8080/game/${this.state.gameId}/bet?playerId=${this.state.playerId}&bet=${amount}`, null, {"headers": {"jwt" : this.state.jwt}})
    .then(
      (rsp) => {
        this.setState({ 
          playerBalance: this.state.playerBalance - amount,
          currentStage: stages.PLAYER_TURN
        });
      },
      (error) => { console.log(error); }
    );
  }

  hit() {
    axios.post(`http://localhost:8080/game/${this.state.gameId}/hit?playerId=${this.state.playerId}`, null, {"headers": {"jwt" : this.state.jwt}})
    .then(
      (rsp) => {
        console.log(rsp);
        axios.get(`http://localhost:8080/game/${this.state.gameId}/status?playerId=${this.state.playerId}`, {"headers": {"jwt" : this.state.jwt}})
        .then((rsp) => {
            console.log(rsp);
            this.setState({ playerCards: rsp.data.playerCards });
        });
      },
      (error) => { console.log(error); }
    );
  }

  stand() {
    axios.post(`http://localhost:8080/game/${this.state.gameId}/stand?playerId=${this.state.playerId}`, null, {"headers": {"jwt" : this.state.jwt}})
    .then(
      (rsp) => {
        console.log(rsp);
        axios.get(`http://localhost:8080/game/${this.state.gameId}/status?playerId=${this.state.playerId}`, {"headers": {"jwt" : this.state.jwt}})
        .then((rsp) => {
            console.log(rsp);
            this.setState({ dealerCards: rsp.data.dealerCards });

            axios.get(`http://localhost:8080/game/${this.state.gameId}/result?playerId=${this.state.playerId}`, {"headers": {"jwt" : this.state.jwt}})
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

  render() {
		return (
      <Container fluid>
        <p>BlackJack UI, hello: {this.state.displayPlayerName}</p>
        <Row style={{position: "relative", top: 20}}>
          <Col sm={1}>Dealer's Cards: </Col>
          {
            this.state.dealerCards.map((element) => { return (
              <Col sm={1}>
                <Card style={{ width: 100 }}>
                  <Card.Img src={ './img/' + PokerMapper.getPokerImgName(element, '.png')} />
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
              <Col sm={1}>
                <Card style={{ width: 100 }}>
                  <Card.Img src={ './img/' + PokerMapper.getPokerImgName(element, '.png')} />
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
          { this.state.currentStage === stages.IDLE && <Col sm={2} offset={2}> <Button onClick={() => this.signout()}>Sign out</Button> </Col> }
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
          <Dialog
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={this.state.currentStage === stages.LOGIN}
            BackdropProps={{ timeout: 500 }}
          >
            <DialogTitle id="alert-dialog-title">Player login</DialogTitle>
            <DialogContent>
              <p id="login-message" style={{color:"red"}}></p>
              <TextField id="login-email" label="Email" variant="outlined" /><br/><br/>
              <TextField id="login-password" label="Password" variant="outlined" />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.login(
                document.getElementById("login-email").value, document.getElementById("login-password").value
              )} color="primary">Login</Button>
              <Button onClick={() => { this.setState({currentStage: stages.SIGNUP}); }} color="primary">Signup Now</Button>
            </DialogActions>
          </Dialog>
          <Dialog
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={this.state.currentStage === stages.SIGNUP}
            BackdropProps={{ timeout: 500 }}
          >
            <DialogTitle id="alert-dialog-title">Player Signup</DialogTitle>
            <DialogContent>
              <p id="signup-message" style={{color:"red"}}></p>
              <TextField id="signup-email" label="Email" variant="outlined" /> <br/><br/>
              <TextField id="signup-password" label="Password" variant="outlined" /> <br/><br/>
              <TextField id="signup-displayName" label="Display Name" variant="outlined" />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.signup(
                document.getElementById("signup-email").value,
                document.getElementById("signup-password").value,
                document.getElementById("signup-displayName").value
              )} color="primary">Signup</Button>
              <Button onClick={() => { this.setState({currentStage: stages.LOGIN}); }} color="primary">Cancel</Button>
            </DialogActions>
          </Dialog>
        </Row>
      </Container>
		)
  }
}

export default SinglePlayerUI;
