export function ForecastCard({ dayName, temp, description, icon, unit = 'C' }) {
  return `
    <div class="forecast-card">
      <p><strong>${dayName}</strong></p>
      <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" />
      <p>${temp}°${unit}</p>
      <p>${description}</p>
    </div>
  `;
} 