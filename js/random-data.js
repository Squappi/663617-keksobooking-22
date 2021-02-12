let titles = ['Квартира, в центре Москвы', 'Квартира в центре Новгорода', 'Уютрая квартира на окраине Токио', 'Роскошная квартира на берегу моря в Калининграде', 'Люкс квартира у гор Швейцарии'];
let types = ['palace', 'flat', 'house', 'bungalow'];
let checkins = ['12:00', '13:00', '14:00'];
let checkouts = ['12:00', '13:00', '14:00'];
let feature = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
let photo = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
let descriptions = ['Квартира с видом на город', 'Квартира с видом на площадь', 'Квартира с видом на лес', 'Квартира с видом моря', 'Квартира с видом на горы'];

let authors = [];

for (let i = 0; i < 10; i++) {
    let author = {
        avatar: 'img/avatars/user/0' + getRandom(1, 8) + '.png',
    };
    authors.push(author);
}

const offers = [];

let locations = [];

for (let i = 0; i < 10; i++) {
    let location = {
        x: randomFloat(35.65000, 35.70000),
        y: randomFloat(139.70000, 139.80000),
    };
    locations.push(location);
}

function getRandomValue(min, max) {
    const randomSomething = getRandom(min, max);
    return randomSomething;
}


const noRepite = (array) => {
    const arrayLength = getRandomValue(1, array.length);
    const newArray = [array[getRandomValue(0, array.length - 1)]];
    for (let i = 1; i < arrayLength; i++) {
        const item = array[getRandomValue(0, array.length - 1)];
        const isUnique = newArray.every((value) => {
            return value !== item;
        });
        if (isUnique) {
            newArray[i] = item;
        } else {
            i--;
        }
    }
    return newArray;
}

for (let i = 0; i < 10; i++) {
    let offer = {
        title: titles[getRandomValue(0, titles.length - 1)],
        address: locations[getRandom(0, 1)],
        price: getRandom(0, 50000),
        type: types[getRandomValue(0, types.length - 1)],
        rooms: getRandom(0, 50),
        guests: getRandom(0, 10),
        checkin: checkins[getRandomValue(0, checkins.length - 1)],
        checkout: checkouts[getRandomValue(0, checkouts.length - 1)],
        features: noRepite(feature),
        description: descriptions[getRandomValue(0, descriptions.length - 1)],
        photos: photo[getRandomValue(0, photo.length - 1)],
    };
    offers.push(offer);
}

function getExchange(min, max) {
    if (min < 0 || max < 0) return 'Invalid parameter';
    if (min === max) {
        return min;
    }
    if (min < max) {
        return max + Math.random() * (min - max);
    }
    return min + Math.random() * (max - min);
}

function getRandom(min, max) {
    return Math.round(getExchange(min, max));
}

function randomFloat(min, max, e = 5) {
    return Math.fround(getExchange(min, max)).toFixed(e);
}

export {authors, offers, locations};
