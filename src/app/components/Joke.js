import React from 'react';
import '../styles/Joke.css';
import Emoji from './Emoji';
import getColor from '../utils/getColor';
import getEmoji from '../utils/getEmoji';

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
      <div className="Joke-emoji">
        <Emoji i={getEmoji(votes)} />
      </div>
    </div>
  );
}

export default Joke;
