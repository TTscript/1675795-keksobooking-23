import {isEscEvent} from './util.js';
import {sendRequest} from './api.js';

const REMOVE_DIV_TIMEOUT = 2000;
const SEND_DATA_URL = 'https://23.javascript.pages.academy/keksobooking';
const type = document.querySelector('#type');
const price = document.querySelector('#price');
const roomsNumber = document.querySelector('#room_number');
const capacityGuests = document.querySelector('#capacity');
const checkInTime = document.querySelector('#timein');
const checkOutTime = document.querySelector('#timeout');
const addForm = document.querySelector('.ad-form');
const addFormReset = document.querySelector('.ad-form__reset');
const filtersForm = document.querySelector('.map__filters');
const addressField = document.querySelector('#address');
const bodyTag = document.querySelector('body');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const previewAvatarImage = document.querySelector('.ad-form-header__preview').querySelector('img');
const previewAvatarInput = document.querySelector('#avatar');
const previewHousingDiv = document.querySelector('.ad-form__photo');
const previewLivingPhotoInput = document.querySelector('#images');

//FUNCTION COSTS QUANTITY ROOMS AND GUESTS
const getRoomsAndGuests = (roomsValue, guestsValue) => {
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

const setAttributes = (el, attrs) => {
  for(const key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
};

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

//FUNCTION SUCCESS
const createSuccessMessage = () => {
  const successMessageTemplate = successMessage.cloneNode(true);
  bodyTag.appendChild(successMessage);
  return successMessageTemplate;
};

//FUNCTION ERROR
const createErrorMessage = () => {
  const errorMessageTemplate = errorMessage.cloneNode(true);
  bodyTag.appendChild(errorMessage);
  return errorMessageTemplate;
};

//FUNCTION CLOSE SUCCESS WINDOW
const onSuccessPopupClick = () => {
  successMessage.remove();
  window.removeEventListener('click', onSuccessPopupClick);
};

const onSuccessPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    successMessage.remove();
  }
  window.removeEventListener('click', onSuccessPopupEscKeydown);
};

const closeSuccessWindow = () => {
  window.addEventListener('click', onSuccessPopupClick);
  window.addEventListener('keydown', onSuccessPopupEscKeydown);
};

//FUNCTION CLOSE ERROR WINDOW
const onErrorPopupClick = () => {
  errorMessage.remove();
  window.removeEventListener('click', onErrorPopupClick);
};

const onErrorPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    errorMessage.remove();
  }
  window.removeEventListener('click', onErrorPopupEscKeydown);
};

const closeErrorWindow = () => {
  window.addEventListener('click', onErrorPopupClick);
  window.addEventListener('keydown', onErrorPopupEscKeydown);
};

//FUNCTION SUCCESS RESET FORM
const resetForm = (marker, lat, lng, map, resetMarkers) => {
  addForm.reset();
  filtersForm.reset();
  resetMarkers();
  addressField.value = marker.getLatLng();
  marker.setLatLng([lat, lng]).addTo(map);
  createSuccessMessage();
  closeSuccessWindow();
};

//FUNCTION ERROR RESET FORM
const errorForm = () => {
  createErrorMessage();
  closeErrorWindow();
};

//FUNCTION RESET BUTTON
const addResetButtonListener = (marker, lat, lng, map) => {
  addFormReset.addEventListener('click', (evt) => {
    evt.preventDefault();
    addForm.reset();
    filtersForm.reset();
    addressField.value = marker.getLatLng();
    marker.setLatLng([lat, lng]).addTo(map);
  });
};

//EVT FORM
const addFormListener = (marker, lat, lng, map, resetMarkers) => {
  addForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    sendRequest(SEND_DATA_URL, 'POST', () => resetForm(marker, lat, lng, map, resetMarkers), () => errorForm(), formData);
  });
};

//FUNCTION GET ERROR MESSAGE
const onDataErrorLoad = () => {
  const divElement = document.createElement('div');
  divElement.classList.add('error');
  divElement.style.paddingRight = '360px';
  divElement.style.paddingLeft = '360px';
  divElement.textContent = 'При загрузке данных с сервера произошла ошибка';
  divElement.style.fontSize = '60px';
  divElement.style.color = 'red';
  bodyTag.appendChild(divElement);
  setTimeout(() => {
    divElement.remove();
  }, REMOVE_DIV_TIMEOUT);
};

// CREATE AVATAR PICTURE PREVIEW
const createPreviewAvatar = () => {
  const avatarReader = new FileReader();
  avatarReader.onload = (evt) => {
    previewAvatarImage.src = evt.target.result;
  };
  const loadImageFile = () => {
    const file = previewAvatarInput.files[0];
    avatarReader.readAsDataURL(file);
  };
  previewAvatarInput.addEventListener('change', loadImageFile);
};
createPreviewAvatar();

//CREATE HOUSING PREVIEW
const createPreviewLiving = () => {
  const previewHousing = document.createElement('img');
  previewHousing.classList.add('qu');
  previewHousing.setAttribute('width', '50px');
  previewHousing.setAttribute('height', '50px');
  previewHousing.setAttribute('id', 'preview-living-image');
  previewHousingDiv.appendChild(previewHousing);

  previewHousingDiv.style.padding = '10px';
  const livingReader = new FileReader();
  livingReader.onload = (evt) => {
    previewHousing.src = evt.target.result;
  };
  const loadImageFile = () => {
    const file = previewLivingPhotoInput.files[0];
    livingReader.readAsDataURL(file);
  };
  previewLivingPhotoInput.addEventListener('change', loadImageFile);
};

createPreviewLiving();

export {getRoomsAndGuests, addFormListener, addResetButtonListener, onDataErrorLoad};
