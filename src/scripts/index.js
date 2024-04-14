import {createCard, toggleLike, deleteCard, likeCard} from "./card";
import {openPopup, closePopup, closePopupByOverlay} from "./modal";
import {clearValidation, enableValidation} from "./validation";
import {addNewCardApi, editProfileApi, getCards, getUser, updateAvatar} from "./api";

const placesList = document.querySelector('.places__list');
let user = {};

// Вызов функций для получения данных о пользователе и карточек с сервера одновременно
Promise.all([getUser(), getCards()])
    .then(([userData, cardsData]) => {
        user = userData

        outputUserData(userData);

        cardsData?.forEach(card => {
            const newCard = createCard(card, deleteCard, toggleLike, userData._id, openImagePopup, likeCard);
            placesList.appendChild(newCard);
        });

    })
    .catch(error => {
        // Обработка ошибок
        console.error('Ошибка при загрузке данных:', error);
    });

// Функция открытия попапа с изображением
function openImagePopup(imageSrc, imageName) {
    const imagePopup = document.querySelector('.popup_type_image');

    const imagePopupImage = imagePopup.querySelector('.popup__image');
    const imagePopupCaption = imagePopup.querySelector('.popup__caption');

    imagePopupImage.src = imageSrc;
    imagePopupImage.alt = imageName;
    imagePopupCaption.textContent = imageName;

    openPopup(imagePopup);
}

// Открытие и закрытие модального окна
// @todo: DOM узлы
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const image = document.querySelector('.profile__image');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const closeButtons = document.querySelectorAll('.popup__close');
const formEdit = document.querySelector('.popup_type_edit .popup__form');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editSaveButton = formEdit.querySelector('.popup__button');




// Открытие/закрытие модальных окон при клике на кнопки и крестик
editButton.addEventListener('click', function () {
    // Заполнение инпутов актуальными данными из профиля
    const profileTitleValue = profileTitle.textContent;
    const profileDescriptionValue = profileDescription.textContent;
    const nameInput = editPopup.querySelector('.popup__input_type_name');
    const descriptionInput = editPopup.querySelector('.popup__input_type_description');

    nameInput.value = profileTitleValue;
    descriptionInput.value = profileDescriptionValue;

    // Открытие попапа редактирования профиля
    openPopup(editPopup);
    clearValidation(formValidationConfig,formEdit);

    if (editSaveButton.classList.contains('submit-disabled')) {
        editSaveButton.classList.remove('submit-disabled');
    }

});

// Открытие попапа добавления новой карточки
addButton.addEventListener('click', function () {
    openPopup(newCardPopup);
});

image.addEventListener('click', function (event) {
    event.stopPropagation();
});

closeButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        const popup = button.closest('.popup');
        closePopup(popup);
    });
});

//Функция вывода данных о пользователе с сервера
function outputUserData(userData) {

    const userName = document.getElementById('userName');
    userName.textContent = userData.name;

    const userAbout = document.getElementById('userAbout');
    userAbout.textContent = userData.about;

    const userAvatar = document.getElementById('userAvatar');
    userAvatar.style.backgroundImage = `url('${userData.avatar}')`;
}

// Находим все попапы на странице
const popups = document.querySelectorAll('.popup');

// Назначаем обработчик каждому попапу
popups.forEach(popup => {
    popup.addEventListener('click', closePopupByOverlay);
});

function getAvatar() {
    const avatarUrlInput = document.querySelector('.popup__input_type_avatar');
    const avatarUrl = avatarUrlInput.value.trim(); // Получаем значение URL из поля формы и удаляем лишние пробелы

    return(avatarUrl)
}

// Изменение аватара
function updateAvatarAction(popup) {
    updateAvatar(getAvatar())
        .then(response => {
            console.log('Аватар успешно обновлен');
            // После успешного обновления аватара, можно также обновить его на странице
            const userAvatar = document.getElementById('userAvatar');
            userAvatar.style.backgroundImage = `url('${response.avatar}')`;
            // Закрываем попап с изменением аватара после успешного обновления
            closePopup(popup);
        })
        .catch(error => {
            console.error('Ошибка при обновлении аватара:', error);
        })
        .finally(() => {
            // Возвращаем исходный текст кнопки после завершения запроса
            saveAvatarButton.textContent = 'Сохранить';
        });
}

