import { authors, offers } from './random-data.js';

const template = document.querySelector('#card');
let elem = document.createElement('div');

elem.append(template.content.cloneNode(true));

// заполнить все
elem.querySelector('.popup__title').innerHTML = offers[0].title;
// вывод адреса
elem.querySelector('.popup__text--address').innerHTML = (offers[0].address.x + ' ' + offers[0].address.y);
// вывод цены
elem.querySelector('.popup__text--price').textContent = offers[0].price + ' ₽/ночь';
// вывод комнат и гостей
elem.querySelector('.popup__text--capacity').textContent = (offers[0].rooms + ' комнаты для ' + offers[0].guests + ' гостей');
// вывод даты
elem.querySelector('.popup__text--time').textContent = (offers[0].checkin + ' выезд до ' + offers[0].checkout);
// вывод удобств
elem.querySelector('.popup__features').textContent = offers[0].features;
// вывод недвижимости
elem.querySelector('.popup__description').textContent = offers[0].description;
// вывод картинки
elem.querySelector('.popup__photo').src = offers[0].photos;
// вывод автора
elem.querySelector('.popup__avatar').src = authors[0].avatar;
// вывод типа жилья
switch (offers[0].type) {
case 'flat':
    elem.querySelector('.popup__type').textContent = 'Квартира';
    break;
case 'bungalow':
    elem.querySelector('.popup__type').textContent = 'Бунгало';
    break;
case 'house':
    elem.querySelector('.popup__type').textContent = 'Дом';
    break;
case 'palace':
    elem.querySelector('.popup__type').textContent = 'Дворец';
}

document.querySelector('#map-canvas').append(elem);
