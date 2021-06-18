const OFFERS_NUMBER = 10;

const MIN_LOCATION_VALUE = 35.65000;
const MAX_LOCATION_VALUE = 35.70000;

const MIN_LOCATION_LNG_VALUE = 139.70000;
const MAX_LOCATION_LNG_VALUE = 139.80000;

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKIN_SLOTS = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT_SLOTS = [
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
  avatar: [],
};

for (let index = 1; index <= 8; index++) {
  author.avatar.push(`img/avatars/user0${index}.png`);
}

const minAvatarArrayLength = 0;
generateArrayRandomNumber(minAvatarArrayLength, author.avatar.length - 1);

// location, объект — местоположение в виде географических координат. Состоит из двух полей:
const getLocation = () => {
  const roundingForLocationValue = 5;
  const randomLat = getRandomFloatingPoint(MIN_LOCATION_VALUE, MAX_LOCATION_VALUE, roundingForLocationValue); // lat, число с плавающей точкой — широта, случайное значение от 35.65000 до 35.70000.
  const randomLng = getRandomFloatingPoint(MIN_LOCATION_LNG_VALUE, MAX_LOCATION_LNG_VALUE, roundingForLocationValue); // lng, число с плавающей точкой — долгота, случайное значение от 139.70000 до 139.80000.
  return {
    lat: randomLat,
    lng: randomLng,
  };
};

const getRandomArray = (randomArray) => {
  const createdRandomArray = new Array(getRandomInteger(1, randomArray.length - 1));
  const slicedRandomArray = randomArray.slice(0, createdRandomArray.length);
  return slicedRandomArray;
};


// offer, объект — содержит информацию об объявлении. Состоит из полей:
const createOffer = (offersNumber) => {

  const randomLocation = getLocation(); // address, строка — адрес предложения. Для простоты пусть пока составляется из географических координат по маске {{location.x}}, {{location.y}}.

  const minPrice = 1;
  const maxPrice = 10000;

  const minRooms = 1;
  const maxRooms = 10;

  const minGuests = 1;
  const maxGuests = 10;

  const minCheckingSlotsArrayLength = 0;

  const minCheckoutSlotsArrayLength = 0;

  const minTypesArrayLength = 0;

  const offer = {
    title: 'Придуманынй заголовок предложения', // title, строка — заголовок предложения. Придумайте самостоятельно.
    address: `${randomLocation.lat}, ${randomLocation.lng}`,
    price: getRandomInteger(minPrice, maxPrice), // price, число — стоимость. Случайное целое положительное число.
    type: TYPES[getRandomInteger(minTypesArrayLength, FEATURES.length - 1)], // type, строка — одно из пяти фиксированных значений: palace, flat, house, bungalow или hotel.
    rooms: getRandomInteger(minRooms, maxRooms), // rooms, число — количество комнат. Случайное целое положительное число.
    guests: getRandomInteger(minGuests, maxGuests), // guests, число — количество гостей, которое можно разместить. Случайное целое положительное число.
    checkin: CHECKIN_SLOTS[getRandomInteger(minCheckingSlotsArrayLength, CHECKIN_SLOTS.length - 1)], // checkin, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
    checkout: CHECKOUT_SLOTS[getRandomInteger(minCheckoutSlotsArrayLength, CHECKOUT_SLOTS.length - 1)], // checkout, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
    features: getRandomArray(FEATURES), // features, массив строк — массив случайной длины из значений: wifi, dishwasher, parking, washer, elevator, conditioner. Значения не должны повторяться.
    description: 'Придуманное описание помещения', // description, строка — описание помещения. Придумайте самостоятельно.
    photos: getRandomArray(PHOTOS), // photos, массив строк — массив случайной длины из значений: https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg, https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg, https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg.
  };

  const offers = [];

  for (let startNumber = 0; startNumber < offersNumber; startNumber++) {
    offers.push(author, offer);
  }

  return offers;
};

const taskObject = createOffer(OFFERS_NUMBER);
taskObject;

