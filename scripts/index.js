// @todo: Темплейт карточки
const cardTemplate = document.getElementById('card-template');
// @todo: DOM узлы

// @todo: Функция создания карточки
function createCard(cardData, onDelete) {
    const cardClone = cardTemplate.content.cloneNode(true).querySelector('.places__item');
    const cardTitle = cardClone.querySelector('.card__title');
    const cardImage = cardClone.querySelector('.card__image');
    const deleteButton = cardClone.querySelector('.card__delete-button');
    const likeButton = cardClone.querySelector('.card__like-button');

    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    // Добавляем обработчик на кнопку удаления
    deleteButton.addEventListener('click', () => onDelete(cardClone));

    // Добавляем обработчик лайка
    likeButton.addEventListener('click', () => likeCard(likeButton));

    return cardClone;
}
// @todo: Функция удаления карточки
function deleteCard(cardElement) {
    cardElement.remove();
}

// @todo: Вывести карточки на страницу
function addCardsToPage() {
    const cardsContainer = document.querySelector('.places__list');

    initialCards.forEach(cardData => {
        const cardElement = createCard(cardData, deleteCard);
        cardsContainer.appendChild(cardElement);
    });
}

function addCardsToPage() {
    const cardsContainer = document.querySelector('.places__list');

    initialCards.forEach(cardData => {
        const cardElement = createCard(cardData, deleteCard);
        cardsContainer.appendChild(cardElement);
    });
}

function likeCard(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
}

addCardsToPage();