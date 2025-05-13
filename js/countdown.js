document.addEventListener("DOMContentLoaded", async function () {
    const config = await import('./config.js');
    const countdownConfig = config.default.countdown;

    function updateCountdown() {
        const countdownElement = document.getElementById("countdown-timer");
        if (!countdownElement) return;

        const targetDate = new Date(countdownConfig.targetDate);
        const now = new Date();
        const difference = targetDate - now;

        if (difference <= 0) {
            countdownElement.innerHTML = `<span class="countdown-ended">${countdownConfig.endMessage}</span>`;
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `
            <div class="countdown-unit">
                <span class="countdown-value">${days}</span>
                <span class="countdown-label">${countdownConfig.units.days}</span>
            </div>
            <div class="countdown-unit">
                <span class="countdown-value">${hours}</span>
                <span class="countdown-label">${countdownConfig.units.hours}</span>
            </div>
            <div class="countdown-unit">
                <span class="countdown-value">${minutes}</span>
                <span class="countdown-label">${countdownConfig.units.minutes}</span>
            </div>
            <div class="countdown-unit">
                <span class="countdown-value">${seconds}</span>
                <span class="countdown-label">${countdownConfig.units.seconds}</span>
            </div>
        `;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
});