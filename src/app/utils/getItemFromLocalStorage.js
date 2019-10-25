function getItemFromLocalStorage(key) {
  const item = window.localStorage.getItem(key);
  return JSON.parse(item || '[]');
}

export default getItemFromLocalStorage;
