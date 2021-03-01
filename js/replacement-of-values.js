const select = document.querySelector('#type');
const inputSearch = document.querySelector('#price');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');

select.onchange = function(e) {
    let selectItem = e.target.options[e.target.options.selectedIndex];
    if (selectItem.value === 'bungalow') {
        inputSearch.placeholder = '0';
        inputSearch.min = '0';
    } else if (selectItem.value === 'flat') {
        inputSearch.placeholder = '1000';
        inputSearch.min = '1000';
    } else if (selectItem.value === 'house') {
        inputSearch.placeholder = '5000';
        inputSearch.min = '5000';
    } else if (selectItem.value === 'palace') {
        inputSearch.placeholder = '10000';
        inputSearch.min = '10000';
    }
}

timeIn.onchange = function(e) {
    timeOut.options.selectedIndex = e.target.options.selectedIndex;
}

timeOut.onchange = function(e) {
    timeIn.options.selectedIndex = e.target.options.selectedIndex;
}

