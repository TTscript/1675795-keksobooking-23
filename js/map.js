import {createOffer} from './data.js';
import {enablePageForms, disablePageForms} from './page.js';
import { renderCard } from './main.js';

const OFFERS_NUMBER = 10;
const offers = createOffer(OFFERS_NUMBER);
const addressField = document.querySelector('#address');

//DOWNLOAD MAP

const loadMap = function () {
  disablePageForms();
  const map = L.map('map-canvas')
    .on('load', () => {
      enablePageForms();
    })
    .setView({
      lat: 35.6895000,
      lng: 139.6917100,
    }, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: '../img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const marker = L.marker(
    {
      lat: 35.6895000,
      lng: 139.6917100,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  marker.addTo(map);

  marker.on('moveend', (evt) => {
    addressField.value = `${evt.target.getLatLng().lat.toFixed(4)}, ${evt.target.getLatLng().lng.toFixed(4)}`;
  });

  offers.forEach((el) => {
    const lat = el.location.lat;
    const lng = el.location.lng;

    const pinIcon = L.icon({
      iconUrl: '../img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const pinMarker = L.marker(
      {
        lat,
        lng,
      },
      {
        draggable: true,
        icon: pinIcon,
      },
    );

    pinMarker
      .addTo(map)
      .bindPopup(renderCard(el));
  });
};

export {loadMap};
