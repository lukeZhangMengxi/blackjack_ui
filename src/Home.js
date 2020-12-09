import React from 'react';
import { Link } from 'react-router';


class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to the Game Center</h1>
        <h6>Please select a game to play:</h6>
        <ul>
          <li><Link to="/game">Single Player Game</Link></li>
          <li><Link to="/game_flux">Single Player Game Flux</Link></li>
        </ul>
      </div>
    )
  }
}
export default Home;
