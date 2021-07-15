const type = document.querySelector('#type');
const price = document.querySelector('#price');
const roomsNumber = document.querySelector('#room_number');
const capacityGuests = document.querySelector('#capacity');
const checkInTime = document.querySelector('#timein');
const checkOutTime = document.querySelector('#timeout');
const addForm = document.querySelector('.ad-form');
const filtersForm = document.querySelector('.map__filters');
const addressField = document.querySelector('#address');
const bodyTag = document.querySelector('body');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const errorButton = errorMessage.querySelector('.error__button');

//FUNCTION SUCCESS
const createSuccessMessage = function () {
  const successMessageTemplate = successMessage.cloneNode(true);
  bodyTag.appendChild(successMessage);
  return successMessageTemplate;
};

//FUNCTION ERROR
const createErrorMessage = function () {
  const errorMessageTemplate = errorMessage.cloneNode(true);
  bodyTag.appendChild(errorMessage);
  return errorMessageTemplate;
};

//FUNCTION CLOSE SUCCESS WINDOW
const closeSuccessWindow = function () {
  window.addEventListener('click', (evt) => {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      successMessage.remove();
    }
    successMessage.remove();
  });

  window.addEventListener('keydown', (evt) => {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      successMessage.remove();
    }
  });
};

//FUNCTION CLOSE ERROR WINDOW
const closeErrorWindow = function () {
  window.addEventListener('click', (evt) => {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      errorMessage.remove();
    } else if (errorButton.onclick) {
      errorMessage.remove();
    }
    errorMessage.remove();
  });

  window.addEventListener('keydown', (evt) => {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      errorMessage.remove();
    }
  });
};

//FUNCTION TRANSLATE TYPES
const translateTypes = function (typeEl) {
  switch (typeEl.offer.type) {
    case 'flat':
      typeEl.offer.type = 'Квартира';
      break;
    case 'bungalow':
      typeEl.offer.type = 'Бунгало';
      break;
    case 'house':
      typeEl.offer.type= 'Дом';
      break;
    case 'palace':
      typeEl.offer.type= 'Дворец';
      break;
    case 'hotel':
      typeEl.offer.type= 'Отель';
      break;
  }
  return typeEl.offer.type;
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

//FUNCTION SET ATTRIBUTE

function setAttributes(el, attrs) {
  for(const key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

type.addEventListener('change', (evt) => {
  const typeValue = evt.target.value;

  switch (typeValue) {
    case 'bungalow':
      setAttributes(price, {'min' : '0', 'placeholder' : '0'});
      break;
    case 'flat':
      setAttributes(price, {'min' : '1000', 'placeholder' : '1000'});
      break;
    case 'hotel':
      setAttributes(price, {'min' : '3000', 'placeholder' : '3000'});
      break;
    case 'house':
      setAttributes(price, {'min' : '5000', 'placeholder' : '5000'});
      break;
    case 'palace':
      setAttributes(price, {'min' : '10000', 'placeholder' : '10000'});
      break;
  }
});

const guestRoomsMap = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const onSelectGuestsRoomsChange = () => {
  if (guestRoomsMap[roomsNumber.value].indexOf(capacityGuests.value) === -1) {
    capacityGuests.setCustomValidity('Укажите допустимое количество гостей');
  } else {
    capacityGuests.setCustomValidity('');
  }
};

roomsNumber.addEventListener('change', onSelectGuestsRoomsChange);
capacityGuests.addEventListener('change', onSelectGuestsRoomsChange);

const updateSelectValue = (targetSelect, selectToUpdate) => {
  selectToUpdate.value = targetSelect.value;
};

checkInTime.addEventListener('change', () => updateSelectValue(checkInTime, checkOutTime));
checkOutTime.addEventListener('change', () => updateSelectValue(checkOutTime, checkInTime));

//EVT FORM

const createFetch = function (marker, lat, lng, map) {
  addForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    fetch(
      'https://23.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body: formData,
      },
    ) .then((response) => {
      if (response.ok) {
        return response;
      }

      throw new Error(`${response.status} - ${response.statusText}`, createErrorMessage(), closeErrorWindow());

    })
      .then(() => {
        addForm.reset();
        filtersForm.reset();
        addressField.value = marker.getLatLng();
        marker.setLatLng([lat, lng]).addTo(map);
        createSuccessMessage();
        closeSuccessWindow();
      })
      .catch(() => {
        addForm.reset();
        filtersForm.reset();
        addressField.value = marker.getLatLng();
        marker.setLatLng([lat, lng]).addTo(map);
        createErrorMessage();
        closeSuccessWindow();
      });
  });
};


export {translateTypes, getRoomsAndGuests, createFetch};
