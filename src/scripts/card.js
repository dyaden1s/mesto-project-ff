// @todo: Темплейт карточки
const cardTemplate = document.getElementById('card-template');

// @todo: Функция создания карточки
export function createCard(cardData, onDelete, onLike, onImageClick) {
    const cardClone = cardTemplate.content.cloneNode(true).querySelector('.places__item');
    const cardTitle = cardClone.querySelector('.card__title');
    const cardImage = cardClone.querySelector('.card__image');
    const deleteButton = cardClone.querySelector('.card__delete-button');
    const likeButton = cardClone.querySelector('.card__like-button');

    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    // Добавляем обработчики событий для кнопок удаления и лайка
    deleteButton.addEventListener('click', () => onDelete(cardClone));
    likeButton.addEventListener('click', () => onLike(likeButton));

    // Отладочный вывод для проверки содержимого cardImage
    console.log(cardImage);

    // Добавляем обработчик события для изображения (картинки)
    cardImage.addEventListener('click', () => onImageClick(cardData.link, cardData.name));

    return cardClone;
}

// Функция обработки события лайка
export function toggleLike(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
}

// @todo: Функция удаления карточки
export function deleteCard(cardElement) {
    cardElement.remove();
}
