import Axios from 'axios';

async function loadJoke() {
  const API_URL =
    'https://cors-anywhere.herokuapp.com/https://icanhasdadjoke.com';
  const header = {
    headers: { Accept: 'application/json' }
  };
  let res = await Axios.get(API_URL, header);
  return res.data;
}

export default loadJoke;
