import React from 'react';
import '../styles/Joke.css';
import getColor from '../utils/getColor';

function Joke({ joke, votes, id, handleVote }) {
  return (
    <div className="Joke">
      <div className="Joke-buttons">
        <i className="fas fa-arrow-up" onClick={handleVote.bind(this, id, 1)} />
        <span className="Joke-votes" style={{ borderColor: getColor(votes) }}>
          {votes}
        </span>
        <i
          className="fas fa-arrow-down"
          onClick={handleVote.bind(this, id, -1)}
        />
      </div>
      <div className="Joke-text">{joke}</div>
      <div className="Joke-smiley">
        <i
          className="em em-rolling_on_the_floor_laughing"
          aria-label="ROLLING ON THE FLOOR LAUGHING"
        ></i>
      </div>
    </div>
  );
}

export default Joke;
