import {getRandomFloatingPoint, getRandomInteger, getRandomArray} from './util.js';

//LOCATION

const MIN_LOCATION_VALUE = 35.65000;
const MAX_LOCATION_VALUE = 35.70000;

const MIN_LOCATION_LNG_VALUE = 139.70000;
const MAX_LOCATION_LNG_VALUE = 139.80000;

const getLocation = () => {
  const roundingForLocationValue = 5;
  const randomLat = getRandomFloatingPoint(MIN_LOCATION_VALUE, MAX_LOCATION_VALUE, roundingForLocationValue); // lat, число с плавающей точкой — широта, случайное значение от 35.65000 до 35.70000.
  const randomLng = getRandomFloatingPoint(MIN_LOCATION_LNG_VALUE, MAX_LOCATION_LNG_VALUE, roundingForLocationValue); // lng, число с плавающей точкой — долгота, случайное значение от 139.70000 до 139.80000.
  return {
    lat: randomLat,
    lng: randomLng,
  };
};

//FINISH OFFERS

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

const MIN_PRICE = 1;
const MAX_PRICE = 10000;

const MIN_ROOMS = 1;
const MAX_ROOMS = 10;

const MIN_GUESTS = 1;
const MAX_GUESTS = 10;

const MIN_CHECKING_SLOTS_ARRAY_LENGTH = 0;

const MIN_CHECKOUT_SLOTS_ARRAY_LENGTH = 0;

const MIN_TYPES_ARRAY_LENGTH = 0;

const createOffer = (offersNumber) => {
  const offers = [];

  for (let startNumber = 0; startNumber < offersNumber; startNumber++) {
    const randomLocation = getLocation(); // address, строка — адрес предложения. Для простоты пусть пока составляется из географических координат по маске {{location.x}}, {{location.y}}.

    const createAvatar = function () {
      if (startNumber >= 9) {
        const currentAvatar = `img/avatars/user${startNumber + 1}.png`;
        return currentAvatar;
      } else {
        const currentAvatar = `img/avatars/user0${startNumber + 1}.png`;
        return currentAvatar;
      }
    };

    const offer = {
    // author, объект — описывает автора. Содержит одно поле:
    // avatar, строка — адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} — это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются.
      author: {
        avatar: createAvatar(),
      },

      offer: {
        title: 'Придуманынй заголовок предложения', // title, строка — заголовок предложения. Придумайте самостоятельно.
        address: `${randomLocation.lat}, ${randomLocation.lng}`,
        price: getRandomInteger(MIN_PRICE, MAX_PRICE), // price, число — стоимость. Случайное целое положительное число.
        type: TYPES[getRandomInteger(MIN_TYPES_ARRAY_LENGTH, FEATURES.length - 1)], // type, строка — одно из пяти фиксированных значений: palace, flat, house, bungalow или hotel.
        rooms: getRandomInteger(MIN_ROOMS, MAX_ROOMS), // rooms, число — количество комнат. Случайное целое положительное число.
        guests: getRandomInteger(MIN_GUESTS, MAX_GUESTS), // guests, число — количество гостей, которое можно разместить. Случайное целое положительное число.
        checkin: CHECKIN_SLOTS[getRandomInteger(MIN_CHECKING_SLOTS_ARRAY_LENGTH, CHECKIN_SLOTS.length - 1)], // checkin, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
        checkout: CHECKOUT_SLOTS[getRandomInteger(MIN_CHECKOUT_SLOTS_ARRAY_LENGTH, CHECKOUT_SLOTS.length - 1)], // checkout, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
        features: getRandomArray(FEATURES), // features, массив строк — массив случайной длины из значений: wifi, dishwasher, parking, washer, elevator, conditioner. Значения не должны повторяться.
        description: 'Придуманное описание помещения', // description, строка — описание помещения. Придумайте самостоятельно.
        photos: getRandomArray(PHOTOS), // photos, массив строк — массив случайной длины из значений: https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg, https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg, https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg.
      },

      location: getLocation(),
    };

    offers.push(offer);
  }

  return offers;
};

export {createOffer};
