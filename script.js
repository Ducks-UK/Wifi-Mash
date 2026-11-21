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

    // WiFi stats (simulated real stats)
    const uploadSpeed = document.getElementById('upload-speed');
    const downloadSpeed = document.getElementById('download-speed');
    const ping = document.getElementById('ping');
    const dataUsed = document.getElementById('data-used');

    // Speedometer elements
    const meterNeedle = document.getElementById('meter-needle');
    const currentSpeed = document.getElementById('current-speed');

    // WiFi control elements
    const wifiSlider = document.getElementById('wifi-speed');
    const wifiToggle = document.getElementById('wifi-power');
    const wifiIcon = document.getElementById('wifi-icon');

    // Useless button and modal
    const uselessBtn = document.getElementById('useless-btn');
    const modal = document.getElementById('useless-modal');
    const closeBtn = document.querySelector('.close-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');

    // Messages for the useless button
    const uselessMessages = [
        "This button does nothing and never will.",
        "I'm just a pretty face with no function.",
        "Click me all you want - nothing will happen.",
        "I'm the digital equivalent of a paperweight.",
        "My purpose is purely decorative.",
        "I'm like a participation trophy - you get nothing for clicking me.",
        "I'm the UI equivalent of a placebo.",
        "I'm here to waste your time.",
        "I
