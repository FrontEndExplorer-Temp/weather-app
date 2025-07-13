export async function getWeatherData(location, apiKey) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch current weather data.");
  }
  return response.json();
}

export async function getForecastData(location, apiKey) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch forecast data.");
  }
  return response.json();
} 