document.addEventListener('DOMContentLoaded', () => {
    // Theme switching
    const themeBtns = document.querySelectorAll('.theme-btn');
    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.body.className = '';
            document.body.classList.add(btn.dataset.theme);
        });
    });

    // WiFi slider
    const wifiSlider = document.getElementById('wifi-strength');
    const wifiValue = wifiSlider.nextElementSibling;
    wifiSlider.addEventListener('input', () => {
        wifiValue.textContent = `${wifiSlider.value}%`;
        updateConnectionStatus();
    });

    // WiFi toggle
    const wifiToggle = document.getElementById('wifi-power');
    wifiToggle.addEventListener('change', updateConnectionStatus);

    // Connection status update
    function updateConnectionStatus() {
        const statusIndicator = document.getElementById('status-indicator');
        const connectionText = document.getElementById('connection-text');

        if (wifiToggle.checked && wifiSlider.value > 0) {
            statusIndicator.style.backgroundColor = getComputedStyle(document.documentElement)
                .getPropertyValue('--connection-color');
            connectionText.textContent = 'Connected';
        } else {
            statusIndicator.style.backgroundColor = '#f44336';
            connectionText.textContent = 'Disconnected';
        }
    }

    // Initialize status
    updateConnectionStatus();

    // Fun easter egg
    let clickCount = 0;
    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'BODY') {
            clickCount++;
            if (clickCount >= 5) {
                alert('Meow! You found the secret!');
                clickCount = 0;
            }
        }
    });
});
