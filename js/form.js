// DEACTIVATE PAGE

const mapFilters = document.querySelector('.map__filters');
mapFilters.classList.add('map-filters--disabled');
const filterElement = mapFilters.querySelectorAll('.map__filter');
filterElement.forEach((filterEl) => {
  filterEl.setAttribute('disabled', '');
});

const adForm = document.querySelector('.ad-form');
adForm.classList.add('ad-form--disabled');
const adFormElement = mapFilters.querySelectorAll('.map__filter');
adFormElement.forEach((formEl) => {
  formEl.setAttribute('disabled', '');
});

export {mapFilters, adForm};


