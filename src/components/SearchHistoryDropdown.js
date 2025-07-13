export function SearchHistoryDropdown({ history = [] }) {
  if (!history.length) return '';
  return `
    <ul class="search-history-list">
      ${history.map(city => `<li class="search-history-item" data-city="${city}">${city}</li>`).join('')}
    </ul>
  `;
} 