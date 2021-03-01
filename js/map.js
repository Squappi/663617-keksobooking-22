import { locations, offers } from './random-data.js';
const mapFilter = document.querySelectorAll('.map__filter');
const adFormMap = document.querySelector('.ad-form');
const addForm = document.querySelectorAll('.ad-form__element');
function getMapLoaded (value) {
    if (value === true) {
        adFormMap.classList.remove('ad-form--disabled');

        mapFilter.forEach(filter => {
            filter.disabled = false;
        });

        addForm.forEach(filterForm => {
            filterForm.disabled = false;
        });
    } else {
        adFormMap.classList.add('ad-form--disabled');
        mapFilter.forEach(filter => {
            filter.disabled = true;
        });

        addForm.forEach(filterForm => {
            filterForm.disabled = true;
        });
    }
}

let flag = false;

const map = L.map('map-canvas')
    .on('load', () => {
        getMapLoaded(true);
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
    contentPopup.querySelector('.popup__title').textContent = offer.title;
    contentPopup.querySelector('.popup__text--address').textContent = offer.address.x;

    return contentPopup;
}

for (let i = 0; i < offers.length; i++) {
    let adress = 	offers[i].address;
    let marker = L.marker (
        {
            lat: 	adress.x,
            lng: 	adress.y,
        },
        {
            draggable: true,
            icon: (i === 0)? mainPinIcon: mainPin,

        },
    );
    marker
        .addTo(map)
        .bindPopup(
            createCustomPopup(offers[i]),
        );

    marker.on('moveend', (evt) => {
        console.log(evt.target.getLatLng());
    });
}


