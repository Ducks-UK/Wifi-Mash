document.addEventListener('DOMContentLoaded', () => {
    // Theme switching
    const themeBtns = document.querySelectorAll('.theme-btn');
    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.body.className = '';
            document.body.classList.add(btn.dataset.theme);
        });
    });

    // Slider updates
    const sliders = document.querySelectorAll('.slider');
    sliders.forEach(slider => {
        const valueSpan = slider.nextElementSibling;
        slider.addEventListener('input', () => {
            valueSpan.textContent = `${slider.value}%`;
        });
    });

    // Easter eggs
    const easterEgg = document.getElementById('easter-egg');
    let clickCount = 0;
    const secretClicks = ['kitten', 'meow', 'purr', 'cat', 'whiskers'];

    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'BODY') {
            clickCount++;
            if (clickCount >= 5) {
                easterEgg.textContent = secretClicks[Math.floor(Math.random() * secretClicks.length)];
                clickCount = 0;
                setTimeout(() => easterEgg.textContent = '', 2000);
            }
        }
    });

    // Fun animation
    setInterval(() => {
        if (Math.random() < 0.1) {
            const catEyes = document.querySelectorAll('.cat .slider::-webkit-slider-thumb');
            catEyes.forEach(eye => {
                eye.style.transform = 'scale(1.2)';
                setTimeout(() => eye.style.transform = 'scale(1)', 300);
            });
        }
    }, 1000);
});
