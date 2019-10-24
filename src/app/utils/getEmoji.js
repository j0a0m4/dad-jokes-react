function getEmoji(votes) {
  if (votes >= 15) {
    return 'em em-rolling_on_the_floor_laughing';
  } else if (votes >= 12) {
    return 'em em-laughing';
  } else if (votes >= 9) {
    return 'em em-smiley';
  } else if (votes >= 6) {
    return 'em em-slightly_smiling_face';
  } else if (votes >= 3) {
    return 'em em-neutral_face';
  } else if (votes >= 0) {
    return 'em em-confused';
  } else {
    return 'em em-angry';
  }
}

export default getEmoji;
