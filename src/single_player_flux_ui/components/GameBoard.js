import axios from 'axios'
import React, { Component } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

import { stages } from '../reducers/Reducers'
import { getPokerImgName } from '../../PokerMapper'

export default class GameBoard extends Component {

  render() {
    return (
      <Container fluid>
        <p>BlackJack UI, hello: {this.props.playerName}</p>
        <Row style={{ position: "relative", top: 20 }}>
          <Col sm={1}>Dealer's Cards: </Col>
          {
            this.props.dealerCards.map((element) => {
              return (
                <Col sm={1}>
                  <Card style={{ width: 100 }}>
                    <Card.Img src={'./img/' + getPokerImgName(element, '.png')} />
                  </Card>
                </Col>
              )
            })
          }
        </Row>
        <Row style={{ position: "relative", top: 50 }}>
          <Col >VS</Col>
        </Row>
        <Row style={{ position: "relative", top: 100 }}>
          <Col sm={1}>Your Cards: </Col>
          {
            this.props.playerCards.map((element) => {
              return (
                <Col sm={1}>
                  <Card style={{ width: 100 }}>
                    <Card.Img src={'./img/' + getPokerImgName(element, '.png')} />
                  </Card>
                </Col>
              )
            })
          }
        </Row>
        <Row style={{ position: "relative", top: 120 }}>
          <Col>Current Balance: {this.props.playerBalance}</Col>
        </Row>
        <Row style={{ position: "relative", top: 150 }}>
          {this.props.currentStage === stages.IDLE && <Col sm={2} offset={2}> <Button onClick={() => this.start()}>Start</Button> </Col>}
          {this.props.currentStage === stages.PLAYER_TURN && <Col sm={2} offset={2}> <Button onClick={() => this.hit()}>Hit</Button> </Col>}
          {this.props.currentStage === stages.PLAYER_TURN && <Col sm={2} offset={2}> <Button onClick={() => this.stand()}>Stand</Button> </Col>}
          {this.props.currentStage === stages.IDLE && <Col sm={2} offset={2}> <Button onClick={() => this.props.onSignOutClick()}>Sign out</Button> </Col>}
        </Row>
      </Container>
    )
  }

  start() {
    axios.post(`http://localhost:8080/game/start?playerId=${this.props.playerId}`, null, { "headers": { "jwt": this.props.jwt } })
      .then(
        (rsp) => {
          let gameId = rsp.data;
          axios.get(`http://localhost:8080/game/${gameId}/status?playerId=${this.props.playerId}`, { "headers": { "jwt": this.props.jwt } })
            .then((rsp) => {
              this.props.onGameStartClick(gameId, [...rsp.data.dealerCards], [...rsp.data.playerCards]);
              this.props.updateParent();
            });
        },
        (error) => { console.log(error); }
      );
  }

  hit() {
    axios.post(`http://localhost:8080/game/${this.props.gameId}/hit?playerId=${this.props.playerId}`, null, { "headers": { "jwt": this.props.jwt } })
      .then(
        (rsp) => {
          console.log(rsp);
          axios.get(`http://localhost:8080/game/${this.props.gameId}/status?playerId=${this.props.playerId}`, { "headers": { "jwt": this.props.jwt } })
            .then((rsp) => {
              console.log(rsp);
              this.props.onGameHitClick(rsp.data.playerCards);
              this.props.updateParent();
            });
        },
        (error) => { console.log(error); }
      );
  }

  stand() {
    axios.post(`http://localhost:8080/game/${this.props.gameId}/stand?playerId=${this.props.playerId}`, null, { "headers": { "jwt": this.props.jwt } })
      .then(
        (rsp) => {
          console.log(rsp);
          this.props.onGameStandClick();
          axios.get(`http://localhost:8080/game/${this.props.gameId}/status?playerId=${this.props.playerId}`, { "headers": { "jwt": this.props.jwt } })
            .then((rsp) => {
              console.log(rsp);
              this.props.dealerDone(rsp.data.dealerCards)
              this.props.updateParent();

              // axios.get(`http://localhost:8080/game/${this.props.gameId}/result?playerId=${this.props.playerId}`, {"headers": {"jwt" : this.props.jwt}})
              // .then((rsp) => {
              //   if (rsp.data.result === 1) {
              //     this.setState({ result: "You win!!! Now your balance is: " + rsp.data.newBalance });
              //   } else if (rsp.data.result === 0) {
              //     this.setState({ result: "Tied game! Now your balance is: " + rsp.data.newBalance });
              //   } else if (rsp.data.result === -1) {
              //     this.setState({ result: "You lose... Now your balance is: " + rsp.data.newBalance });
              //   }

              //   this.handleShowResultWithDelay(1.5);
              //   this.setState({ playerBalance: rsp.data.newBalance });
              // });
            });
        },
        (error) => { console.log(error); }
      );
  }

}
