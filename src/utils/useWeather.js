import axios from 'axios';

const apiKey = '54b6c73039702d61cc9c0e499bbe8cfc';

async function fetchWeather(city) {
  const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
  try {
    const response = await axios.get(`${baseUrl}?q=${city}&appid=${apiKey}&units=metric`);
    const { main, weather } = response.data;
    const weatherCondition = weather[0].main.toLowerCase();
    return {
      temperature: Math.round(main.temp),
      condition: weather[0].description,
      description: getWeatherDescription(weatherCondition),
      icon: getCustomWeatherIcon(weatherCondition),
    };
  } catch (error) {
    console.error(`Error fetching weather data for ${city}:`, error);
    throw error;
  }
}

async function fetchForecast(city) {
  const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
  try {
    const response = await axios.get(`${forecastUrl}?q=${city}&appid=${apiKey}&units=metric`);
    const currentTime = new Date().getTime() / 1000; // Current timestamp in seconds
    const sunrise = response.data.city.sunrise;
    const sunset = response.data.city.sunset;

    const hourlyForecast = response.data.list.slice(0, 24).map((hour) => {
      const weatherCondition = hour.weather[0].main.toLowerCase();
      const isNight = hour.dt < sunrise || hour.dt > sunset; // Determine if it is day or night

      return {
        hour: new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        temperature: Math.round(hour.main.temp),
        image: getCustomWeatherIcon(weatherCondition, isNight),
        description: hour.weather[0].description,
      };
    });

    const threeDayForecast = response.data.list.filter((entry, index) => index % 8 === 0).slice(0, 3).map((entry) => {
      const weatherCondition = entry.weather[0].main.toLowerCase();
      return {
        date: new Date(entry.dt * 1000).toLocaleDateString(),
        temperature: Math.round(entry.main.temp),
        description: entry.weather[0].description,
        icon: getCustomWeatherIcon(weatherCondition),
      };
    });

    return { hourlyForecast, threeDayForecast };
  } catch (error) {
    console.error(`Failed to fetch forecast for ${city}:`, error);
    throw error;
  }
}

function getWeatherDescription(condition) {
  const descriptionMapping = {
    clear: "A beautiful clear sky",
    clouds: "Partly cloudy with some cloud cover",
    rain: "Light rain expected, carry an umbrella",
    drizzle: "Light drizzle, you may want an umbrella",
    thunderstorm: "Thunderstorms, stay safe!",
    snow: "Snowy weather, perfect for winter activities",
    mist: "Mist or fog, low visibility",
    haze: "Hazy weather, be careful on the roads",
    smoke: "Smoky conditions, avoid outdoor activities",
    dust: "Dusty, air quality may be poor",
    fog: "Foggy weather, drive with caution",
    sand: "Sandstorm, stay indoors if possible",
    ash: "Volcanic ash, stay indoors and protect your lungs",
    squall: "Strong gusts of wind, take care",
    tornado: "Tornado warning, take shelter immediately",
  };
  return descriptionMapping[condition] || "Weather condition is unclear";
}

function getCustomWeatherIcon(condition, isNight = false) {
  const iconMapping = {
    clear: isNight ? "/imgs/moon.png" : "/imgs/sun.png",
    clouds: "/imgs/cloudy.png",
    rain: "/imgs/rain.png",
    drizzle: "/imgs/rain.png",
    thunderstorm: "/imgs/storm.png",
    snow: "/imgs/snow.png",
    mist: "/imgs/mist.png",
  };

  return iconMapping[condition] || "/imgs/default.png";
}

export { fetchWeather, fetchForecast };
