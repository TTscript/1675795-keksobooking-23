const type = document.querySelector('#type');
const title = document.querySelector('#title');
const price = document.querySelector('#price');
const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const oneGuest = capacity.querySelector('[value=\'1\']');
const twoGuests = capacity.querySelector('[value=\'2\']');
const threeGuests = capacity.querySelector('[value=\'3\']');
const notForGuests = capacity.querySelector('[value=\'0\']');
const TITLE_MIN_LENGTH = 30;
const TITLE_MAX_LENGTH = 100;

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

roomNumber.addEventListener('change', (evt) => {
  switch (evt.target.value) {
    case '1':
      capacity.value = '1';
      oneGuest.setAttribute('disabled', '');
      twoGuests.setAttribute('disabled', '');
      threeGuests.setAttribute('disabled', '');
      notForGuests.setAttribute('disabled', '');
      break;
    case '2':
      capacity.value = '2';
      oneGuest.removeAttribute('disabled', '');
      twoGuests.removeAttribute('disabled', '');
      threeGuests.setAttribute('disabled', '');
      notForGuests.setAttribute('disabled', '');
      break;
    case '3':
      capacity.value = '3';
      oneGuest.removeAttribute('disabled', '');
      twoGuests.removeAttribute('disabled', '');
      threeGuests.removeAttribute('disabled', '');
      notForGuests.setAttribute('disabled', '');
      break;
    case '100':
      capacity.value = '0';
      oneGuest.setAttribute('disabled', '');
      twoGuests.setAttribute('disabled', '');
      threeGuests.setAttribute('disabled', '');
      notForGuests.removeAttribute('disabled', '');
      break;
  }
});

title.addEventListener('input', () => {
  const titleValueLength = title.value.length;
  if (titleValueLength < TITLE_MIN_LENGTH) {
    title.setCustomValidity(`Too short text length. I still have to put ${TITLE_MIN_LENGTH - titleValueLength}`);
  } else if (titleValueLength > TITLE_MAX_LENGTH) {
    title.setCustomValidity(`Too long text length. Please delete extra code. I have to delete ${titleValueLength - TITLE_MAX_LENGTH}`);
  } else {
    title.setCustomValidity('');
  }
  title.reportValidity();
});
