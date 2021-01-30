function getExchange(min, max) {
  if (min < 0 || max < 0) return 'Invalid parameter';
  if (min === max) {
    return min;
  }
  if (min < max) {
    return max + Math.random() * (min - max);
  }
  return min + Math.random() * (max - min);
}

function getRandom(min, max) {
  return Math.round(getExchange(min, max));
}

function randomFloat(min, max, e = 2) {
  return Math.fround(getExchange(min, max)).toFixed(e);
}

alert(getRandom(0, 200));
alert(randomFloat(0, 200));
