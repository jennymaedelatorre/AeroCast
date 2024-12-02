import axios from 'axios';

const apiKey = '54b6c73039702d61cc9c0e499bbe8cfc';

async function fetchWeather(city) {
  const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
  try {
    const response = await axios.get(`${baseUrl}?q=${city}&appid=${apiKey}&units=metric`);
    const { main, weather, wind, visibility, clouds, sys } = response.data;
    const weatherCondition = weather[0].main.toLowerCase();

     // Format sunrise and sunset times
     const sunriseTime = sys.sunrise ? new Date(sys.sunrise * 1000) : null; 
     const sunsetTime = sys.sunset ? new Date(sys.sunset * 1000) : null;   
 
     const sunriseFormatted = sunriseTime ? formatTime(sunriseTime) : null; 
     const sunsetFormatted = sunsetTime ? formatTime(sunsetTime) : null;   
 

    return {
      temperature: Math.round(main.temp),
      feelsLike: Math.round(main.feels_like), 
      condition: weather[0].description,
      description: getWeatherDescription(weatherCondition),
      icon: getCustomWeatherIcon(weatherCondition),
      humidity: main.humidity, 
      pressure: main.pressure, 
      windSpeed: wind.speed, 
      visibility: visibility / 1000, 
      clouds: clouds.all, 
      precipitation: getPrecipitation(response.data),
      sunset: sunsetFormatted,  
      sunrise: sunriseFormatted, 
    };
  } catch (error) {
    console.error(`Error fetching weather data for ${city}:`, error);
    throw error;
  }
}


function formatTime(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12; 
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

async function fetchForecast(city) {
  const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
  try {
    const response = await axios.get(`${forecastUrl}?q=${city}&appid=${apiKey}&units=metric`);

   
    const hourlyForecast = response.data.list.slice(0, 24).map((hour) => {
      const weatherCondition = hour.weather[0].main.toLowerCase();
      return {
        hour: new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        temperature: Math.round(hour.main.temp),
        image: getCustomWeatherIcon(weatherCondition),
        description: hour.weather[0].description,
      };
    });

    // 3-day forecast
    const threeDayForecast = response.data.list.filter((entry, index) => index % 8 === 0).slice(0, 3).map((entry) => {
      const weatherCondition = entry.weather[0].main.toLowerCase();
      return {
        date: new Date(entry.dt * 1000).toLocaleDateString(),
        temperature: Math.round(entry.main.temp),
        description: entry.weather[0].description,
        icon: getCustomWeatherIcon(weatherCondition),
      };
    });

    //five days weather forecast
    const fiveDayForecast = response.data.list.filter((entry, index) => index % 8 === 0).slice(0, 5).map((entry) => {
      const weatherCondition = entry.weather[0].main.toLowerCase();
      return {
        date: new Date(entry.dt * 1000).toLocaleDateString(),
        temperature: Math.round(entry.main.temp),
        description: entry.weather[0].description,
        icon: getCustomWeatherIcon(weatherCondition),
      };
    });

    return { hourlyForecast, threeDayForecast, fiveDayForecast };
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

function getCustomWeatherIcon(condition) {
  const iconMapping = {
    clear: "/imgs/sun.png",
    clouds: "/imgs/cloudy.png",
    rain: "/imgs/rain.png",
    drizzle: "/imgs/rain.png",
    thunderstorm: "/imgs/storm.png",
    snow: "/imgs/snow.png",
    mist: "/imgs/mist.png",
  };

  return iconMapping[condition] || "/imgs/default.png";
}

// function to get precipitation (in mm)
function getPrecipitation(weatherData) {
  if (weatherData.rain && weatherData.rain["1h"]) {
    return weatherData.rain["1h"]; // Precipitation in the last hour
  }
  return 0;
}

// Format the sunset time
function formatSunset(timestamp) {
  const sunsetDate = new Date(timestamp * 1000); 
  const hours = sunsetDate.getHours().toString().padStart(2, '0');
  const minutes = sunsetDate.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`; 
}

export { fetchWeather, fetchForecast };
