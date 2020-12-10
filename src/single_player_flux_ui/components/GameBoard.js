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
          {this.props.currentStage === stages.PLAYER_TURN && <Col sm={2} offset={2}> <Button onClick={() => console.log('hit')}>Hit</Button> </Col>}
          {this.props.currentStage === stages.PLAYER_TURN && <Col sm={2} offset={2}> <Button onClick={() => console.log('stand')}>Stand</Button> </Col>}
          {this.props.currentStage === stages.IDLE && <Col sm={2} offset={2}> <Button onClick={() => this.props.onSignOutClick()}>Sign out</Button> </Col>}
        </Row>
      </Container>
    )
  }

  start() {
    axios.post(`http://localhost:8080/game/start?playerId=${this.props.playerId}`, null, {"headers": {"jwt" : this.props.jwt}})
    .then(
      (rsp) => {
        let gameId = rsp.data;
        axios.get(`http://localhost:8080/game/${gameId}/status?playerId=${this.props.playerId}`, {"headers": {"jwt" : this.props.jwt}})
        .then((rsp) => {
            this.props.onGameStartClick(gameId, [...rsp.data.dealerCards], [...rsp.data.playerCards]);
            this.props.updateParent();
        });
      },
      (error) => { console.log(error); }
    );
  }

}
