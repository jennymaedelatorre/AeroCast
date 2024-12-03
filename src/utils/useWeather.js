import axios from 'axios';

const apiKey = '54b6c73039702d61cc9c0e499bbe8cfc';

// Function to fetch air quality data
async function fetchAirQuality(lat, lon) {
  const airQualityUrl = 'https://api.openweathermap.org/data/2.5/air_pollution';
  try {
    const response = await axios.get(`${airQualityUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}`);
    const airQualityData = response.data.list[0]; // Typically, the air quality data is inside the 'list' array
    return airQualityData;
  } catch (error) {
    console.error('Error fetching air quality data:', error);
    throw error;
  }
}

// Function to fetch weather data
async function fetchWeather(city) {
  const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
  try {
    const response = await axios.get(`${baseUrl}?q=${city}&appid=${apiKey}&units=metric`);
    const { main, weather, wind, visibility, clouds, sys, coord } = response.data;
    const weatherCondition = weather[0].main.toLowerCase();

    // Format sunrise and sunset times
    const sunriseTime = sys.sunrise ? new Date(sys.sunrise * 1000) : null; 
    const sunsetTime = sys.sunset ? new Date(sys.sunset * 1000) : null;   
    const sunriseFormatted = sunriseTime ? formatTime(sunriseTime) : null; 
    const sunsetFormatted = sunsetTime ? formatTime(sunsetTime) : null;   

    // Fetch air quality based on latitude and longitude
    const airQuality = await fetchAirQuality(coord.lat, coord.lon);

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
      airQuality: airQuality.main.aqi, // Air quality index (AQI)
      pm25: airQuality.components.pm2_5, // PM2.5 levels
    };
  } catch (error) {
    console.error(`Error fetching weather data for ${city}:`, error);
    throw error;
  }
}

// Fetch the forecast (unchanged)
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

// Helper functions (unchanged)
function formatTime(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12; 
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
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
  // Normalize the condition to lowercase for consistency
  const normalizedCondition = condition.toLowerCase();

  // Mapping of weather conditions to their corresponding icons
  const iconMapping = {
    sunny: "/imgs/sun.png", 
    clear: "/imgs/sun.png",  
    clouds: "/imgs/overcast-cloud.png",  
    partlycloudy: "/imgs/overcast-cloud.png",  
    cloud: "/imgs/overcast-cloud.png", 
    rain: "/imgs/rainy-cloud.png",  
    drizzle: "/imgs/rain.png",  
    thunderstorms: "/imgs/storm.png", 
    snow: "/imgs/snow.png",  
    mist: "/imgs/mist.png", 
  };

  // Check for all possible weather conditions and return the appropriate icon
  if (normalizedCondition.includes("clear") || normalizedCondition.includes("sunny")) {
    return iconMapping["sunny"];  
  } else if (normalizedCondition.includes("cloud") || normalizedCondition.includes("partly cloudy")) {
    return iconMapping["clouds"]; 
  } else if (normalizedCondition.includes("rain") || normalizedCondition.includes("drizzle")) {
    return iconMapping["rain"];  
  } else if (normalizedCondition.includes("storm") || normalizedCondition.includes("thunder")) {
    return iconMapping["thunderstorms"];
  } else if (normalizedCondition.includes("snow")) {
    return iconMapping["snow"];  
  } else if (normalizedCondition.includes("mist")) {
    return iconMapping["mist"];  
  } else {
    return "/imgs/default.png";  // Default icon if no match is found
  }
}


function getPrecipitation(weatherData) {
  if (weatherData.rain && weatherData.rain["1h"]) {
    return weatherData.rain["1h"]; // Precipitation in the last hour
  }
  return 0;
}

export { fetchWeather, fetchForecast };
