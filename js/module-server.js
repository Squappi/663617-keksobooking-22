import { drawMap } from './map.js';
import { onSuccessMessage, showAlert } from './validation-message.js';
import { setUserFormSubmit } from './validation.js';

let serverMassive = null;
const MAP_FILTER = 10;

fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then(function(response) {return response.json()})
    .then(function(keksobook) {
        serverMassive = keksobook;
        console.log(serverMassive);
        drawMap(serverMassive.slice(0, MAP_FILTER));
    }).catch(function() {
        showAlert('Что-то пошло не так, попробуйте еще раз');
    });

export { serverMassive };

setUserFormSubmit(onSuccessMessage);
