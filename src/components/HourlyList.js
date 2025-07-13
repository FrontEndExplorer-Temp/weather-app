import { HourlyCard } from "./HourlyCard.js";

export function HourlyList({ hourly, unit = 'C' }) {
  return `
    <h3>Upcoming Weather Highlights</h3>
    <div class="card-container">
      ${hourly.map(hour => HourlyCard({ ...hour, unit })).join("")}
    </div>
  `;
} 