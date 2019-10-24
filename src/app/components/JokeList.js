import React, { Component } from 'react';
import '../styles/JokeList.css';
import loadJoke from '../utils/loadJoke';
import Joke from './Joke';

class JokeList extends Component {
  static defaultProps = {
    numJokes: 10
  };

  constructor(props) {
    super(props);

    this.state = {
      jokes: {},
      hasLoaded: false
    };
  }
  async componentDidMount() {
    let jokesArr = [];
    while (jokesArr.length < this.props.numJokes) {
      let data = await loadJoke();
      jokesArr.push({ joke: data.joke, votes: 0 });
    }
    this.setState(st => {
      return { jokes: jokesArr, hasLoaded: true };
    });
  }
  render() {
    const jokesList = this.state.hasLoaded
      ? this.state.jokes.map(j => <Joke joke={j.joke} votes={j.votes} />)
      : undefined;

    return this.state.hasLoaded ? (
      <div className="JokeList">
        <div className="JokeList-sidebar">
          <h1 className="JokeList-title">
            <span>Dad</span> Jokes
          </h1>
          <img
            src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
            alt="laughig emoji"
          />
          <button className="JokeList-getmore">Fetch Jokes</button>
        </div>
        <div className="JokeList-jokes">{jokesList}</div>
      </div>
    ) : (
      <div className="JokeList">
        <div className="JokeList-sidebar">
          <h1 className="JokeList-title">
            <span>Dad</span> Jokes
          </h1>
          <img
            src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
            alt="laughig emoji"
          />
          <button disabled className="JokeList-getmore">
            Loading
          </button>
        </div>
      </div>
    );
  }
}

export default JokeList;
