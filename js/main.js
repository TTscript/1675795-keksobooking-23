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


// TASK: MORE DETAILS

// В файле main.js на основе написанных в прошлом задании вспомогательных функций напишите необходимые функции для создания массива из 10 сгенерированных JS-объектов. Каждый объект массива — описание похожего объявления неподалёку.

// Структура каждого объекта должна быть следующей:

// author, объект — описывает автора. Содержит одно поле:
// avatar, строка — адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} — это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются.

function generateArrayRandomNumber (min, max) {
  let totalNumbers = max - min + 1;
  const arrayTotalNumbers = [];
  const arrayRandomNumbers = [];
  while (totalNumbers--) {
    arrayTotalNumbers.push(totalNumbers + min);
  }

  while (arrayTotalNumbers.length) {
    const tempRandomNumber = Math.round(Math.random() * (arrayTotalNumbers.length - 1));
    arrayRandomNumbers.push(arrayTotalNumbers[tempRandomNumber]);
    arrayTotalNumbers.splice(tempRandomNumber, 1);
  }

  return arrayRandomNumbers;
}

const author = {
  avatar: [
    'img/avatars/user01.png',
    'img/avatars/user02.png',
    'img/avatars/user03.png',
    'img/avatars/user04.png',
    'img/avatars/user05.png',
    'img/avatars/user06.png',
    'img/avatars/user07.png',
    'img/avatars/user08.png',
  ],
};

generateArrayRandomNumber(0, author.avatar.length - 1);


const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKIN_TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT_TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

// location, объект — местоположение в виде географических координат. Состоит из двух полей:
const getLocation = () => {
  const randomLat = getRandomFloatingPoint(35.65000, 35.70000, 5); // lat, число с плавающей точкой — широта, случайное значение от 35.65000 до 35.70000.
  const randomLng = getRandomFloatingPoint(139.70000, 139.80000, 5); // lng, число с плавающей точкой — долгота, случайное значение от 139.70000 до 139.80000.

  return {
    lat: randomLat,
    lng: randomLng,
  };
};

getLocation();

const getRandomArrayElements = (elements) => {
  const randomElements = elements[getRandomInteger(0, elements.length - 1)];
  return randomElements;
};

getRandomArrayElements(TYPE);

const getRandomArray = (randomArray) => {
  const createdRandomArray = new Array(getRandomInteger(1, randomArray.length - 1));
  const slicedRandomArray = randomArray.slice(0, createdRandomArray.length);
  return slicedRandomArray;
};

// offer, объект — содержит информацию об объявлении. Состоит из полей:
const createOffer = () => {
  const contrivedTitle = 'Придуманынй заголовок предложения';   // title, строка — заголовок предложения. Придумайте самостоятельно.
  const randomAdressLocationX = getLocation().lat;
  const randomAdressLocationY = getLocation().lng;  // address, строка — адрес предложения. Для простоты пусть пока составляется из географических координат по маске {{location.x}}, {{location.y}}.
  const randomPrice = getRandomInteger(1, 10000);   // price, число — стоимость. Случайное целое положительное число.
  const randomType = getRandomArray(TYPE);  // type, строка — одно из пяти фиксированных значений: palace, flat, house, bungalow или hotel.
  const randomRoom = getRandomInteger(1, 10); // rooms, число — количество комнат. Случайное целое положительное число.
  const randomGuests = getRandomInteger(1, 10);  // guests, число — количество гостей, которое можно разместить. Случайное целое положительное число.
  const randomCheckin = getRandomInteger(0, CHECKIN_TIME.length - 1); // checkin, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
  const randomCheckout = getRandomInteger(0, CHECKOUT_TIME.length - 1); // checkout, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
  const randomFeaturesArrayLength = getRandomInteger(0, FEATURES.length - 1);   // features, массив строк — массив случайной длины из значений: wifi, dishwasher, parking, washer, elevator, conditioner. Значения не должны повторяться.
  const contrivedDescription = 'Придуманное описание помещения';  // description, строка — описание помещения. Придумайте самостоятельно.
  const randomPhotosArrayLength = getRandomArray(PHOTOS);   // photos, массив строк — массив случайной длины из значений: https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg, https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg, https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg.

  return {
    title: contrivedTitle,
    address: `Координаты долготы: ${randomAdressLocationX}, координаты широты: ${randomAdressLocationY}`,
    price: randomPrice,
    type: randomType,
    rooms: randomRoom,
    guests: randomGuests,
    checkin: CHECKIN_TIME[randomCheckin],
    checkout: CHECKOUT_TIME[randomCheckout],
    features: FEATURES[randomFeaturesArrayLength],
    description: contrivedDescription,
    photos: randomPhotosArrayLength,
  };
};

createOffer();
