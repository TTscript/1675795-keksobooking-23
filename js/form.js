const type = document.querySelector('#type');
const price = document.querySelector('#price');
const roomsNumber = document.querySelector('#room_number');
const capacityGuests = document.querySelector('#capacity');
const checkInTime = document.querySelector('#timein');
const checkOutTime = document.querySelector('#timeout');

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
