import {initialCards} from "./cards";
import {createCard, toggleLike, deleteCard} from "./card";
import {openPopup, closePopup, closePopupByOverlay} from "./modal";

// @todo: Вывести карточки на страницу

function addCardsToPage() {
    const cardsContainer = document.querySelector('.places__list');

    initialCards.forEach(cardData => {
        const cardElement = createCard(cardData, deleteCard, toggleLike, openImagePopup);
        cardsContainer.appendChild(cardElement);
    });
}

addCardsToPage();

// Функция открытия попапа с изображением
export function openImagePopup(imageSrc, imageName) {
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
document.addEventListener('DOMContentLoaded', function () {
    const editButton = document.querySelector('.profile__edit-button');
    const addButton = document.querySelector('.profile__add-button');
    const image = document.querySelector('.profile__image');
    const editPopup = document.querySelector('.popup_type_edit');
    const newCardPopup = document.querySelector('.popup_type_new-card');
    const closeButtons = document.querySelectorAll('.popup__close');
    const formEdit = document.querySelector('.popup_type_edit .popup__form');
    const formNewCard = document.querySelector('.popup_type_new-card .popup__form');
    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');
    const placesList = document.querySelector('.places__list');

    // Обработчик события отправки формы редактирования профиля
    formEdit.addEventListener('submit', function (evt) {
        evt.preventDefault(); // Отменяем стандартное действие формы

        // Получаем значения из полей формы
        const newName = formEdit.querySelector('.popup__input_type_name').value;
        const newDescription = formEdit.querySelector('.popup__input_type_description').value;

        // Вставляем новые значения в профиль
        profileTitle.textContent = newName;
        profileDescription.textContent = newDescription;

        // Закрываем модальное окно
        closePopup(editPopup);

        // Очищаем поля формы
        formEdit.reset();
    });

    // Обработчик отправки формы для создания новой карточки
    function handleNewCardFormSubmit(evt) {
        evt.preventDefault(); // Отменяем стандартное действие формы

        // Получаем значения из полей формы
        const newName = formNewCard.elements['place-name'].value;
        const newLink = formNewCard.elements['link'].value;

        // Создаем новую карточку с правильными данными
        const newCard = createCard({name: newName, link: newLink}, deleteCard, toggleLike, openImagePopup);

        // Добавляем новую карточку в начало контейнера
        placesList.prepend(newCard);

        // Закрываем модальное окно
        closePopup(newCardPopup);

        // Очищаем поля формы
        formNewCard.reset();
    }

    formNewCard.addEventListener('submit', handleNewCardFormSubmit);

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
    });

    addButton.addEventListener('click', function () {
        openPopup(newCardPopup);
    });

    image.addEventListener('click', function (event) {
        event.stopPropagation(); // Останавливаем всплытие события, чтобы оно не передавалось выше
    });

    closeButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const popup = button.closest('.popup');
            closePopup(popup);
        });
    });

});

// Закрытие модального окна при клике вне его области

document.addEventListener('click', closePopupByOverlay);
