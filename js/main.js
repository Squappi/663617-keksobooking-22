function getExchange(min, max) {
  if (min === max) {
    return min;
  }
  if (min < max) {
    return max + Math.random() * (min + 1 - max);
  }
  return min + Math.random() * (max + 1 - min);
}

function getRandom(min, max) {
  return Math.round(getExchange(min, max));
}

function randomFloat(min, max) {
  return Math.fround(getExchange(min, max)).toFixed(2);
}

alert(getRandom(0, 100));
alert(randomFloat(0, 100));