// Получаем кнопку "Сохранить" из попапа
const avatarForm = document.forms['edit-avatar'];
const saveAvatarButton = avatarForm.querySelector('.popup__button');

// Назначаем обработчик события клика на кнопку "Сохранить"
avatarForm.addEventListener('submit', function(event) {
    handleAvatarSubmit(event, popupAvatar);
    avatarForm.reset();
    saveAvatarButton.classList.add('submit-disabled');
});

// Обработчик для изменения аватара
function handleAvatarSubmit(event, popup) {
    event.preventDefault(); // Отменяем стандартное поведение отправки формы

    // Изменяем текст кнопки на "Сохранение..."
    saveAvatarButton.textContent = 'Сохранение...';

    // Если все в порядке, вызываем функцию обновления аватара
    updateAvatarAction(popup)

}

// Получаем форму из DOM
const avatarImage = document.getElementById('userAvatar'); // Получаем элемент из DOM
const popupAvatar = document.querySelector('.popup_type_avatar'); // Получаем попап из DOM

// Назначаем обработчик события клика на аватар
avatarImage.addEventListener('click', function() {
    // Открываем попап
    openPopup(popupAvatar);
});

// Функция редактирования профиля
function editProfile() {

    formEdit.addEventListener('submit', function (evt) {
        evt.preventDefault(); // Отменяем стандартное действие формы

        // Получаем значения из полей формы
        const newName = formEdit.querySelector('.popup__input_type_name').value;
        const newAbout = formEdit.querySelector('.popup__input_type_description').value;

        // Изменяем текст кнопки на "Сохранение..."
        editSaveButton.textContent = 'Сохранение...';

        // Отправляем запрос на сервер для обновления данных профиля
        editProfileApi(newName, newAbout)

            .then(updatedUserData => {
                // Обработка успешного обновления данных профиля
                console.log('Данные профиля успешно обновлены:', updatedUserData);
                // Вставляем новые значения в профиль
                profileTitle.textContent = newName;
                profileDescription.textContent = newAbout;
                // Закрываем модальное окно
                closePopup(editPopup);
            })
            .catch(error => {
                // Обработка ошибки
                console.error('Ошибка при обновлении данных профиля:', error);
            })
            .finally(() => {
                // Возвращаем исходный текст кнопки после завершения запроса
                editSaveButton.textContent = 'Сохранить';
            });

    });
}

// Вызов функции редактирования профиля
editProfile()

// Функция добавления новой карточки
function addNewCard() {
    const newCardForm = newCardPopup.querySelector('.popup__form');
    const saveButton = newCardForm.querySelector('.popup__button');

    newCardForm.addEventListener('submit', function (evt) {
        evt.preventDefault();// Отменяем стандартное действие формы

        // Получаем значения из полей формы
        const newName = newCardForm.querySelector('.popup__input_type_card-name').value;
        const newLink = newCardForm.querySelector('.popup__input_type_url').value;

        // Изменяем текст кнопки на "Сохранение..."
        saveButton.textContent = 'Сохранение...';

        // Отправляем запрос на сервер для создания новой карточки
        addNewCardApi(newName, newLink)
            .then(res => {
                return res;
            })
            .then(newCardData => {
                // Обработка успешного создания новой карточки
                console.log('Новая карточка успешно создана:', newCardData);
                // Можно обновить данные на странице, если необходимо
                // Например, добавить новую карточку в интерфейс
                const newCard = createCard(newCardData, deleteCard, toggleLike, user._id, openImagePopup, likeCard);

                placesList.prepend(newCard);
                saveButton.classList.add('submit-disabled');
                newCardForm.reset()
                closePopup(newCardPopup);
            })
            .catch(error => {
                // Обработка ошибки
                console.error('Ошибка при создании новой карточки:', error);
            })
            .finally(() => {
                // Возвращаем исходный текст кнопки после завершения запроса
                saveButton.textContent = 'Сохранить';
            });

    });
}

// Вызов функции добавления новой карточки
addNewCard();

//Валидация форм

const formValidationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "submit-disabled",
    inputErrorClass: "input_type-invalid",
    errorClass: "input_span",
};

enableValidation(formValidationConfig)
