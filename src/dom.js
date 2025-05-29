export function renderCurrentWeather(processed, rawData) {
  return `
    <h2>${processed.city}</h2>
    <p>Temperature: ${processed.temp}°C</p>
    <p>Weather: ${processed.description}</p>
    <p>Humidity: ${rawData.main.humidity}%</p>
    <p>Wind Speed: ${rawData.wind.speed} m/s</p>
    <img src="http://openweathermap.org/img/wn/${processed.icon}.png" alt="${processed.description}" />
  `;
}

export function renderForecastCards(forecastList) {
  const cards = forecastList.map(forecast => `
    <div class="forecast-card">
      <p><strong>${forecast.dayName}</strong></p>
      <p>${forecast.temp}°C</p>
      <p>${forecast.description}</p>
      <img src="http://openweathermap.org/img/wn/${forecast.icon}.png" alt="${forecast.description}" />
    </div>
  `).join("");

  return `<h3>Next 5 Days Forecast</h3><div class="card-container">${cards}</div>`;
}

export function renderHourlyCards(hourlyList) {
  const cards = hourlyList.map(hour => `
    <div class="hourly-card">
      <p><strong>${hour.time}</strong></p>
      <p>${hour.temp}°C</p>
      <p>${hour.description}</p>
      <img src="http://openweathermap.org/img/wn/${hour.icon}.png" alt="${hour.description}" />
    </div>
  `).join("");

  return `<h3>Upcoming Weather Highlights</h3><div class="card-container">${cards}</div>`;
}
