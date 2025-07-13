(function() {
// Жёсткая очистка всех favicon-тегов
    const removeAllIcons = () => {
    document.querySelectorAll('link[rel*="icon"], link[rel="apple-touch-icon"], meta[name*="icon"]').forEach(el => el.remove());
    
    // Особые случаи для разных браузеров
    const blankIcon = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"></svg>';
    document.head.insertAdjacentHTML('beforeend', `
        <link rel="icon" href="${blankIcon}" type="image/svg+xml">
        <link rel="shortcut icon" href="${blankIcon}">
    `);
    };
    
    // 2. Динамическая вставка новых иконок из Telegram
    const updateIcons = () => {
    removeAllIcons();
    const timestamp = Date.now();
    const username = 'onikeloyan';
    
    const avatarUrl = `https://t.me/i/userpic/320/${username}.jpg?force_cache=${timestamp}`;

    const icon = document.createElement('link');
    icon.rel = 'icon';
    icon.href = avatarUrl;
    document.head.appendChild(icon);

    
    // 3. Принудительный ререндер в особых случаях
    setTimeout(() => {
        const temp = document.createElement('div');
        temp.innerHTML = '<!-- forced rerender -->';
        document.head.appendChild(temp);
        temp.remove();
    }, 100);
    };
    
    // Первичная загрузка + обновление каждые 6 часов
    document.addEventListener('DOMContentLoaded', updateIcons);
    setInterval(updateIcons, 2 * 60 * 60 * 1000);
})();