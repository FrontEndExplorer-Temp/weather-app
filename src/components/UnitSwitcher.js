export function UnitSwitcher({ unit = 'C' }) {
  return `
    <button id="unit-switcher" aria-label="Switch to ${unit === 'C' ? 'Fahrenheit' : 'Celsius'}" title="Switch to ${unit === 'C' ? '°F' : '°C'}">
      ${unit === 'C' ? 'Switch to °F' : 'Switch to °C'}
    </button>
  `;
} 