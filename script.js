document.addEventListener('DOMContentLoaded', () => {
    // Theme switching
    const themeBtns = document.querySelectorAll('.theme-btn');
    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            themeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.body.className = '';
            document.body.classList.add(btn.dataset.theme);
        });
    });

    // Initialize active theme button
    themeBtns[0].classList.add('active');

    // WiFi slider
    const wifiSlider = document.getElementById('wifi-speed');
    const currentSpeed = document.getElementById('current-speed');
    const dataUsed = document.getElementById('data-used');
    const latency = document.getElementById('latency');
    const status = document.getElementById('status');
    let totalData = 0;
    let animationFrameId = null;
    let lastUpdateTime = 0;

    // Useless button
    const uselessBtn = document.getElementById('useless-btn');
    uselessBtn.addEventListener('click', () => {
        alert("This button does nothing and never will. It's just for show!");
    });

    // WiFi toggle
    const wifiToggle = document.getElementById('wifi-power');
    wifiToggle.addEventListener('change', updateStatus);

    // Main update function
    function updateStatus() {
        const powerOn = wifiToggle.checked;
        const speedValue = powerOn ? wifiSlider.value : 0;

        // Update speed display
        currentSpeed.textContent = `${speedValue} Mbps`;

        // Update status
        if (!powerOn) {
            status.textContent = "Off";
            status.className = "status danger";
            return;
        }

        if (speedValue < 20) {
            status.textContent = "Extreme Lag";
            status.className = "status danger";
        } else if (speedValue < 40) {
            status.textContent = "High Latency";
            status.className = "status warning";
        } else if (speedValue < 60) {
            status.textContent = "Optimal";
            status.className = "status optimal";
        } else if (speedValue < 80) {
            status.textContent = "Good";
            status.className = "status optimal";
        } else {
            status.textContent = "Excellent";
            status.className = "status optimal";
        }

        // Update latency based on speed
        const calculatedLatency = Math.max(10, 100 - speedValue * 1.5);
        latency.textContent = `${Math.round(calculatedLatency)}ms`;

        // Start/stop data consumption
        if (speedValue > 0) {
            startDataConsumption(speedValue);
        } else {
            stopDataConsumption();
        }
    }

    // Data consumption simulation
    function startDataConsumption(speed) {
        stopDataConsumption(); // Stop any existing consumption

        const updateDataUsage = (timestamp) => {
            if (!lastUpdateTime) {
                lastUpdateTime = timestamp;
            }

            const deltaTime = timestamp - lastUpdateTime;
            lastUpdateTime = timestamp;

            // Calculate data usage based on speed (simulated)
            const dataPerSecond = speed * 0.1; // 0.1 MB per Mbps per second
            totalData += dataPerSecond * (deltaTime / 1000);
            dataUsed.textContent = `${totalData.toFixed(2)} MB`;

            // Continue the animation loop
            animationFrameId = requestAnimationFrame(updateDataUsage);
        };

        animationFrameId = requestAnimationFrame(updateDataUsage);
    }

    function stopDataConsumption() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
        lastUpdateTime = 0;
    }

    // Initialize
    updateStatus();

    // Slider event listener
    wifiSlider.addEventListener('input', updateStatus);

    // Simulate tab slowdown when in danger zone
    function simulateTabSlowdown() {
        const dangerZone = document.querySelector('.danger-zone');
        const dangerThreshold = 20;

        if (wifiSlider.value < dangerThreshold && wifiToggle.checked) {
            // Create overlay effect
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            overlay.style.zIndex = '9999';
            overlay.style.pointerEvents = 'none';
            overlay.style.transition = 'background-color 0.1s linear';

            document.body.appendChild(overlay);

            // Remove overlay when slider moves out of danger zone
            const removeOverlay = () => {
                if (wifiSlider.value >= dangerThreshold || !wifiToggle.checked) {
                    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
                    setTimeout(() => {
                        document.body.removeChild(overlay);
                    }, 200);
                }
            };

            // Check periodically
            const checkInterval = setInterval(removeOverlay, 100);

            // Clean up when slider changes
            const cleanup = () => {
                clearInterval(checkInterval);
                if (overlay.parentNode) {
                    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
                    setTimeout(() => {
                        document.body.removeChild(overlay);
                    }, 200);
                }
            };

            wifiSlider.addEventListener('input', cleanup, { once: true });
            wifiToggle.addEventListener('change', cleanup, { once: true });
        }
    }

    // Add danger zone visual indicator
    const dangerZone = document.querySelector('.danger-zone');
    wifiSlider.addEventListener('input', () => {
        if (wifiSlider.value < 20) {
            dangerZone.style.animation = 'pulse 1s infinite';
        } else {
            dangerZone.style.animation = 'none';
        }
        simulateTabSlowdown();
    });

    // Add CSS for pulse animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
});
