import {disablePageForms, enableMainForm, enableFilters} from './page.js';
import {getRoomsAndGuests, createFetch, resetButton, onDataErrorLoad} from './form.js';
import './form.js';
import {sendRequest} from './api.js';

const LAT_TOKYO = 35.6895000;
const LNG_TOKYO = 139.6917100;
const OFFERS_NUMBER = 10;
const templateCardElement = document.querySelector('#card').content.querySelector('.popup');
const addressField = document.querySelector('#address');
const mapFilters = document.querySelector('.map__filters-container');
const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
let map;

const typeToTranslation = {
  bungalow: 'Бунгало',
  flat: 'Квартира',
  hotel: 'Отель',
  house:'Дом',
  palace: 'Дворец',
};

//FUNCTION RENDERS CARDS

const renderCard = function (element) {
  const templateItem = templateCardElement.cloneNode(true);
  templateItem.querySelector('.popup__avatar').src = element.author.avatar;
  templateItem.querySelector('.popup__title').textContent = element.offer.title;
  templateItem.querySelector('.popup__text--address').textContent = element.offer.address;
  templateItem.querySelector('.popup__text--price').textContent = `${element.offer.price}₽/ночь`;
  templateItem.querySelector('.popup__type').textContent = typeToTranslation[element.offer.type];
  templateItem.querySelector('.popup__text--capacity').textContent = getRoomsAndGuests(element.offer.rooms, element.offer.guests);
  templateItem.querySelector('.popup__text--time ').textContent = `Заезд после ${element.offer.checkin} выезд до ${element.offer.checkout}`;
  const featuresArray = element.offer.features;

  if (featuresArray === undefined) {
    templateItem.querySelector('.popup__features').classList.add('hidden');
  } else {
    const modifiers = element.offer.features.map((feature) => `popup__feature--${feature}`);
    templateItem.querySelectorAll('.popup__feature').forEach((item) => {
      const modifier = item.classList[1];
      if (!modifiers.includes(modifier)) {
        item.remove();
      }
    });
  }

  templateItem.querySelector('.popup__description').textContent = element.offer.description;
  const photoCatalog = templateItem.querySelector('.popup__photos');
  const photoCard = photoCatalog.querySelector('.popup__photo');

  if (element.offer.photos === undefined) {
    photoCatalog.classList.add('hidden');
  }
  else {
    element.offer.photos.map((link) => {
      photoCard.remove();
      const photoElement = photoCatalog.insertAdjacentHTML('beforeend', `<img src="${link}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
      return photoElement;
    });
  }

  return templateItem;
};

//FUNCTION CREATE MAIN MARKER
const createMainMarker = () => {
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
  marker.on('move', (evt) => {
    addressField.value = `${evt.target.getLatLng().lat.toFixed(4)}, ${evt.target.getLatLng().lng.toFixed(4)}`;
  });
  marker.addTo(map);
  return marker;
};

// FUNCTION CREATE MARKERS

const createMarkers = function (items) {
  const arr = items.slice(0, OFFERS_NUMBER);

  arr.forEach((el) => {
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
    mapFilters.addEventListener('change', () => {
      pinMarker.closePopup();
    });
  });
  enableFilters();
};

//FUNCTION DOWNLOAD MAP
const loadMap = function () {
  disablePageForms();
  map = L.map('map-canvas');
  const marker = createMainMarker(map);

  //FUNCTION FILTER BY TYPE
  const filterByType = (data) => {
    const typeData = data.filter((element) => housingType.value === 'any' ? true : element.offer.type === housingType.value);
    // console.log(typeData);
    return typeData;
  };

  //FUNCTION FILTER BY PRICE
  const filterByPrice = (data) => {
    const priceData = data.filter((element) => {
      if (housingPrice.value === 'low') {
        return element.offer.price < 10000;
      } else if (housingPrice.value === 'middle') {
        return element.offer.price >=10000 && element.offer.price <50000;
      } else if (housingPrice.value === 'high') {
        return element.offer.price >= 50000;
      } else if (housingPrice.value === 'any') {
        return true;
      }
    });
    // console.log(housingPrice.value);
    return priceData;
  };

  //FUNCTION FILTER BY ROOMS
  const filterByRooms = (data) => {
    const roomsData = data.filter((element) => {
      if (housingRooms.value > 3) {
        housingRooms.value = 3;
      }
      housingRooms.value === 'any' ? true : element.offer.rooms === housingRooms.value;
    });
    // console.log(roomsData);
    return roomsData;
  };

  //FUNCTION FILTER BY GUESTS
  const filterByGuests = (data) => {
    const guestsData = data.filter((element) => {
      if (housingGuests.value > 3) {
        housingGuests.value = 3;
      }
      housingGuests.value === 'any' ? true : element.offer.guests === housingGuests.value;
    });
    // console.log(guestsData);
    return guestsData;
  };

  //FUNCTION FILTER BY FEATURES
  // const filterByFeatures = (data) => {
  //   const featuresData = data.filter((element) => {
  //     const featuresArray = element.offer.features;
  //     for (let i = 0; i < featuresArray.length; i++) {
  //       const currentEl = featuresArray[i];
  //     }
  //   });

  //   return featuresData;
  // };


  //FUNCTION RENDER FILTERED MARKERS
  const renderFilteredMarkers = (data) => {
    filterByType(data);
    filterByPrice(data);
    filterByRooms(data);
    filterByGuests(data);
  };

  const onDataSuccessLoad = (data) => {
    mapFilters.addEventListener('change', () => renderFilteredMarkers(data));
    createMarkers(data);
  };

  map.on('load', () => {
    enableMainForm();
    sendRequest('https://23.javascript.pages.academy/keksobooking/data', 'GET', onDataSuccessLoad, onDataErrorLoad);

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

  createFetch(marker, LAT_TOKYO, LNG_TOKYO, map);
  resetButton(marker, LAT_TOKYO, LNG_TOKYO, map);
};

export {loadMap};
