// RANDOM INTEGER NUMBER

// Source --- https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random#%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5_%D1%81%D0%BB%D1%83%D1%87%D0%B0%D0%B9%D0%BD%D0%BE%D0%B3%D0%BE_%D1%86%D0%B5%D0%BB%D0%BE%D0%B3%D0%BE_%D1%87%D0%B8%D1%81%D0%BB%D0%B0_%D0%B2_%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%BD%D0%BE%D0%BC_%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%B2%D0%B0%D0%BB%D0%B5

function getRandomItegerNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min > max) {
    [min, max] = [max, min];
  }

  if (min === max) {
    min = (max - min) + 1;
    max = max+=2;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomItegerNumber();


//RANDOM NUMBER WITH FLOATING POINT

//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random#%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5_%D1%81%D0%BB%D1%83%D1%87%D0%B0%D0%B9%D0%BD%D0%BE%D0%B3%D0%BE_%D1%87%D0%B8%D1%81%D0%BB%D0%B0_%D0%BE%D1%82_0_(%D0%B2%D0%BA%D0%BB%D1%8E%D1%87%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE)_%D0%B4%D0%BE_1_(%D0%BD%D0%B5_%D0%B2%D0%BA%D0%BB%D1%8E%D1%87%D0%B0%D1%8F)

function getRandomFloatingPoint(min, max) {
  if (min > max) {
    [min, max] = [max, min];
  }

  if (min === max) {
    min = (max - min) + 1;
    max = max+=2;
  }
  return Math.random() * (max - min) + min;
}
getRandomFloatingPoint();
