

const API_KEY = '408b38cd136cf866ae4266aa2212b9d6';


export async function getWeatherData(location) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
}

export function processWeatherData(data) {
  return {
    city: data.name,
    temp: data.main.temp,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
  };
}
