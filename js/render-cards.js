import {getRoomsAndGuests} from './form.js';

const templateCardElement = document.querySelector('#card').content.querySelector('.popup');

const typeToTranslation = {
  bungalow: 'Бунгало',
  flat: 'Квартира',
  hotel: 'Отель',
  house:'Дом',
  palace: 'Дворец',
};

//FUNCTION RENDERS CARDS
const renderCard = (element) => {
  const templateItem = templateCardElement.cloneNode(true);
  templateItem.querySelector('.popup__avatar').src = element.author.avatar;
  templateItem.querySelector('.popup__title').textContent = element.offer.title;
  templateItem.querySelector('.popup__text--address').textContent = element.offer.address;
  templateItem.querySelector('.popup__text--price').textContent = `${element.offer.price}₽/ночь`;
  templateItem.querySelector('.popup__type').textContent = typeToTranslation[element.offer.type];
  templateItem.querySelector('.popup__text--capacity').textContent = getRoomsAndGuests(element.offer.rooms, element.offer.guests);
  templateItem.querySelector('.popup__text--time ').textContent = `Заезд после ${element.offer.checkin} выезд до ${element.offer.checkout}`;
  const featuresArray = element.offer.features;

  if (featuresArray === undefined) {
    templateItem.querySelector('.popup__features').classList.add('hidden');
  } else {
    const modifiers = element.offer.features.map((feature) => `popup__feature--${feature}`);
    templateItem.querySelectorAll('.popup__feature').forEach((item) => {
      const modifier = item.classList[1];
      if (!modifiers.includes(modifier)) {
        item.remove();
      }
    });
  }

  templateItem.querySelector('.popup__description').textContent = element.offer.description;
  const photoCatalog = templateItem.querySelector('.popup__photos');
  const photoCard = photoCatalog.querySelector('.popup__photo');

  if (element.offer.photos === undefined) {
    photoCatalog.classList.add('hidden');
  }
  else {
    element.offer.photos.map((link) => {
      photoCard.remove();
      const photoElement = photoCatalog.insertAdjacentHTML('beforeend', `<img src="${link}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
      return photoElement;
    });
  }

  return templateItem;
};

export {renderCard};
