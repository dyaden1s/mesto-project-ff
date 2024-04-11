import {deleteCardLikeApi, setCardLikeApi, deleteCardApi} from "./api";
// @todo: Темплейт карточки
const cardTemplate = document.getElementById('card-template');

// Функция создания карточки
export function createCard(cardData, onDelete, onLike, userId, openImagePopup) {
    const cardClone = cardTemplate.content.querySelector('.places__item').cloneNode(true);
    const cardTitle = cardClone.querySelector('.card__title');
    const cardImage = cardClone.querySelector('.card__image');
    const deleteButton = cardClone.querySelector('.card__delete-button');
    const likeButton = cardClone.querySelector('.card__like-button');
    const likesCounter = cardClone.querySelector('.card__likes-counter');

    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    //Вывод количества лайков
    likesCounter.textContent = cardData?.likes?.length;

    // Добавляем обработчики событий для кнопок удаления и лайка
    likeButton.addEventListener('click', () => {
        likeCard(likeButton, cardData, cardClone);
        onLike(likeButton);
    });

    // Добавляем обработчик события  удаления карточки на кнопку удаления
    deleteButton.addEventListener('click', () => {
        onDelete(cardClone);
    });

    // Добавляем обработчик события для изображения (картинки)
    cardImage.addEventListener('click', () => openImagePopup(cardData.link, cardData.name));

    // Проверяем, принадлежит ли карточка текущему пользователю
    toggleDeleteButton(deleteButton, cardData.owner?._id, userId, cardData._id);

    cardData?.likes?.forEach((like) => {
        if (like._id === userId) {
            toggleLike(likeButton);
        }
    });

    return cardClone;
}

//Функция удаления карточки
export function toggleDeleteButton(deleteButton, ownerId, userId, cardId) {
    if (ownerId === userId) {
        deleteButton.style.display = 'block';

        // Добавляем обработчик события для удаления карточки
        deleteButton.addEventListener('click', async () => {

            await deleteCardApi(cardId)

            // Удаляем карточку из DOM
            deleteButton.closest('.card').remove();

        });
    }
}


// Функция обработки события лайка
export function toggleLike(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
}

// Снятие лайка
export async function deleteCardLike(cardsData, stroke) {
    try {
        const response = await deleteCardLikeApi(cardsData);

        updateLikeCardUser(stroke, response);
    } catch (error) {
        console.error('Ошибка при снятии лайка:', error);
    }
}

// Постановка лайка
export async function setCardLike(cardsData, stroke) {
    try {
        const response = await setCardLikeApi(cardsData);

        updateLikeCardUser(stroke, response);
    } catch (error) {
        console.error('Ошибка при постановке лайка:', error);
    }
}

//Обновление количества лайков
export function updateLikeCardUser(stroke,cardsData) {
    stroke.textContent = cardsData.likes.length;
}

// @todo: Функция удаления карточки
export function deleteCard(cardElement) {
    cardElement.remove();
}

//Возможность лайкать
export function likeCard(likeButton, cardData, cardClone) {
    const numberLike = cardClone.querySelector('.card__likes-counter');

    if (likeButton.classList.contains('card__like-button_is-active')) {
        // Если лайк уже был поставлен, отправляем запрос на снятие лайка
        deleteCardLike(cardData, numberLike)
            .then(() => {
                // Успешно удален лайк, обновляем UI
                likeButton.classList.remove('card__like-button_is-active');
            })
            .catch(error => {
                // Обработка ошибки при снятии лайка
                console.error('Ошибка при снятии лайка:', error);
            });
    } else {
        // Если лайк не был поставлен, отправляем запрос на установку лайка
        setCardLike(cardData, numberLike)
            .then(() => {
                // Успешно поставлен лайк, обновляем UI
                likeButton.classList.add('card__like-button_is-active');
            })
            .catch(error => {
                // Обработка ошибки при постановке лайка
                console.error('Ошибка при постановке лайка:', error);
            });
    }
}
