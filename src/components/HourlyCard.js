export function HourlyCard({ time, temp, description, icon, unit = 'C' }) {
  return `
    <div class="hourly-card">
      <p><strong>${time}</strong></p>
      <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" />
      <p>${temp}°${unit}</p>
      <p>${description}</p>
    </div>
  `;
} 