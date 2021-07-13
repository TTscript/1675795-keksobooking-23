import {createOffer} from './data.js';
import {enablePageForms, disablePageForms} from './page.js';
import {translateTypes, getRoomsAndGuests} from './form.js';
import './form.js';

const OFFERS_NUMBER = 10;
const LAT_TOKYO = 35.6895000;
const LNG_TOKYO = 139.6917100;
const offers = createOffer(OFFERS_NUMBER);
const templateCardElement = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('.map__canvas');
const addressField = document.querySelector('#address');

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

//DOWNLOAD MAP

const loadMap = function () {
  disablePageForms();
  const map = L.map('map-canvas')
    .on('load', () => {
      enablePageForms();
    })
    .setView({
      lat: LAT_TOKYO,
      lng: LNG_TOKYO,
    }, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const marker = L.marker(
    {
      lat: LAT_TOKYO,
      lng: LNG_TOKYO,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  addressField.value = marker.getLatLng();

  marker.addTo(map);

  marker.on('move', (evt) => {
    addressField.value = `${evt.target.getLatLng().lat.toFixed(4)}, ${evt.target.getLatLng().lng.toFixed(4)}`;
  });

  offers.forEach((el) => {
    const lat = el.location.lat;
    const lng = el.location.lng;

    const pinIcon = L.icon({
      iconUrl: './img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const pinMarker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon: pinIcon,
      },
    );

    pinMarker
      .addTo(map)
      .bindPopup(renderCard(el));
  });
};

export {renderCard, loadMap};
