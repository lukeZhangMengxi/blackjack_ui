import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import React, {Component} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

var dealerCards = ["1#0", "12#1", "9#3"];
var playerCards = ["5#2", "14#0", "10#2"];
var buttons = ["Hit", "Stand"];

class GridSystemExample extends Component {

  render() {
		return (
      <Container fluid>
        <Row>
          <Col sm={1}>Dealer's Cards: </Col>
          {
            dealerCards.map((element) => { return (
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
            playerCards.map((element) => { return (
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
          {
            buttons.map((element) => { return (
              <Col sm={2} offset={2}>
                <Button>{element}</Button>
              </Col>
            )})
          }
        </Row>
        <Row style={{position: "relative", top: 150}}>
          <Col>-</Col>
        </Row>
      </Container>
		)
  }
}

export default GridSystemExample;
