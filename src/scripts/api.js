const config = {
    baseUrl: "https://nomoreparties.co/v1/wff-cohort-7",
    headers: {
        authorization: "1bfc1549-f875-4034-870b-38d795fda2ac",
        "Content-Type": "application/json",
    },
};

const getResponseData = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
};

// Функция для загрузки данных о пользователе с сервера
export function getUser() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: {
            authorization: config.headers.authorization,
            "Content-Type": config.headers["Content-Type"],
        }
    }).then(getResponseData);
}

//Функция удаления карточки с сервера
export function deleteCardApi(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: config.headers.authorization,
            "Content-Type": config.headers["Content-Type"],
        }
    }).then(getResponseData);
}

// Функция для загрузки данных карточек с сервера
export function getCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: {
            authorization: config.headers.authorization,
            "Content-Type": config.headers["Content-Type"],
        }
    }).then(getResponseData);
}

// Функция редактирования профиля
export function editProfileApi(newName, newAbout) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: config.headers.authorization,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: newName,
            about: newAbout
        })
    }).then(getResponseData);
}

// Функция добавления новой карточки
export function addNewCardApi(newName, newLink) {
    return fetch(`${config.baseUrl}/cards`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
            name: newName,
            link: newLink,
        }),
    }).then(getResponseData);
}

// Постановка лайка
export function setCardLikeApi(cardsData) {
    return fetch(`${config.baseUrl}/cards/likes/${cardsData._id}`, {
        method: 'PUT',
        headers: {
            authorization: config.headers.authorization,
            "Content-Type": config.headers["Content-Type"],
        }
    }).then(getResponseData);
}

// Снятие лайка
export function deleteCardLikeApi(cardsData) {
    return fetch(`${config.baseUrl}/cards/likes/${cardsData._id}`, {
        method: 'DELETE',
        headers: {
            authorization: config.headers.authorization,
            "Content-Type": config.headers["Content-Type"],
        }
    }).then(getResponseData);
}

// Функция обновления аватара пользователя
export function updateAvatar(avatarUrl) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: config.headers.authorization,
            "Content-Type": config.headers["Content-Type"],
        },
        body: JSON.stringify({ avatar: avatarUrl })
    }).then(getResponseData);
}
