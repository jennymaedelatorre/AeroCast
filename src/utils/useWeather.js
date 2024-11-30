import axios from 'axios';

const API_KEY = 'c2552e7a29b7eaa76f18d93a1da3c932';  
const CITY_IDS = '1726145,1717512,1701668,1717510,1728930';

export const useWeather = () => {
  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/group?id=${CITY_IDS}&appid=${API_KEY}&units=metric`
      );
      return response.data.list;  // Returns list of weather data for cities
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
    }
  };

  return { fetchWeatherData };
};