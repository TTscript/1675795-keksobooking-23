const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const filterElements = document.querySelectorAll('.map__filter, .map__features, .ad-form__element, .ad-form-header');

// DISABLE FORM

const disablePageForms = function () {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map-filters--disabled');
  filterElements.forEach((filterEl) => {
    filterEl.setAttribute('disabled', '');
  });
};

// ENABLE MAIN FORM

const enableMainForm = function () {
  adForm.classList.remove('ad-form--disabled');
};

// ENABLE FILTERS

const enableFilters = function () {
  mapFilters.classList.remove('map-filters--disabled');
  filterElements.forEach((filterEl) => {
    filterEl.removeAttribute('disabled');
  });
};

export {disablePageForms, enableMainForm, enableFilters};
