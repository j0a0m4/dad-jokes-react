import React, { Component } from 'react';
import '../styles/JokeList.css';
import loadJoke from '../utils/loadJoke';
import Joke from './Joke';
import Loader from './Loader';
import uuid from 'uuid';
import Sidebar from './Sidebar';

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
        <Sidebar hasLoaded={this.state.hasLoaded} />
        <div className="JokeList-jokes">
          {this.state.hasLoaded ? jokesList : <Loader />}
        </div>
      </div>
    );
  }
}

export default JokeList;
