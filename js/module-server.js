import { drawMap } from './map.js';
import { onSuccessMessage } from './validation-message.js';
import { setUserFormSubmit } from './validation.js';

let serverMassive = null;
const mapFilter = 10;

fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((keksobook) => {
        serverMassive = keksobook;
        drawMap(serverMassive.slice(0, mapFilter));
    });

export { serverMassive };

setUserFormSubmit(onSuccessMessage);
