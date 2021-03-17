/* global L:readonly */
/* global _:readonly */

import { serverMassive } from './module-server.js';

const mapFilter = document.querySelectorAll('.map__filter');
const adFormMap = document.querySelector('.ad-form');
const addForm = document.querySelectorAll('.ad-form__element');
const mapFilrersForm = document.querySelector('.map__filters');
const addressForm = document.querySelector('#address');

let markerArray = [];
let filteredOffers = [];
const offerType = new Map();
offerType.set('flat', 'Квартира');
offerType.set('bungalow', 'Бунгало');
offerType.set('house', 'Дом');
offerType.set('palace', 'Дворец');

adFormMap.classList.add('ad-form--disabled');

mapFilter.forEach(function(filter) {
    filter.disabled = true;
});

addForm.forEach(function(filterForm) {
    filterForm.disabled = true;
});


function getMapLoaded (value) {
    if (value === true) {
        adFormMap.classList.remove('ad-form--disabled');

        mapFilter.forEach(function(filter) {
            filter.disabled = false;
        });

        addForm.forEach(function(filterForm) {
            filterForm.disabled = false;
            addressForm.readOnly = true;
        });
    }
}

const map = L.map('map-canvas');

if (adFormMap.classList.contains('ad-form--disabled')) {
    map.on('load', () => {
        window.addEventListener('load', () => {
            getMapLoaded(true);
        });
    })
        .setView({
            lat: 	35.6895,
            lng: 	139.692,
        }, 10);

    L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        },
    ).addTo(map);
}



const mainPinIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
},
)

const mainPin = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
},
)

function createCustomPopup(offer) {
    const template = document.querySelector('#card').content.querySelector('.popup');
    const contentPopup = template.cloneNode(true);
    contentPopup.querySelector('.popup__title').textContent = offer.offer.title;
    contentPopup.querySelector('.popup__text--address').textContent = offer.offer.address;
    contentPopup.querySelector('.popup__type').textContent = offerType.get(offer.offer.type);
    contentPopup.querySelector('.popup__text--price').textContent = offer.offer.price;
    contentPopup.querySelector('.popup__text--capacity').textContent = offer.offer.capacity;
    contentPopup.querySelector('.popup__text--time').textContent = offer.offer.checkin + ' ' + offer.offer.checkout;
    contentPopup.querySelector('.popup__avatar').src = offer.author.avatar;

    return contentPopup;
}

function drawMap(offers) {
    for (let i = 0; i < offers.length; i++) {
        let adress = 	offers[i].location;
        let marker = L.marker (
            {
                lat: 	adress.lat,
                lng: 	adress.lng,
            },
            {
                draggable: true,
                icon: (i === 0)? mainPinIcon: mainPin,

            },
        );
        if (i !== 0) {
            marker
                .addTo(map)
                .bindPopup(
                    createCustomPopup(offers[i]),
                );
        } else {
            marker.addTo(map);
        }

        if (i === 0) {
            marker.on('moveend', function(evt) {
                addressForm.value = evt.target.getLatLng();
            });
        }
        markerArray.push(marker);
    }
}

mapFilrersForm.addEventListener('change', function() {
    for(let i = 0; i < markerArray.length; i++) {
        markerArray[i].remove();
    }
    filteredOffers = [];
    filterHouse();
    filterRooms();
    fitlerPrice();
    filterGuests();
    filterCheckboxWifi();
    filterCheckboxDishwasher();
    filterCheckboxParking();
    filterCheckboxWasher();
    filterCheckboxElevator();
    filterCheckboxConditioner();
    const d = _.debounce(function() {drawMap(filteredOffers)}, 500);
    d();
});

function filterHouse() {
    let element = document.querySelector('#housing-type');
    let offers = (filteredOffers.length === 0) ? serverMassive: filteredOffers;
    filteredOffers = offers.filter(function(offer) {
        let index = element.selectedIndex;
        let optionValue = element.options[index].value;
        console.log(offer.offer.type === optionValue );
        return offer.offer.type === optionValue || index === 0;
    });
}

function filterRooms() {
    let element = document.querySelector('#housing-rooms');
    let offers = filteredOffers;
    filteredOffers = offers.filter(function(offer) {
        let index = element.selectedIndex;
        let optionValue = element.options[index].value;
        return offer.offer.rooms == optionValue || index === 0;
    });
}

function fitlerPrice() {
    let element = document.querySelector('#housing-price');
    let offers = filteredOffers;
    filteredOffers = offers.filter(function(offer) {
        let index = element.selectedIndex;
        let optionValue = element.options[index].value;
        console.log((optionValue === 'low' && offer.offer.price < 10000) ||
        (optionValue === 'high' && offer.offer.price > 50000) ||
        (optionValue === 'middle' && offer.offer.price > 10000 && offer.offer.price < 50000));
        return (optionValue === 'low' && offer.offer.price < 10000) ||
        (optionValue === 'high' && offer.offer.price > 50000) ||
        (optionValue === 'middle' && offer.offer.price > 10000 && offer.offer.price < 50000) || index === 0;
    });
    console.log(filteredOffers);
}

function filterGuests() {
    let element = document.querySelector('#housing-guests');
    console.log(filteredOffers, 777)
    let offers = filteredOffers;
    filteredOffers = offers.filter(function(offer) {
        let index = element.selectedIndex;
        let optionValue = element.options[index].value;
        console.log(optionValue, offer);
        return offer.offer.guests == optionValue || index === 0;
    });
    console.log(offers, serverMassive);
}

function filterCheckboxWifi() {
    let element = document.querySelector('#filter-wifi');
    if (element.checked) {
        let offers = filteredOffers;
        filteredOffers = offers.filter(function(offer) {
            return offer.offer.features.includes('wifi');
        });
    }
}

function filterCheckboxDishwasher() {
    let element = document.querySelector('#filter-dishwasher');
    if (element.checked) {
        let offers = filteredOffers;
        filteredOffers = offers.filter(function(offer) {
            return offer.offer.features.includes('dishwasher');
        });
    }
}

function filterCheckboxParking() {
    let element = document.querySelector('#filter-parking');
    if (element.checked) {
        let offers = filteredOffers;
        filteredOffers = offers.filter(function(offer) {
            return offer.offer.features.includes('parking');
        });
    }
}

function filterCheckboxWasher() {
    let element = document.querySelector('#filter-washer');
    if (element.checked) {
        let offers = filteredOffers;
        filteredOffers = offers.filter(function(offer) {
            return offer.offer.features.includes('washer');
        });
    }
}

function filterCheckboxElevator() {
    let element = document.querySelector('#filter-elevator');
    if (element.checked) {
        let offers = filteredOffers;
        filteredOffers = offers.filter(function(offer) {
            return offer.offer.features.includes('elevator');
        });
    }
}

function filterCheckboxConditioner() {
    let element = document.querySelector('#filter-conditioner');
    if (element.checked) {
        let offers = filteredOffers;
        filteredOffers = offers.filter(function(offer) {
            return offer.offer.features.includes('conditioner');
        });
    }
}

export {drawMap};
