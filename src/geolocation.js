import { getWeatherData } from "./weather.js";
import { processWeatherData } from "./forecast.js";

export function getWeatherByGeolocation(apiKey) {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch weather by location.");
          }

          const rawData = await response.json();
          const processed = processWeatherData(rawData);
          resolve({ rawData, processed });
        } catch (err) {
          reject(err);
        }
      },
      () => {
        reject(new Error("Could not get your location."));
      }
    );
  });
}
