// RANDOM INTEGER NUMBER

function getRandomInteger(min, max) {
  if (min > max) {
    [min, max] = [max, min];
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//RANDOM NUMBER WITH FLOATING POINT

function getRandomFloatingPoint(min, max, rounding) {
  if (min > max) {
    [min, max] = [max, min];
  }

  const coast = Math.random() * (max - min) + min;
  return coast.toFixed(rounding);
}

//RANDOM ARRAY

const getRandomArray = (randomArray) => {
  const createdRandomArray = new Array(getRandomInteger(1, randomArray.length - 1));
  const slicedRandomArray = randomArray.slice(0, createdRandomArray.length);
  return slicedRandomArray;
};

//IS ESC EVENT
const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export {getRandomInteger, getRandomFloatingPoint, getRandomArray, isEscEvent};

