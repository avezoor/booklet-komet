<h1 style="text-align: center;">Countdown to the Close of Registration</h1>

<div id="countdown-timer" class="countdown-display">
  <!-- Countdown will be inserted here by JavaScript -->
</div>

<style>
.countdown-display {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 2.5rem 0;
  padding: 1rem;
  border-radius: 12px;
  background-color: transparent;
  backdrop-filter: blur(2px);
}

.countdown-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
  padding: 1rem;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.4);
  color: var(--text-color);
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: transform 0.3s ease;
}

.dark-mode .countdown-unit {
  background-color: rgba(255, 255, 255, 0.1);
}

.countdown-unit:hover {
  transform: translateY(-4px);
}

.countdown-value {
  font-size: 2.4rem;
  font-weight: 600;
  color: var(--text-color);
}

.countdown-label {
  margin-top: 0.3rem;
  font-size: 0.85rem;
  text-transform: uppercase;
  opacity: 0.7;
  letter-spacing: 1px;
}

@media (max-width: 768px) {
  .countdown-value {
    font-size: 2rem;
  }
}
</style>
