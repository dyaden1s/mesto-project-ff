//Проверка данных форм
export const formValidation = (formValidationConfig) => {
    const findForm = Array.from(document.querySelectorAll(formValidationConfig.formSelector));

    findForm.forEach((form) => {
        arrayInput(formValidationConfig, form);
    })
}

//Проверка всех инпутов
const arrayInput = (formValidationConfig, form) => {
    const findInput = Array.from(form.querySelectorAll(formValidationConfig.inputSelector))
    const saveButton = form.querySelector(formValidationConfig.submitButtonSelector)
    saveButton.classList.add(formValidationConfig.inactiveButtonClass);

    findInput.forEach((input) => {
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

    if (input.hasAttribute('data-validate-url')) {
        if (!checkURLValidity(input.value.trim())) {
            showError(formValidationConfig, input, input.validationMessage);
        } else {
            hideError(formValidationConfig, input);
        }
        return
    }

    if (input.value.trim() == '') {
        showError(formValidationConfig, input, input.validationMessage)
    }  else if (!regEx.test(input.value)) {
        input.setCustomValidity("Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы");

        showError(formValidationConfig, input, input.validationMessage)
    }  else {
        input.setCustomValidity("");
        hideError(formValidationConfig, input)
    }

    if (!input.validity.valid) {
        showError(formValidationConfig, input, input.validationMessage)
    } else {
        hideError(formValidationConfig, input)
    }

}

//Функция проверки валидности url
function checkURLValidity(element) {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(element);
}

//Сброс ошибки
export const updateInput = (formValidationConfig, form) => {
    const inputList = form.querySelectorAll(formValidationConfig.inputSelector);

    inputList.forEach((input) => {
        hideError(formValidationConfig, input);
    })

}

const toggleButton = (formValidationConfig, form, button) => {
    const inputList = Array.from(form.querySelectorAll(formValidationConfig.inputSelector));
    let hasError = inputList.some(input => !input.validity.valid);
    if (!hasError) {
        inputList.forEach(input => {
            if (!input.validity.valid) {
                hasError = true;
            }
        });
    }
    if (hasError) {
        button.classList.add(formValidationConfig.inactiveButtonClass);
    } else {
        button.classList.remove(formValidationConfig.inactiveButtonClass);
    }
};
