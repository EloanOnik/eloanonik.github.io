document.addEventListener('DOMContentLoaded', () => {
    const avatar = document.getElementById('avatar');
    const timestamp = Date.now();
    const telegramUrl = `https://t.me/i/userpic/320/onikeloyan.jpg?t=${timestamp}`;
    
    // Создаем скрытый объект для предзагрузки
    const tempImg = new Image();
    
    tempImg.onload = () => {
        avatar.src = telegramUrl;
        avatar.classList.add('loaded');
    };
    
    tempImg.onerror = () => {
        avatar.src = 'https://via.placeholder.com/320';
        avatar.classList.add('loaded');
    };
    
    tempImg.src = telegramUrl; // Начинаем загрузку
});
