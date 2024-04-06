// Функция открытия попапа
export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscPress);
}

// Функция закрытия попапа
export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscPress);
}

// Обработчик события нажатия клавиши Esc
export function handleEscPress(event) {
    if (event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
}

// Закрытие модального окна при клике вне его области
export function closePopupByOverlay(event) {
    if (event.target.classList.contains('popup')) {
        closePopup(event.target);
    }
}
