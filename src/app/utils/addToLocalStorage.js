function addToLocalStorage(key, value) {
  value = JSON.stringify(value);
  window.localStorage.setItem(key, value);
}

export default addToLocalStorage;
