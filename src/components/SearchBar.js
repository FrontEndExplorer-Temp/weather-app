export function SearchBar({ history = [] }) {
  return `
    <form id="location-form" autocomplete="off" role="search" aria-label="Weather search">
      <input type="text" id="location-input" placeholder="Enter city name" required aria-label="City name" />
      <button type="submit" aria-label="Get weather">Get Weather</button>
      <button id="get-location-btn" type="button" aria-label="Get weather for my location">Get Weather for My Location</button>
      <div class="search-history-dropdown" id="search-history-dropdown" style="display: none;" role="listbox" aria-label="Recent searches"></div>
    </form>
  `;
} 