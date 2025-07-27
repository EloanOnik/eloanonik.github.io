// home/js/qr.js
export function initQR() {
    const modalBtn = document.getElementById('modalBtn');
    const modal = document.getElementById('myModal');
    const closeBtn = modal.querySelector('.close');

    if (!modalBtn || !modal || !closeBtn) {
        console.warn('QR: Некоторые элементы не найдены');
        return;
    }

    // Показ модального окна
    modalBtn.addEventListener('click', function (e) {
        e.preventDefault();
        modal.classList.add('show');
    });

    modalBtn.addEventListener('touchstart', function (e) {
        e.preventDefault();
        modal.classList.add('show');
    });

    // Закрытие модального окна
    closeBtn.addEventListener('click', function () {
        modal.classList.remove('show');
    });

    window.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
}
