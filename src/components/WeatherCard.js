export function WeatherCard({ city, temp, description, humidity, wind, icon, unit = 'C' }) {
  return `
    <div class="weather-card">
      <h2>${city}</h2>
      <div class="weather-main">
        <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" class="weather-icon" />
        <div class="weather-temp">
          <span class="temp-value">${temp}</span>
          <span class="temp-unit">°${unit}</span>
        </div>
      </div>
      <p class="weather-desc">${description}</p>
      <div class="weather-details">
        <span>Humidity: ${humidity}%</span>
        <span>Wind: ${wind} m/s</span>
      </div>
    </div>
  `;
} 