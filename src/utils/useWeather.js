import axios from 'axios';
import { useUnitsStore } from '@/stores/unit';

const apiKey = '54b6c73039702d61cc9c0e499bbe8cfc';

// Function to fe tch air quality data
async function fetchAirQuality(lat, lon) {
  const airQualityUrl = 'https://api.openweathermap.org/data/2.5/air_pollution';
  try {
    const response = await axios.get(`${airQualityUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}`);
    const airQualityData = response.data.list[0];
    return airQualityData;
  } catch (error) {
    console.error('Error fetching air quality data:', error);
    throw error;
  }
}

// Function to fetch weather data
async function fetchWeather(city) {
  const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
  const unitsStore = useUnitsStore(); // Access unit preferences

  try {
    const response = await axios.get(`${baseUrl}?q=${city}&appid=${apiKey}&units=metric`);
    const { main, weather, wind, visibility, clouds, sys, coord } = response.data;
    const weatherCondition = weather[0].main.toLowerCase();

    // Format sunrise and sunset times
    const sunriseTime = sys.sunrise ? new Date(sys.sunrise * 1000) : null;
    const sunsetTime = sys.sunset ? new Date(sys.sunset * 1000) : null;
    const sunriseFormatted = sunriseTime ? formatTime(sunriseTime) : null;
    const sunsetFormatted = sunsetTime ? formatTime(sunsetTime) : null;

    const airQuality = await fetchAirQuality(coord.lat, coord.lon);

    // Adjust units based on user preferences
    const temperature = unitsStore.tempUnit === 'C' ? main.temp : convertCelsiusToFahrenheit(main.temp);
    const feelsLike = unitsStore.tempUnit === 'C' ? main.feels_like : convertCelsiusToFahrenheit(main.feels_like);
    const windSpeed = unitsStore.windSpeedUnit === 'm/s' ? wind.speed : convertMetersPerSecondToKilometersPerHour(wind.speed);
    const pressure = unitsStore.pressureUnit === 'hPa' ? main.pressure : convertHpaToMmHg(main.pressure);

    return {
      temperature: Math.round(temperature),
      feelsLike: Math.round(feelsLike),
      condition: weather[0].description,
      description: getWeatherDescription(weatherCondition),
      icon: getCustomWeatherIcon(weatherCondition),
      humidity: main.humidity,
      pressure: Math.round(pressure),
      windSpeed: Math.round(windSpeed),
      visibility: visibility / 1000,
      clouds: clouds.all,
      precipitation: getPrecipitation(response.data),
      sunset: sunsetFormatted,
      sunrise: sunriseFormatted,
      airQuality: airQuality.main.aqi,
      pm25: airQuality.components.pm2_5,
    };
  } catch (error) {
    console.error(`Error fetching weather data for ${city}:`, error);
    throw error;
  }
}

// Fetch the forecast
async function fetchForecast(city) {
  const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
  const unitsStore = useUnitsStore(); // Access unit preferences

  try {
    const response = await axios.get(`${forecastUrl}?q=${city}&appid=${apiKey}&units=metric`);
    const hourlyForecast = response.data.list.slice(0, 24).map((hour) => {
      const weatherCondition = hour.weather[0].main.toLowerCase();
      return {
        hour: new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        temperature: Math.round(
          unitsStore.tempUnit === 'C' ? hour.main.temp : convertCelsiusToFahrenheit(hour.main.temp)
        ),
        image: getCustomWeatherIcon(weatherCondition),
        description: hour.weather[0].description,
      };
    });

    // 3-day forecast
    const threeDayForecast = response.data.list
      .filter((entry, index) => index % 8 === 0)
      .slice(0, 3)
      .map((entry) => {
        const weatherCondition = entry.weather[0].main.toLowerCase();
        return {
          date: new Date(entry.dt * 1000).toLocaleDateString(),
          temperature: Math.round(
            unitsStore.tempUnit === 'C' ? entry.main.temp : convertCelsiusToFahrenheit(entry.main.temp)
          ),
          description: entry.weather[0].description,
          icon: getCustomWeatherIcon(weatherCondition),
        };
      });

    // 5-day forecast
    const fiveDayForecast = response.data.list
      .filter((entry, index) => index % 8 === 0)
      .slice(0, 5)
      .map((entry) => {
        const weatherCondition = entry.weather[0].main.toLowerCase();
        return {
          date: new Date(entry.dt * 1000).toLocaleDateString(),
          temperature: Math.round(
            unitsStore.tempUnit === 'C' ? entry.main.temp : convertCelsiusToFahrenheit(entry.main.temp)
          ),
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
    clear: 'A beautiful clear sky',
    clouds: 'Partly cloudy with some cloud cover',
    rain: 'Light rain expected, carry an umbrella',
    drizzle: 'Light drizzle, you may want an umbrella',
    thunderstorm: 'Thunderstorms, stay safe!',
    snow: 'Snowy weather, perfect for winter activities',
    mist: 'Mist or fog, low visibility',
    haze: 'Hazy weather, be careful on the roads',
    smoke: 'Smoky conditions, avoid outdoor activities',
    dust: 'Dusty, air quality may be poor',
    fog: 'Foggy weather, drive with caution',
    sand: 'Sandstorm, stay indoors if possible',
    ash: 'Volcanic ash, stay indoors and protect your lungs',
    squall: 'Strong gusts of wind, take care',
    tornado: 'Tornado warning, take shelter immediately',
  };
  return descriptionMapping[condition] || 'Weather condition is unclear';
}

function getCustomWeatherIcon(condition) {
  const normalizedCondition = condition.toLowerCase();

  const iconMapping = {
    sunny: '/imgs/sun.png',
    clear: '/imgs/sun.png',
    clouds: '/imgs/overcast-cloud.png',
    partlycloudy: '/imgs/overcast-cloud.png',
    cloud: '/imgs/overcast-cloud.png',
    rain: '/imgs/rainy-cloud.png',
    drizzle: '/imgs/rain.png',
    thunderstorms: '/imgs/storm.png',
    snow: '/imgs/snow.png',
    mist: '/imgs/mist.png',
  };

  if (normalizedCondition.includes('clear') || normalizedCondition.includes('sunny')) {
    return iconMapping['sunny'];
  } else if (normalizedCondition.includes('cloud') || normalizedCondition.includes('partly cloudy')) {
    return iconMapping['clouds'];
  } else if (normalizedCondition.includes('rain') || normalizedCondition.includes('drizzle')) {
    return iconMapping['rain'];
  } else if (normalizedCondition.includes('storm') || normalizedCondition.includes('thunder')) {
    return iconMapping['thunderstorms'];
  } else if (normalizedCondition.includes('snow')) {
    return iconMapping['snow'];
  } else if (normalizedCondition.includes('mist')) {
    return iconMapping['mist'];
  } else {
    return '/imgs/default.png';
  }
}

function getPrecipitation(weatherData) {
  if (weatherData.rain && weatherData.rain['1h']) {
    return weatherData.rain['1h'];
  }
  return 0;
}

// Helper conversion functions
function convertCelsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function convertMetersPerSecondToKilometersPerHour(mps) {
  return mps * 3.6;
}

function convertHpaToMmHg(hPa) {
  return hPa * 0.75006156;
}

export { fetchWeather, fetchForecast };
