import "./styles/main.css";
import "./styles/card.css";
import "./styles/themes.css";
import { getWeatherData, getForecastData } from "./services/weatherService.js";
import { getWeatherByGeolocation } from "./services/geolocationService.js";
import { processWeatherData, processForecastData, processHourlyData } from "./utils/forecastUtils.js";
import { WeatherCard } from "./components/WeatherCard.js";
import { ForecastList } from "./components/ForecastList.js";
import { HourlyList } from "./components/HourlyList.js";
import { SearchBar } from "./components/SearchBar.js";
import { SearchHistoryDropdown } from "./components/SearchHistoryDropdown.js";
import { ThemeToggle } from "./components/ThemeToggle.js";
import { UnitSwitcher } from "./components/UnitSwitcher.js";

const API_KEY = "408b38cd136cf866ae4266aa2212b9d6";
const UNIT_KEY = "weather-unit";
const HISTORY_KEY = "weather-history";

let currentUnit = localStorage.getItem(UNIT_KEY) || "C";
let searchHistory = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");

function saveHistory(city) {
  if (!city) return;
  searchHistory = [city, ...searchHistory.filter(c => c !== city)].slice(0, 5);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(searchHistory));
}

function setUnit(unit) {
  currentUnit = unit;
  localStorage.setItem(UNIT_KEY, unit);
  document.querySelectorAll('.temp-unit').forEach(el => el.textContent = `°${unit}`);
}

function convertTemp(temp, toUnit) {
  return toUnit === "F" ? Math.round(temp * 9/5 + 32) : Math.round((temp - 32) * 5/9);
}

function renderApp() {
  document.querySelector(".weather-form")?.replaceWith(document.createElement("section"));
  const main = document.querySelector("main");
  const formSection = document.createElement("section");
  formSection.className = "weather-form";
  formSection.innerHTML = SearchBar({ history: searchHistory });
  main.prepend(formSection);

  // Insert search history dropdown
  const input = formSection.querySelector("#location-input");
  const dropdown = formSection.querySelector("#search-history-dropdown");
  dropdown.innerHTML = SearchHistoryDropdown({ history: searchHistory });
  dropdown.style.display = "none";
  formSection.style.position = "relative";

  input.addEventListener("focus", () => {
    if (searchHistory.length) {
      dropdown.innerHTML = SearchHistoryDropdown({ history: searchHistory });
      dropdown.style.display = "block";
    }
  });
  input.addEventListener("blur", () => {
    setTimeout(() => { dropdown.style.display = "none"; }, 150);
  });
  dropdown.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("search-history-item")) {
      input.value = e.target.dataset.city;
      dropdown.style.display = "none";
      input.form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
    }
  });

  // Unit switcher
  let unitSwitcher = document.getElementById("unit-switcher");
  if (!unitSwitcher) {
    unitSwitcher = document.createElement("div");
    unitSwitcher.innerHTML = UnitSwitcher({ unit: currentUnit });
    unitSwitcher = unitSwitcher.firstElementChild;
    main.insertBefore(unitSwitcher, main.children[1]);
  } else {
    unitSwitcher.outerHTML = UnitSwitcher({ unit: currentUnit });
    unitSwitcher = document.getElementById("unit-switcher");
  }
  unitSwitcher.onclick = () => {
    currentUnit = currentUnit === "C" ? "F" : "C";
    setUnit(currentUnit);
    renderApp();
    if (window._lastWeather) displayWeather(window._lastWeather.rawData, window._lastWeather.forecastData);
  };

  // Theme toggler (dark mode)
  let themeSwitcher = document.getElementById("theme-switcher");
  const isDark = document.body.classList.contains("dark");
  if (!themeSwitcher) {
    themeSwitcher = document.createElement("div");
    themeSwitcher.innerHTML = ThemeToggle({ isDark });
    themeSwitcher = themeSwitcher.firstElementChild;
    main.insertBefore(themeSwitcher, main.children[2]);
  } else {
    themeSwitcher.outerHTML = ThemeToggle({ isDark });
    themeSwitcher = document.getElementById("theme-switcher");
  }
  themeSwitcher.onclick = () => {
    document.body.classList.toggle("dark");
    renderApp();
  };
}

function displayWeather(rawData, forecastData) {
  const processed = processWeatherData(rawData);
  const forecastList = processForecastData(forecastData);
  const hourlyList = processHourlyData(forecastData);
  // Convert temps if needed
  if (currentUnit === "F") {
    processed.temp = Math.round(processed.temp * 9/5 + 32);
    forecastList.forEach(f => f.temp = Math.round(f.temp * 9/5 + 32));
    hourlyList.forEach(h => h.temp = Math.round(h.temp * 9/5 + 32));
  }
  // Weather-based theme
  const weatherType = (rawData.weather[0].main || "").toLowerCase();
  document.body.classList.remove("sunny", "rainy", "night");
  if (weatherType.includes("rain")) document.body.classList.add("rainy");
  else if (weatherType.includes("clear")) document.body.classList.add("sunny");
  else if (rawData.dt && (new Date(rawData.dt * 1000).getHours() < 6 || new Date(rawData.dt * 1000).getHours() > 18)) document.body.classList.add("night");
  // Render
  document.getElementById("weather-output").innerHTML = WeatherCard({
    city: processed.city,
    temp: processed.temp,
    description: processed.description,
    humidity: rawData.main.humidity,
    wind: rawData.wind.speed,
    icon: processed.icon,
    unit: currentUnit
  });
  document.getElementById("forecast-output").innerHTML = ForecastList({ forecasts: forecastList, unit: currentUnit });
  document.getElementById("hourly-output").innerHTML = HourlyList({ hourly: hourlyList, unit: currentUnit });
  window._lastWeather = { rawData, forecastData };
}

document.addEventListener("DOMContentLoaded", () => {
  renderApp();
  const main = document.querySelector("main");
  const form = document.getElementById("location-form");
  const input = document.getElementById("location-input");
  const output = document.getElementById("weather-output");
  const forecastOutput = document.getElementById("forecast-output");
  const hourlyOutput = document.getElementById("hourly-output");
  const loading = document.getElementById("loading");
  const geolocationBtn = document.getElementById("get-location-btn");

  geolocationBtn.addEventListener("click", async () => {
    loading.style.display = "block";
    try {
      const { rawData, processed } = await getWeatherByGeolocation(API_KEY);
      const forecastData = await getForecastData(processed.city, API_KEY);
      saveHistory(processed.city);
      displayWeather(rawData, forecastData);
    } catch (err) {
      output.innerHTML = `<p>Error: ${err.message}</p>`;
    } finally {
      loading.style.display = "none";
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const location = input.value.trim();
    if (!location) return;
    loading.style.display = "block";
    output.innerHTML = "";
    forecastOutput.innerHTML = "";
    hourlyOutput.innerHTML = "";
    try {
      const rawData = await getWeatherData(location, API_KEY);
      const forecastData = await getForecastData(location, API_KEY);
      saveHistory(location);
      displayWeather(rawData, forecastData);
    } catch (err) {
      output.innerHTML = `<p>Error: Could not retrieve weather data.</p>`;
      console.error(err);
    } finally {
      loading.style.display = "none";
    }
  });
});
