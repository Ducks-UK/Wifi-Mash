// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Theme management
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeStyles = {
        light: {
            '--bg-color': '#f5f5f5',
            '--card-bg': '#ffffff',
            '--text-color': '#333333',
            '--accent-color': '#4285f4',
            '--danger-color': '#d32f2f',
            '--success-color': '#388e3c'
        },
        dark: {
            '--bg-color': '#121212',
            '--card-bg': '#1e1e1e',
            '--text-color': '#e0e0e0',
            '--accent-color': '#8ab4f8',
            '--danger-color': '#f44336',
            '--success-color': '#4caf50'
        },
        cat: {
            '--bg-color': '#ffebee',
            '--card-bg': '#fce4ec',
            '--text-color': '#8d6e63',
            '--accent-color': '#e91e63',
            '--danger-color': '#ff5722',
            '--success-color': '#4caf50'
        }
    };

    // Set initial theme
    let currentTheme = 'light';
    applyTheme(currentTheme);

    // Theme toggle event
    themeToggle.addEventListener('click', function() {
        const themes = Object.keys(themeStyles);
        const currentIndex = themes.indexOf(currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        currentTheme = themes[nextIndex];
        applyTheme(currentTheme);
    });

    function applyTheme(theme) {
        const styles = themeStyles[theme];
        for (const [key, value] of Object.entries(styles)) {
            document.documentElement.style.setProperty(key, value);
        }
    }

    // WiFi controls
    const speedSlider = document.getElementById('speed-slider');
    const powerToggle = document.getElementById('power-toggle');
    const dangerZone = document.getElementById('danger-zone');
    const statsDisplay = document.getElementById('stats-display');
    const speedometerNeedle = document.querySelector('.speedometer-needle');
    const speedometerValue = document.getElementById('speedometer-value');
    const uselessButton = document.getElementById('useless-button');
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    const closeModal = document.getElementById('close-modal');
    const dataUsageCounter = document.getElementById('data-usage');
    const pingDisplay = document.getElementById('ping-value');

    // Useless button messages
    const uselessMessages = [
        "This button does nothing and never will.",
        "I'm just a pretty face with no function.",
        "Click me all you want - nothing will happen.",
        "I'm a teapot (RFC 2324).",
        "404: Function not found.",
        "This button is a liar - it claims to do something but doesn't.",
        "I'm not lazy, I'm in energy-saving mode.",
        "This button is powered by pure imagination.",
        "Error: Imagination not found.",
        "This button is a placebo - it makes you feel better but does nothing.",
        "I'm a figment of your imagination.",
        "This button is a black hole - it consumes all your clicks.",
        "Warning: This button may contain traces of nothingness.",
        "I'm a ghost - I haunt your clicks but do nothing.",
        "This button is a paradox - it exists but does nothing.",
        "I'm a simulation - I pretend to be a button but am not."
    ];

    // State variables
    let isPowerOn = true;
    let currentSpeed = 0;
    let dataUsage = 0;
    let ping = 50;
    let animationId;
    let shakeInterval;

    // Initialize
    updateSpeedometer(0);
    updateStats();
    pulseWiFiIcon();

    // Power toggle event
    powerToggle.addEventListener('click', function() {
        isPowerOn = !isPowerOn;
        if (isPowerOn) {
            powerToggle.textContent = '⏻';
            startSimulation();
        } else {
            powerToggle.textContent = '⭕';
            cancelAnimationFrame(animationId);
            clearInterval(shakeInterval);
            body.classList.remove('shake');
        }
    });

    // Speed slider event
    speedSlider.addEventListener('input', function() {
        currentSpeed = parseInt(this.value);
        updateSpeedometer(currentSpeed);
        updateStats();

        if (currentSpeed <= 20) {
            dangerZone.classList.add('active');
            startDangerEffects();
        } else {
            dangerZone.classList.remove('active');
            clearInterval(shakeInterval);
            body.classList.remove('shake');
        }
    });

    // Useless button event
    uselessButton.addEventListener('click', function() {
        const randomIndex = Math.floor(Math.random() * uselessMessages.length);
        modalMessage.textContent = uselessMessages[randomIndex];
        modal.style.display = 'block';
    });

    // Close modal event
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Modal close when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Simulation functions
    function startSimulation() {
        if (!isPowerOn) return;

        function animate() {
            // Simulate data usage
            dataUsage += currentSpeed * 0.1;
            dataUsageCounter.textContent = `${dataUsage.toFixed(2)} MB`;

            // Simulate ping increase in danger zone
            if (currentSpeed <= 20) {
                ping += 0.5;
                pingDisplay.textContent = `${ping.toFixed(0)} ms`;
            }

            animationId = requestAnimationFrame(animate);
        }

        animate();
    }

    function startDangerEffects() {
        shakeInterval = setInterval(() => {
            body.classList.toggle('shake');
        }, 200);
    }

    function updateSpeedometer(speed) {
        // Update digital display
        speedometerValue.textContent = `${speed}%`;

        // Update analog needle
        const needle = speedometerNeedle;
        const maxRotation = 135; // degrees
        const rotation = (speed / 100) * maxRotation;
        needle.style.transform = `rotate(${rotation}deg)`;
    }

    function updateStats() {
        const uploadSpeed = 200 * (currentSpeed / 100);
        const downloadSpeed = 150 * (currentSpeed / 100);
        statsDisplay.innerHTML = `
            <p>Upload: ${uploadSpeed.toFixed(1)} Mbps</p>
            <p>Download: ${downloadSpeed.toFixed(1)} Mbps</p>
        `;
    }

    function pulseWiFiIcon() {
        const wifiIcon = document.querySelector('.wifi-icon');
        if (wifiIcon) {
            setInterval(() => {
                wifiIcon.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    wifiIcon.style.transform = 'scale(1)';
                }, 500);
            }, 2000);
        }
    }
});
