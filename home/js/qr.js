import QRCodeStyling from "https://cdn.jsdelivr.net/npm/qr-code-styling@1.5.0/lib/qr-code-styling.js";

// Создание QR-кода
const qrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    type: 'canvas',
    data: 'https://t.me/onikeloyan',
    dotsOptions: {
        type: 'rounded',
        color: '#000000',
    },
    backgroundOptions: {
        color: 'transparent',
    },
});

document.addEventListener("DOMContentLoaded", () => {
    const qrDiv = document.getElementById('qr');
    const gradientLayer = document.getElementById('gradient-layer');
    const modal = document.getElementById("myModal");
    const btn = document.getElementById("modalBtn");
    const span = document.querySelector(".close");

    if (!qrDiv || !gradientLayer || !modal || !btn || !span) return;

    qrCode.append(qrDiv);

    // Применяем маску из QR
    setTimeout(() => {
        const canvas = qrDiv.querySelector('canvas');
        if (canvas) {
            const dataUrl = canvas.toDataURL('image/png');
            gradientLayer.style.maskImage = `url(${dataUrl})`;
            gradientLayer.style.webkitMaskImage = `url(${dataUrl})`;
        }
    }, 300);

    // Плавное изменение градиента
    const handleMove = (e) => {
        const rect = qrDiv.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const dx = clientX - centerX;
        const dy = clientY - centerY;

        const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

        const percentX = clientX / window.innerWidth;
        const percentY = clientY / window.innerHeight;

        const hue1 = Math.floor(percentX * 360);
        const hue2 = Math.floor(percentY * 360);

        const color1 = `hsl(${hue1}, 100%, 50%)`;
        const color2 = `hsl(${hue2}, 100%, 50%)`;

        gradientLayer.style.background = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchmove', handleMove, { passive: true });

    // Открытие модального окна
    const openModal = (e) => {
        e.preventDefault();
        modal.style.display = "block";
    };

    btn.addEventListener('click', openModal);
    btn.addEventListener('touchstart', openModal, { passive: false });

    // Закрытие модального окна
    span.onclick = () => {
        modal.style.display = "none";
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
});
