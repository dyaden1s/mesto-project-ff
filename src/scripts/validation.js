//Проверка данных форм
export const enableValidation = (formValidationConfig) => {
    const findForms = Array.from(document.querySelectorAll(formValidationConfig.formSelector));

    findForms.forEach((form) => {
        arrayInput(formValidationConfig, form);
    })
}

//Проверка всех инпутов
const arrayInput = (formValidationConfig, form) => {
    const findInputs = Array.from(form.querySelectorAll(formValidationConfig.inputSelector))
    const saveButton = form.querySelector(formValidationConfig.submitButtonSelector)
    saveButton.classList.add(formValidationConfig.inactiveButtonClass);

    findInputs.forEach((input) => {
        input.addEventListener('input', () => {
            isValid(formValidationConfig, input);
            toggleButton(formValidationConfig, form, saveButton);
        })

    })

}

//Функция не прошла проверку валидации
function showError(formValidationConfig, input, messageError) {
    const spanError = document.querySelector(`.${input.id}-error`);

    input.classList.add(formValidationConfig.inputErrorClass);
    spanError.classList.add(formValidationConfig.errorClass);
    spanError.textContent = messageError
}

//Функция прошла проверку валидации
function hideError(formValidationConfig, input) {
    const spanError = document.querySelector(`.${input.id}-error`);

    input.classList.remove(formValidationConfig.inputErrorClass);
    spanError.classList.remove(formValidationConfig.errorClass);
    spanError.textContent = ''
}

//Функция проверки валидности
function isValid(formValidationConfig, input) {
    const regEx = /^[a-zа-я\s\-]+$/i;
    const errorMessage = input.dataset.errorMessage;

    if (!input.validity.valid) {
        if (!checkURLValidity(input.value.trim())) {
            showError(formValidationConfig, input, input.validationMessage);
        } else {
            hideError(formValidationConfig, input);
        }
        showError(formValidationConfig, input, input.validationMessage)
        } else {
            hideError(formValidationConfig, input)
        }
        if (input.value.trim() == '') {
            showError(formValidationConfig, input, input.validationMessage)
        }  else if (!regEx.test(input.value)) {
            input.setCustomValidity(errorMessage);
            showError(formValidationConfig, input, input.validationMessage)
        }  else {
            input.setCustomValidity("");
            hideError(formValidationConfig, input)
        }

}

//Функция проверки валидности url
function checkURLValidity(element) {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(element);
}

//Сброс ошибки
export const clearValidation = (formValidationConfig, form) => {
    const inputList = form.querySelectorAll(formValidationConfig.inputSelector);
    const saveButton = form.querySelector(formValidationConfig.submitButtonSelector);

    inputList.forEach((input) => {
        hideError(formValidationConfig, input);
    });

    if (saveButton) {
        saveButton.disabled = true;
    }
}

const toggleButton = (formValidationConfig, form, button) => {
    const inputList = Array.from(form.querySelectorAll(formValidationConfig.inputSelector));
    const hasError = inputList.some(input => !input.validity.valid);

    if (hasError) {
        button.classList.add(formValidationConfig.inactiveButtonClass);
        button.disabled = true;
    } else {
        button.classList.remove(formValidationConfig.inactiveButtonClass);
        button.disabled = false;
    }
};
