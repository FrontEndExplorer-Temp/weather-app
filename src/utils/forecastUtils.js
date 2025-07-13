export function processWeatherData(data) {
  return {
    city: data.name,
    temp: data.main.temp,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
  };
}

export function processForecastData(data) {
  const result = [];
  data.list.forEach((entry, index) => {
    if (index % 8 === 0 && result.length < 5) {
      const date = new Date(entry.dt * 1000);
      result.push({
        dayName: date.toLocaleDateString("en-US", { weekday: "long" }),
        temp: entry.main.temp,
        description: entry.weather[0].description,
        icon: entry.weather[0].icon,
      });
    }
  });
  return result;
}

export function processHourlyData(data) {
  return data.list.slice(0, 6).map((entry) => {
    const time = new Date(entry.dt * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return {
      time,
      temp: entry.main.temp,
      description: entry.weather[0].description,
      icon: entry.weather[0].icon,
    };
  });
} 