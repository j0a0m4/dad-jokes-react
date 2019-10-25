import React, { Component } from 'react';
import '../styles/JokeList.css';
import loadJoke from '../utils/loadJoke';
import Joke from './Joke';
import Loader from './Loader';
import uuid from 'uuid';
import Sidebar from './Sidebar';
import addToLocalStorage from '../utils/addToLocalStorage';
import getItemFromLocalStorage from '../utils/getItemFromLocalStorage';

class JokeList extends Component {
  static defaultProps = {
    numJokes: 10
  };

  state = {
    jokes: getItemFromLocalStorage('jokes'),
    hasLoaded: false
  };

  seenJokes = new Set(this.state.jokes.map(j => j.joke));

  componentDidMount() {
    if (this.state.jokes.length === 0) {
      this.getNewJokes();
    } else {
      this.setState({ hasLoaded: true });
    }
  }

  getNewJokes = async () => {
    try {
      this.setState({ hasLoaded: false });
      let jokesArr = [];
      while (jokesArr.length < this.props.numJokes) {
        let data = await loadJoke();
        if (!this.seenJokes.has(data.joke)) {
          jokesArr.push({ id: uuid(), joke: data.joke, votes: 0 });
        }
      }
      this.setState(st => {
        return { jokes: [...st.jokes, ...jokesArr], hasLoaded: true };
      }, addToLocalStorage('jokes', this.state.jokes));
    } catch (err) {
      this.setState({ hasLoaded: true });
      console.log(err);
    }
  };

  handleVote = (id, delta) => {
    function mapJokeVote(joke) {
      if (joke.id === id) {
        joke = { ...joke, votes: joke.votes + delta };
      }
      return joke;
    }

    this.setState(st => {
      return { jokes: st.jokes.map(mapJokeVote) };
    }, addToLocalStorage('jokes', this.state.jokes));
  };

  render() {
    const jokesList = this.state.hasLoaded
      ? this.state.jokes
          .sort((a, b) => b.votes - a.votes)
          .map(j => (
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
        <Sidebar
          handleClick={this.getNewJokes}
          hasLoaded={this.state.hasLoaded}
        />
        <div className="JokeList-jokes">
          {this.state.hasLoaded ? jokesList : <Loader />}
        </div>
      </div>
    );
  }
}

export default JokeList;
