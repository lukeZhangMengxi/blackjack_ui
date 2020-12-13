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


  render() {
    return (
      <div class="centered" style={{ width: "70%" }}>
        <br/>
        <Button>Create New Game</Button> <Button>Refresh List</Button>
        <br/><br/><br/>
        <b>List of Games:</b>
        <List>
          {
            mockGameListRsp.games.map((element) => {
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

}
