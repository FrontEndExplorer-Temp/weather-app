import "./style.css";
import { getWeatherData, getForecastData } from "./weather";
import { processWeatherData, processForecastData, processHourlyData } from "./forecast";
import { renderCurrentWeather, renderForecastCards, renderHourlyCards } from "./dom";
import { getWeatherByGeolocation } from "./geolocation";

const API_KEY = "408b38cd136cf866ae4266aa2212b9d6";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("location-form");
  const input = document.getElementById("location-input");
  const output = document.getElementById("weather-output");
  const forecastOutput = document.getElementById("forecast-output");
  const hourlyOutput = document.getElementById("hourly-output");
  const loading = document.getElementById("loading");
  const geolocationBtn = document.getElementById("get-location-btn");

  geolocationBtn.addEventListener("click", async () => {
    try {
      const { rawData, processed } = await getWeatherByGeolocation(API_KEY);
      output.innerHTML = renderCurrentWeather(processed, rawData);
    } catch (err) {
      output.innerHTML = `<p>Error: ${err.message}</p>`;
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

      const processed = processWeatherData(rawData);
      const forecastList = processForecastData(forecastData);
      const hourlyList = processHourlyData(forecastData);

      output.innerHTML = renderCurrentWeather(processed, rawData);
      forecastOutput.innerHTML = renderForecastCards(forecastList);
      hourlyOutput.innerHTML = renderHourlyCards(hourlyList);
    } catch (err) {
      output.innerHTML = `<p>Error: Could not retrieve weather data.</p>`;
      console.error(err);
    } finally {
      loading.style.display = "none";
    }
  });
});
