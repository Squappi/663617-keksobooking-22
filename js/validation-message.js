const ALERT_SHOW_TIME = 10000;

function onSuccessMessage() {
    const templateSuccess = document.querySelector('#success').content.querySelector('.success');
    const contentSuccess = templateSuccess.cloneNode(true);
    document.body.append(contentSuccess);
    let messageSuccess = document.querySelector('.success');
    messageSuccess.addEventListener('click', function() {
        document.querySelector('.success').remove();
    });
    return contentSuccess;
}

function onErrorMessage() {
    const templateError = document.querySelector('#error').content.querySelector('.error');
    const contentError = templateError.cloneNode(true);
    document.body.append(contentError);
    let errorMessage = document.querySelector('.error');
    errorMessage.addEventListener('click', function() {
        if(document.querySelector('.error')) {
            closeErrorMessage();
        }
    });
    let buttonErr = document.querySelector('.error__button');
    buttonErr.addEventListener('click', function() {
        if(document.querySelector('.error')) {
            closeErrorMessage();
        }
    });
    return contentError;
}

const showAlert = function(message) {
    const alertContainer = document.createElement('div');
    alertContainer.style.zIndex = 100;
    alertContainer.style.position = 'fixed';
    alertContainer.style.left = 0;
    alertContainer.style.top = 0;
    alertContainer.style.right = 0;
    alertContainer.style.padding = '10px 3px';
    alertContainer.style.fontSize = '30px';
    alertContainer.style.textAlign = 'center';
    alertContainer.style.backgroundColor = 'red';

    alertContainer.textContent = message;

    document.body.append(alertContainer);

    setTimeout(function () {
        alertContainer.remove();
    }, ALERT_SHOW_TIME);
}

function closeErrorMessage() {
    document.querySelector('.error').remove();
}

export {onSuccessMessage, onErrorMessage, showAlert};
