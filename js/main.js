// RANDOM INTEGER NUMBER

function getRandomInteger(min, max) {
  if (min > max) {
    [min, max] = [max, min];
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomInteger(1, 2);

//RANDOM NUMBER WITH FLOATING POINT

function getRandomFloatingPoint(min, max, rounding) {
  if (min > max) {
    [min, max] = [max, min];
  }

  const coast = Math.random() * (max - min) + min;
  return coast.toFixed(rounding);
}
getRandomFloatingPoint(1, 32, 4);
