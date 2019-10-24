import React from 'react';
import '../styles/Joke.css';

function Joke({ joke, votes }) {
  return (
    <div className="Joke">
      <div className="Joke-buttons">
        <i className="fas fa-arrow-up" />
        <span className="Joke-votes">{votes}</span>
        <i className="fas fa-arrow-down" />
      </div>
      <div className="Joke-text">{joke}</div>
    </div>
  );
}

export default Joke;
