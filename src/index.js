import "./style.css";
import { getWeatherData, processWeatherData } from "./weather";

const API_KEY = "408b38cd136cf866ae4266aa2212b9d6";

const form = document.getElementById("location-form");
const input = document.getElementById("location-input");
const output = document.getElementById("weather-output");
const loading = document.getElementById("loading");
const geolocationBtn = document.getElementById("get-location-btn");
const forecastOutput = document.getElementById("forecast-output");

async function getWeatherDataByCoords(lat, lon) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

geolocationBtn.addEventListener("click", async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const rawData = await getWeatherDataByCoords(lat, lon);
          const processed = processWeatherData(rawData);

          output.innerHTML = `
          <h2>${processed.city}</h2>
          <p>Temperature: ${processed.temp}°C</p>
          <p>Weather: ${processed.description}</p>
          <p>Humidity: ${rawData.main.humidity}%</p>
          <p>Wind Speed: ${rawData.wind.speed} m/s</p>
          <img src="http://openweathermap.org/img/wn/${processed.icon}.png" alt="${processed.description}" />
        `;
          // Do not update background anymore, as we're focusing on forecast cards
        } catch (err) {
          console.error(err);
          output.innerHTML = `<p>Error: Could not retrieve weather data for your location.</p>`;
        }
      },
      () => {
        output.innerHTML = `<p>Error: Could not get your location.</p>`;
      }
    );
  } else {
    output.innerHTML = `<p>Geolocation is not supported by your browser.</p>`;
  }
});

async function getWeatherForecast(location) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const location = input.value.trim();
  if (!location) return;

  loading.style.display = "block";
  output.innerHTML = "";
  forecastOutput.innerHTML = "";
  try {
    const rawData = await getWeatherData(location);
    const processed = processWeatherData(rawData);

    output.innerHTML = `
      <h2>${processed.city}</h2>
      <p>Temperature: ${processed.temp}°C</p>
      <p>Weather: ${processed.description}</p>
      <p>Humidity: ${rawData.main.humidity}%</p>
      <p>Wind Speed: ${rawData.wind.speed} m/s</p>
      <img src="http://openweathermap.org/img/wn/${processed.icon}.png" alt="${processed.description}" />
    `;

    const forecastData = await getWeatherForecast(location);
    forecastOutput.innerHTML = `<h3>Next 5 Days Forecast</h3>`;

    let forecastDays = [];

    forecastData.list.forEach((day, index) => {
      if (index % 8 === 0 && forecastDays.length < 7) {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

        forecastDays.push({
          dayName,
          temp: day.main.temp,
          description: day.weather[0].description,
          icon: day.weather[0].icon,
        });
      }
    });

    forecastDays.forEach((forecast) => {
      forecastOutput.innerHTML += `
        <div class="forecast-card">
          <p><strong>${forecast.dayName}</strong></p>
          <p>${forecast.temp}°C</p>
          <p>${forecast.description}</p>
          <img src="http://openweathermap.org/img/wn/${forecast.icon}.png" alt="${forecast.description}" />
        </div>
      `;
    });
  } catch (err) {
    console.error(err);
    output.innerHTML = `<p>Error: Could not retrieve weather data.</p>`;
  } finally {
    loading.style.display = "none";
  }
});
