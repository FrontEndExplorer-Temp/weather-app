export function ThemeToggle({ isDark = false }) {
  return `
    <button id="theme-switcher" aria-label="${isDark ? 'Switch to light mode' : 'Switch to dark mode'}" title="${isDark ? 'Light Mode' : 'Dark Mode'}">
      ${isDark ? '🌙 Dark' : '☀️ Light'}
    </button>
  `;
} 