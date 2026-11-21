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
    let dataUsed = 0;
    let intervalId = null;
    let isConsuming = false;

    wifiSlider.addEventListener('input', () => {
        wifiValue.textContent = `${wifiSlider.value}%`;
        updateConnectionStatus();
    });

    // WiFi toggle
    const wifiToggle = document.getElementById('wifi-power');
    wifiToggle.addEventListener('change', () => {
        updateConnectionStatus();
    });

    // Connection status and real data consumption
    function updateConnectionStatus() {
        const statusIndicator = document.getElementById('status-indicator');
        const connectionText = document.getElementById('connection-text');
        const speedText = document.getElementById('speed-text');

        if (wifiToggle.checked && wifiSlider.value > 0) {
            statusIndicator.style.backgroundColor = getComputedStyle(document.documentElement)
                .getPropertyValue('--connection-color');
            connectionText.textContent = 'Consuming data';

            // Start consuming data if not already
            if (!isConsuming) {
                startDataConsumption();
            }
        } else {
            statusIndicator.style.backgroundColor = '#f44336';
            connectionText.textContent = 'Idle';
            connectionText.style.color = 'var(--text-color)';

            // Stop consuming data
            if (isConsuming) {
                clearInterval(intervalId);
                isConsuming = false;
            }
        }
    }

    // Function to consume real network data
    function startDataConsumption() {
        isConsuming = true;
        const chunkSize = 1024 * 100; // 100KB chunks
        const delay = 1000 / (wifiSlider.value / 10); // Faster when slider is lower

        intervalId = setInterval(() => {
            // Create a large blob of data
            const data = new Blob([new Array(chunkSize).join('x')]);
            const url = URL.createObjectURL(data);

            // Make a fetch request to consume bandwidth
            fetch(url, {
                method: 'GET',
                cache: 'no-store'
            })
            .then(() => {
                dataUsed += chunkSize / 1024; // Convert to KB
                document.getElementById('speed-text').textContent = `Data used: ${Math.round(dataUsed)} KB`;
                URL.revokeObjectURL(url);
            })
            .catch(() => {
                // In case of error, just continue
                URL.revokeObjectURL(url);
            });
        }, delay);
    }

    // Initialize status
    updateConnectionStatus();

    // Fun easter egg
    let clickCount = 0;
    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'BODY') {
            clickCount++;
            if (clickCount >= 5) {
                alert(`Meow! You found the secret!\n\nTotal data consumed: ${Math.round(dataUsed)} KB\n\nResetting...`);
                dataUsed = 0;
                document.getElementById('speed-text').textContent = 'Data used: 0 KB';
                clickCount = 0;
            }
        }
    });
});
