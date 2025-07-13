import { ForecastCard } from "./ForecastCard.js";

export function ForecastList({ forecasts, unit = 'C' }) {
  return `
    <h3>Next 5 Days Forecast</h3>
    <div class="card-container">
      ${forecasts.map(forecast => ForecastCard({ ...forecast, unit })).join("")}
    </div>
  `;
} 