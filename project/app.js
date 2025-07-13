let currentVideo = null;
let isMobile = window.innerHeight >= window.innerWidth;

function selectVideo() {
    isMobile = window.innerHeight >= window.innerWidth;
    const existingDesktop = document.querySelector('.video-background');
    const existingPhone = document.querySelector('.video-background-phone');

    if (isMobile && existingDesktop) existingDesktop.remove();
    if (!isMobile && existingPhone) existingPhone.remove();

    if (isMobile && existingPhone) {
        currentVideo = existingPhone;
        return;
    }
    if (!isMobile && existingDesktop) {
        currentVideo = existingDesktop;
        return;
    }

    const video = document.createElement('video');
    video.src = isMobile ? './media/background2.mp4' : './media/background1.mp4';
    video.className = isMobile ? 'video-background-phone' : 'video-background';
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.loop = !isMobile;
    video.disableRemotePlayback = true; // особенно для iOS

    video.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: -1;
    `;

    document.body.appendChild(video);
    currentVideo = video;

    video.addEventListener('loadeddata', () => {
        if (!isMobile) video.play();
    });
}

selectVideo();

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const wasMobile = isMobile;
        const prevTime = currentVideo?.currentTime || 0;

        selectVideo();

        if (currentVideo) {
            currentVideo.currentTime = prevTime;
            if (wasMobile && !isMobile) currentVideo.play();
        }
    }, 300);
});

// Swiper
const swiperText = new Swiper('.swiper', {
    speed: 2600,
    mousewheel: {},
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next'
    }
});

// Перемотка видео
swiperText.on('slideChange', function () {
    if (!currentVideo?.duration) return;

    const slideCount = this.slides?.length ?? 0;
    if (slideCount < 2) return;

    const newTime = (currentVideo.duration / (slideCount - 1)) * this.realIndex;

    if (isMobile) {
        currentVideo.pause();

        const onSeeked = () => {
            currentVideo.play()
                .then(() => {
                    console.log('🔈 Playing short segment');

                    setTimeout(() => {
                        currentVideo.pause();
                        console.log('⏸ Paused');
                    }, 2300);
                })
                .catch((err) => {
                    console.warn('⚠️ play() error:', err);
                });

            currentVideo.removeEventListener('seeked', onSeeked);
        };

        currentVideo.addEventListener('seeked', onSeeked);
        currentVideo.currentTime = currentVideo.currentTime;
    } else {
        gsap.to(currentVideo, {
            duration: 4,
            currentTime: newTime,
            ease: Power2.easeOut,
        });
    }
});


swiperText.on('sliderChangeTransitionStart', () => {
    currentVideo?.classList.add('change');
}).on('sliderChangeTransitionEnd', () => {
    currentVideo?.classList.remove('change');
});

const join_us_1 = document.getElementById('join_us_1').addEventListener('click', function() {
    window.location.href = "https://t.me/onikeloyan"
});
const join_us_2 = document.getElementById('join_us_2').addEventListener('click', function() {
    window.location.href = "https://t.me/onikeloyan"
});
const join_us_3 = document.getElementById('join_us_3').addEventListener('click', function() {
    window.location.href = "https://t.me/onikeloyan"
});
const join_us_4 = document.getElementById('join_us_4').addEventListener('click', function() {
    window.location.href = "https://t.me/onikeloyan"
});

