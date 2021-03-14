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

function closeErrorMessage() {
    document.querySelector('.error').remove();
}

export {onSuccessMessage, onErrorMessage};
