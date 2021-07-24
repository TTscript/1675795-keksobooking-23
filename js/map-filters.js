const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;
const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');


//FUNCTION FILTER BY TYPE
const filterByType = (element) => housingType.value === 'any' || element.offer.type === housingType.value;

// //FUNCTION FILTER BY PRICE
const filterByPrice = (element) => {
  switch (housingPrice.value) {
    case 'low':
      return element.offer.price < LOW_PRICE;
    case 'middle':
      return element.offer.price >=LOW_PRICE && element.offer.price <HIGH_PRICE;
    case 'high':
      return element.offer.price >= HIGH_PRICE;
    default:
      return true;
  }
};

//FUNCTION FILTER BY ROOMS
const filterByRooms = (element) => housingRooms.value === 'any' || String(element.offer.rooms) === housingRooms.value;

//FUNCTION FILTER BY GUESTS
const filterByGuests = (element) => housingGuests.value === 'any' || String(element.offer.guests) === housingGuests.value;

//FUNCTION FILTER BY FEATURES
const filterByFeatures = (element) => {
  const checkedFeatures = document.querySelectorAll('#housing-features :checked');
  const features = element.offer.features;
  return checkedFeatures.length === 0 || (features && Array.from(checkedFeatures).every((elem) => features.indexOf(elem.value) > -1));
};

export {filterByType, filterByPrice, filterByRooms, filterByGuests, filterByFeatures};


