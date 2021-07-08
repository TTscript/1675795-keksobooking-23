// import {mapFilters, adForm, mapFeatures, adFormHeader} from './form.js';
//CONNECTION MAP

const activatePage = function () {
  //DOWNLOAD MAP
  const map = L.map('map-canvas').setView([51.505, -0.09], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

  L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();

  //ACTIVATE PAGE
  const mapFilters = document.querySelector('.map__filters');
  mapFilters.classList.remove('map-filters--disabled');
  const filterElement = mapFilters.querySelectorAll('.map__filter');
  filterElement.forEach((filterEl) => {
    filterEl.removeAttribute('disabled');
  });

  const mapFeatures = document.querySelector('.map__features');
  mapFeatures.removeAttribute('disabled');

  const adForm = document.querySelector('.ad-form');
  adForm.classList.remove('ad-form--disabled');
  const adFormElement = adForm.querySelectorAll('.ad-form__element');
  adFormElement.forEach((formEl) => {
    formEl.removeAttribute('disabled');
  });

  const adFormHeader = document.querySelector('.ad-form-header');
  adFormHeader.removeAttribute('disabled');
};


export {activatePage};


