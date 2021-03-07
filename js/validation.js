const inputTitle = document.querySelector('#title');
const inputPrice = document.querySelector('#price');
const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');

inputTitle.addEventListener('invalid', function() {
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
    for (let i = 0; i < capacity.options.length; i++) {
        if (valueSelect === '100') {
            if (capacity.options[i].value === '0') {
                capacity.options[i].disabled='';
            } else {
                capacity.options[i].disabled='disabled';
            }
        } else {
            if (capacity.options[i].value <= valueSelect && capacity.options[i].value !== '0') {
                capacity.options[i].disabled='';
            } else {
                capacity.options[i].disabled='disabled';
            }
        }
    }
});

capacity.addEventListener('change', function(e) {
    let guests = capacity.options.selectedIndex;
    let valueCapacity = capacity.options[guests].value;
    for (let i = 0; i < roomNumber.options.length; i++) {
        if (valueCapacity === '0') {
            if (roomNumber.options[i].value === '100') {
                roomNumber.options[i].disabled='';
            } else {
                roomNumber.options[i].disabled='disabled';
            }
        } else {
            if (roomNumber.options[i].value <= valueCapacity && roomNumber.options[i].value !== '100') {
                roomNumber.options[i].disabled='';
            } else {
                roomNumber.options[i].disabled='disabled';
            }
        }
    }
});

