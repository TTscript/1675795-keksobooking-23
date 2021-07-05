import {createOffer} from './data.js';

const OFFERS_NUMBER = 10;
const offers = createOffer(OFFERS_NUMBER);
const templateCardElement = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('.map__canvas');

//FUNCTION TRANSLATE TYPES
const translateTypes = function (type) {
  switch (type.offer.type) {
    case 'flat':
      type.offer.type = 'Квартира';
      break;
    case 'bungalow':
      type.offer.type = 'Бунгало';
      break;
    case 'house':
      type.offer.type= 'Дом';
      break;
    case 'palace':
      type.offer.type= 'Дворец';
      break;
    case 'hotel':
      type.offer.type= 'Отель';
      break;
  }
  return type.offer.type;
};


//FUNCTION COSTS QUANTITY ROOMS AND GUESTS
const getRoomsAndGuests = function (roomsValue, guestsValue) {
  let rooms = '';
  let guests = '';
  if (roomsValue === 1) {
    rooms = `${roomsValue} комната`;
  } else if (roomsValue === 2 || roomsValue === 3 || roomsValue === 4) {
    rooms = `${roomsValue} комнаты`;
  } else {
    rooms = `${roomsValue} комнат`;
  }

  if (guestsValue === 1) {
    guests = `${guestsValue} гостя`;
  } else {
    guests = `${guestsValue} гостей`;
  }
  return `${rooms} для ${guests}`;
};

//FUNCTION RENDERS CARDS

const renderCard = function (element) {
  const templateItem = templateCardElement.cloneNode(true);

  templateItem.querySelector('.popup__title').textContent = element.offer.title;
  templateItem.querySelector('.popup__text--address').textContent = element.offer.address;
  templateItem.querySelector('.popup__text--price').textContent = `${element.offer.price}₽/ночь`;

  translateTypes(element);
  templateItem.querySelector('.popup__type').textContent = element.offer.type;
  templateItem.querySelector('.popup__text--capacity').textContent = getRoomsAndGuests(element.offer.rooms, element.offer.guests);
  templateItem.querySelector('.popup__text--time').textContent = `Заезд после ${element.offer.checkin} выезд до ${element.offer.checkout}`;

  const modifiers = element.offer.features.map((feature) => `popup__feature--${feature}`);
  templateItem.querySelectorAll('.popup__feature').forEach((item) => {
    const modifier = item.classList[1];
    if (!modifiers.includes(modifier)) {
      item.remove();
    }
  });

  templateItem.querySelector('.popup__description').textContent = element.offer.description;
  const photoCatalog = templateItem.querySelector('.popup__photos');
  const photoCard = photoCatalog.querySelector('.popup__photo');
  element.offer.photos.map((link) => {
    photoCard.remove();
    const photoElement = photoCatalog.insertAdjacentHTML('beforeend', `<img src="${link}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
    return photoElement;
  });

  mapCanvas.appendChild(templateItem);
  return templateItem;
};

renderCard(offers[0]);
renderCard(offers[1]);
