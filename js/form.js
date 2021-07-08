// DEACTIVATE PAGE

const mapFilters = document.querySelector('.map__filters');
mapFilters.classList.add('map-filters--disabled');
const filterElement = mapFilters.querySelectorAll('.map__filter');
filterElement.forEach((filterEl) => {
  filterEl.setAttribute('disabled', '');
});

const mapFeatures = document.querySelector('.map__features');
mapFeatures.setAttribute('disabled', '');

const adForm = document.querySelector('.ad-form');
adForm.classList.add('ad-form--disabled');
const adFormElement = adForm.querySelectorAll('.ad-form__element');
adFormElement.forEach((formEl) => {
  formEl.setAttribute('disabled', '');
});

const adFormHeader = document.querySelector('.ad-form-header');
adFormHeader.setAttribute('disabled', '');

