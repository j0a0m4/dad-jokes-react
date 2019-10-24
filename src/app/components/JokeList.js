import React, { Component } from 'react';
import '../styles/JokeList.css';
import loadJoke from '../utils/loadJoke';
import Joke from './Joke';
import Loader from './Loader';
import uuid from 'uuid';

class JokeList extends Component {
  static defaultProps = {
    numJokes: 10
  };

  state = {
    jokes: {},
    hasLoaded: false
  };

  async componentDidMount() {
    let jokesArr = [];
    while (jokesArr.length < this.props.numJokes) {
      let data = await loadJoke();
      jokesArr.push({ id: uuid(), joke: data.joke, votes: 0 });
    }
    this.setState(st => {
      return { jokes: jokesArr, hasLoaded: true };
    });
  }

  handleVote = (id, delta) => {
    function mapJokeVote(joke) {
      if (joke.id === id) {
        joke = { ...joke, votes: joke.votes + delta };
      }
      return joke;
    }

    this.setState(st => {
      return { jokes: st.jokes.map(mapJokeVote) };
    });
  };

  render() {
    const jokesList = this.state.hasLoaded
      ? this.state.jokes.map(j => (
          <Joke
            key={j.id}
            id={j.id}
            joke={j.joke}
            votes={j.votes}
            handleVote={this.handleVote}
          />
        ))
      : undefined;

    return (
      <div className="JokeList">
        <div className="JokeList-sidebar">
          <h1 className="JokeList-title">
            <span>Dad</span> Jokes
          </h1>
          <img
            src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
            alt="laughing emoji"
          />
          <button className="JokeList-getmore" disabled={!this.state.hasLoaded}>
            {this.state.hasLoaded ? 'Fetch Jokes' : 'Fetching Jokes'}
          </button>
        </div>
        <div className="JokeList-jokes">
          {this.state.hasLoaded ? jokesList : <Loader />}
        </div>
      </div>
    );
  }
}

export default JokeList;
