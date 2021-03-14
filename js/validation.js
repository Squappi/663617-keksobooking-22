import { onErrorMessage } from './validation-message.js';

const inputTitle = document.querySelector('#title');
const inputPrice = document.querySelector('#price');
const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const submitForm = document.querySelector('.ad-form');
const resetButton = document.querySelector('.ad-form__reset');


inputTitle.addEventListener( 'invalid', function() {
    if (inputTitle.validity.tooShort) {
        inputTitle.setCustomValidity('Имя должно состоять минимум из 30 символов');
    } else if (inputTitle.validity.tooLong) {
        inputTitle.setCustomValidity('Имя не должно превышать 100 символов');
    } else if (inputTitle.validity.valueMissing) {
        inputTitle.setCustomValidity('Обязательное поле');
    } else {
        inputTitle.setCustomValidity('');
    }
});

inputPrice.addEventListener('invalid', function() {
    if(inputPrice.validity.tooLong) {
        inputTitle.setCustomValidity('Цена не должна превышать 1000000');
    } else if (inputTitle.validity.valueMissing) {
        inputTitle.setCustomValidity('Обязательное поле');
    } else {
        inputTitle.setCustomValidity('');
    }
});

roomNumber.addEventListener('change', function(e) {
    let room = roomNumber.options.selectedIndex;
    let valueSelect = roomNumber.options[room].value;
    capacity.options.selectedIndex = room;
    for (let i = 0; i < capacity.options.length; i++) {
        if (valueSelect === '100') {
            if (capacity.options[i].value === '0') {
                capacity.options[i].disabled = '';
            } else {
                capacity.options[i].disabled='disabled';
            }
        } else {
            if (capacity.options[i].value <= valueSelect && capacity.options[i].value !== '0') {
                capacity.options[i].disabled = '';
                capacity.options.selectedIndex = e.target.options.selectedIndex;
            } else {
                capacity.options[i].disabled='disabled';
            }
        }
    }
});

function setUserFormSubmit(onSuccess) {
    submitForm.addEventListener('submit', (evt) => {
        evt.preventDefault();

        const formData = new FormData(evt.target);
        fetch(
            'https://22.javascript.pages.academy/keksobooking',
            {
                method: 'POST',
                body: formData,
            },
        ) .then((response) => {
            if (response.ok) {
                onSuccess();
                submitForm.reset();
            } else {
                onErrorMessage();
            }
        })
            .catch(() => {
                onErrorMessage();
            });
    })
}

resetButton.addEventListener('click', function() {
    submitForm.reset();
});

export{ setUserFormSubmit } ;
