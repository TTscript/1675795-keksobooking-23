import {disablePageForms, enableMainForm, enableFilters} from './page.js';
import {addFormListener, addResetButtonListener, onDataErrorLoad} from './form.js';
import './form.js';
import {sendRequest} from './api.js';
import {filterByType, filterByPrice, filterByRooms, filterByGuests, filterByFeatures} from './map-filters.js';
import {renderCard} from './render-cards.js';

const LAT_TOKYO = 35.6895000;
const LNG_TOKYO = 139.6917100;
const OFFERS_NUMBER = 10;
const MAIN_MARKER_WIDTH = 52;
const MAIN_MARKER_HEIGHT = 52;
const MAIN_MARKER_ANCHOR_WIDTH = 26;
const MAIN_MARKER_ANCHOR_HEIGHT = 52;
const MARKERS_WIDTH = 40;
const MARKERS_HEIGHT = 40;
const MARKERS_ANCHOR_WIDTH = 20;
const MARKERS_ANCHOR_HEIGHT = 40;
const MAP_ZOOM = 10;
const REQUIRED_ROUNDING = 4;
const LEAFLET_TILE_LAYER_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const LEAFLET_CONTRIBUTORS_INFO = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const GET_DATA_URL = 'https://23.javascript.pages.academy/keksobooking/data';
const addressField = document.querySelector('#address');
const mapFilters = document.querySelector('.map__filters-container');
const addFormReset = document.querySelector('.ad-form__reset');
let pinsGroup;
let marker;
let map;

//FUNCTION CREATE MAIN MARKER
const createMainMarker = () => {
  const mainPinIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [MAIN_MARKER_WIDTH, MAIN_MARKER_HEIGHT],
    iconAnchor: [MAIN_MARKER_ANCHOR_WIDTH, MAIN_MARKER_ANCHOR_HEIGHT],
  });
  marker = L.marker(
    {
      lat: LAT_TOKYO,
      lng: LNG_TOKYO,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );
  addressField.value = `${marker.getLatLng().lat.toFixed(REQUIRED_ROUNDING)}, ${marker.getLatLng().lng.toFixed(REQUIRED_ROUNDING)}`;
  marker.on('move', (evt) => {
    addressField.value = `${evt.target.getLatLng().lat.toFixed(REQUIRED_ROUNDING)}, ${evt.target.getLatLng().lng.toFixed(REQUIRED_ROUNDING)}`;
  });
  marker.addTo(map);
  return marker;
};

//FUNCTION CREATE MARKERS
const createMarkers = (items) => {

  const arr = items.slice(0, OFFERS_NUMBER);
  arr.forEach((el) => {
    const lat = el.location.lat;
    const lng = el.location.lng;
    const pinIcon = L.icon({
      iconUrl: './img/pin.svg',
      iconSize: [MARKERS_WIDTH, MARKERS_HEIGHT],
      iconAnchor: [MARKERS_ANCHOR_WIDTH, MARKERS_ANCHOR_HEIGHT],
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
      .addTo(pinsGroup)
      .bindPopup(renderCard(el));
    mapFilters.addEventListener('change', () => {
      pinMarker.closePopup();
    });
  });
  enableFilters();
};

//FUNCTION RENDER FILTERED MARKERS
const renderFilteredMarkers = (data) => {
  map.removeLayer(pinsGroup);
  pinsGroup = L.layerGroup().addTo(map);

  const filteredData = data
    .filter(filterByType)
    .filter(filterByPrice)
    .filter(filterByRooms)
    .filter(filterByGuests)
    .filter(filterByFeatures);
  createMarkers(filteredData);
  addFormReset.addEventListener('click', () => createMarkers(data));
};

const onDataSuccessLoad = (data) => {
  mapFilters.addEventListener('change', () => renderFilteredMarkers(data));
  createMarkers(data);
  addFormListener(marker, LAT_TOKYO, LNG_TOKYO, map, () => createMarkers(data));
};

//FUNCTION DOWNLOAD MAP
const loadMap = () => {
  disablePageForms();
  map = L.map('map-canvas');

  L.tileLayer(
    LEAFLET_TILE_LAYER_URL,
    {
      attribution: LEAFLET_CONTRIBUTORS_INFO,
    },
  ).addTo(map);

  pinsGroup = L.layerGroup().addTo(map);

  map.on('load', () => {
    enableMainForm();
    sendRequest(GET_DATA_URL, 'GET', onDataSuccessLoad, () => onDataErrorLoad());
  })
    .setView({
      lat: LAT_TOKYO,
      lng: LNG_TOKYO,
    }, MAP_ZOOM);

  marker = createMainMarker(map);

  addResetButtonListener(marker, LAT_TOKYO, LNG_TOKYO, map);
};

export {loadMap};
