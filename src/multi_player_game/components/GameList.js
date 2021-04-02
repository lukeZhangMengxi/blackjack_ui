import axios from 'axios'
import React, { Component } from 'react'
import { List, ListItem, ListItemText } from '@material-ui/core'
import { Button } from 'react-bootstrap'

import '../../index.css'

const mockGameListRsp = {
  "games": [
    {
      "id": "e975fdd1-5c0a-4b45-8551-70b9286eee7f",
      "playerNames": [
        "New Player",
        "Luke1212",
        "PlayerABCD"
      ],
      "started": false
    },
    {
      "id": "5a549aed-5628-432b-a72e-7fb86a744afd",
      "playerNames": [
        "Player1212"
      ],
      "started": false
    },
    {
      "id": "488bb485-a973-496c-9025-f811bae71fba",
      "playerNames": [
        "Player1011"
      ],
      "started": false
    },
    {
      "id": "5a549aed-5628-432b-a72e-7fb86a744afd",
      "playerNames": [
        "Player2048"
      ],
      "started": true
    }
  ]
}

export default class GameList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      games: []
    };
    this.refersh_game_list();
  }


  render() {
    return (
      <div class="centered" style={{ width: "70%" }}>
        <p>BlackJack UI, hello: {this.props.playerName}</p>
        <Button onClick={() => this.create_game()}>Create New Game</Button> <Button onClick={() => this.refersh_game_list()}>Refresh List</Button>
        <br /><br /><br />
        <b>List of Games:</b>
        <List>
          {
            this.state.games.map((element) => {
              if (!element.started) {
                return (
                  <ListItem style={{ margin: "3px", background: "#DCDCDC" }}>
                    <ListItemText>
                      Game with: <b>{element.playerNames.join(', ')}</b>
                    </ListItemText>
                    <Button>Join</Button>
                  </ListItem>
                )
              }
            })
          }
        </List>
      </div>
    )
  }

  refersh_game_list() {
    axios.get(`http://localhost:8080/mpgame/list`)
      .then((rsp) => {
        this.state.games = rsp.data.games;
        this.props.updateParent();
      });
  }

  create_game() {
    axios.post(
      `http://localhost:8080/mpgame/create?ownerId=${this.props.playerId}`,
      null,
      { "headers": { "jwt": this.props.jwt } }
    ).then((rsp) => {
      this.refersh_game_list();
    });
  }

}
