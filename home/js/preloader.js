// home/js/preloader.js
import { initQR } from './qr.js';

document.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add('loaded');

    const preloader = document.querySelector('.preloader');
    const content = document.querySelector('.content');

    const gradients = ['gradient-1', 'gradient-2', 'gradient-3', 'gradient-4'];
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
    preloader.classList.add(randomGradient);

    const showContent = () => {
        preloader.style.display = 'none';
        content.style.display = 'block';
        initQR(); // ← QR запускается ТОЛЬКО после показа контента
    };

    // Показываем прелоадер при первой загрузке
    if (performance.navigation.type === 0 || performance.navigation.type === 1) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(showContent, 500);
        }, 3000);
    } else {
        showContent();
    }
});
