import {createOffer} from './data.js';

const OFFERS_NUMBER = 10;

const offers = createOffer(OFFERS_NUMBER);
offers;

const templateCardElement = document.querySelector('#card').content.querySelector('.popup');
const popupTitle = templateCardElement.querySelector('.popup__title');
const popupAdress = templateCardElement.querySelector('.popup__text--address');
const popupPrice = templateCardElement.querySelector('.popup__text--price');
const popupType = templateCardElement.querySelector('.popup__type');
const popupCapacity = templateCardElement.querySelector('.popup__text--capacity');
const popupTime = templateCardElement.querySelector('.popup__text--time');
const popupFeaturesList = templateCardElement.querySelector('.popup__features');
const popupFeaturesElement = popupFeaturesList.querySelectorAll('.popup__feature');
const popupDescription = templateCardElement.querySelector('.popup__description');
const popupPhotos = templateCardElement.querySelector('.popup__photos');
const popupPhoto = popupPhotos.querySelector('.popup__photo');

offers.forEach((element) => {
  const templateItem = templateCardElement.cloneNode(true);
  popupTitle.textContent = element.offer.title;
  popupAdress.textContent = element.offer.address;
  popupPrice.textContent = `${element.offer.price}₽/ночь`;

  const translateTypes = function (type) {
    if (type === 'flat') {
      type = 'Квартира';
    } else if (type === 'bungalow') {
      type = 'Бунгало';
    } else if (type === 'house') {
      type = 'Дом';
    } else if (type === 'palace') {
      type = 'Дворец';
    } else if (type === 'hotel') {
      type = 'Отель';
    }
    return type;
  };
  popupType.textContent = translateTypes(element.offer.type);
  const getRoomsAndGuests = function () {
    let rooms = '';
    let guests = '';
    if (element.offer.rooms === 1) {
      rooms = `${element.offer.rooms} комната`;
    } else if (element.offer.rooms === 2 || element.offer.rooms === 3 || element.offer.rooms === 4) {
      rooms = `${element.offer.rooms} комнаты`;
    } else {
      rooms = `${element.offer.rooms} комнат`;
    }

    if (element.offer.guests === 1) {
      guests = `${element.offer.guests} гостя`;
    } else {
      guests = `${element.offer.guests} гостей`;
    }
    return `${rooms} для ${guests}`;
  };
  popupCapacity.textContent = getRoomsAndGuests();
  popupTime.textContent = `Заезд после ${element.offer.checkin} выезд до ${element.offer.checkout}`;

  const modifiers = element.offer.features.map((feature) => `popup__feature--${feature}`);
  popupFeaturesElement.forEach((item) => {
    const modifier = item.classList[1];

    if (!modifiers.includes(modifier)) {
      item.remove();
    }
  });

  popupDescription.textContent = element.offer.description;
  element.offer.photos.map((link) => {
    popupPhoto.remove();
    const photoElement = popupPhotos.insertAdjacentHTML('beforeend', `<img src="${link}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
    return photoElement;
  });

  return templateItem;
});
