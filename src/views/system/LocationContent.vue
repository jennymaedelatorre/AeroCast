<template>
  <v-container fluid class="text-white mb-16" style="margin-top: -20px;">
    <v-row>
      <v-col cols="12" lg="8">
        <v-text-field label="Search for Cities" filled dense rounded solo flat background-color="grey lighten-3"
          append-inner-icon="mdi-magnify" @click:append="onSearchClick"></v-text-field>

        <!-- City Card for Butuan City -->
        <v-card class="city-card text-white" :style="{
          ...activeCardStyle('Butuan City'),
          height: '250px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '30px',
          border: selectedCity === 'Butuan City' ? '2px solid white' : 'none'
        }">
          <v-col class="weather-icon text-left ms-5 d-flex" style="display: flex; align-items: center;">
            <img :src="cityWeather['Butuan City'].icon" alt="Weather" width="120" />
            <h2 class="ms-3">Butuan City</h2>
          </v-col>

          <v-col class="text-right" style="margin-right: 30px;">
            <h2 class="temperature mb-3" style="font-size: 50px;">
              {{ cityWeather['Butuan City'].temperature }}°C
            </h2>
            <v-btn color="primary" rounded @click="onSeeMoreClick('Butuan City')" class="see-more">
              <h4 style="font-size: 11px;">Set default</h4>
            </v-btn>
          </v-col>
        </v-card>


        <!-- City Card for Baguio City -->
        <v-card class="city-card text-white mt-5" :style="{
          ...activeCardStyle('Baguio City'),
          height: '250px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '30px',
          border: selectedCity === 'Baguio City' ? '2px solid white' : 'none'
        }">
          <v-col class="weather-icon text-left ms-5 d-flex" style="display: flex; align-items: center;">
            <img :src="cityWeather['Baguio City'].icon" alt="Weather" width="120" />
            <h2 class="ms-3">Baguio City</h2>
          </v-col>

          <v-col class="text-right" style="margin-right: 30px;">
            <h2 class="temperature mb-3" style="font-size: 50px;">
              {{ cityWeather['Baguio City'].temperature }}°C
            </h2>
            <v-btn color="primary" rounded @click="onSeeMoreClick('Baguio City')" class="see-more">
              <h4 style="font-size: 11px;">Set default</h4>
            </v-btn>
          </v-col>
        </v-card>

        <!-- City Card for Manila -->
        <v-card class="city-card text-white mt-5" :style="{
          ...activeCardStyle('Manila'),
          height: '250px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '30px',
          border: selectedCity === 'Manila' ? '2px solid white' : 'none'
        }">
          <v-col class="weather-icon text-left ms-5 d-flex" style="display: flex; align-items: center;">
            <img :src="cityWeather['Manila'].icon" alt="Weather" width="120" />
            <h2 class="ms-3">Manila</h2>
          </v-col>

          <v-col class="text-right" style="margin-right: 30px;">
            <h2 class="temperature mb-3" style="font-size: 50px;">
              {{ cityWeather['Manila'].temperature }}°C
            </h2>
            <v-btn color="primary" rounded @click="onSeeMoreClick('Manila')" class="see-more">
              <h4 style="font-size: 11px;">Set default</h4>
            </v-btn>
          </v-col>
        </v-card>


        <!-- City Card for Cebu City -->
        <v-card class="city-card text-white mt-5" :style="{
          ...activeCardStyle('Cebu City'),
          height: '250px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '30px',
          border: selectedCity === 'Cebu City' ? '2px solid white' : 'none'
        }">
          <v-col class="weather-icon text-left ms-5 d-flex" style="display: flex; align-items: center;">
            <img :src="cityWeather['Cebu City'].icon" alt="Weather" width="120" />
            <h2 class="ms-3">Cebu City</h2>
          </v-col>

          <v-col class="text-right" style="margin-right: 30px;">
            <h2 class="temperature mb-3" style="font-size: 50px;">
              {{ cityWeather['Cebu City'].temperature }}°C
            </h2>
            <v-btn color="primary" rounded @click="onSeeMoreClick('Cebu City')" class="see-more">
              <h4 style="font-size: 11px;">Set default</h4>
            </v-btn>
          </v-col>
        </v-card>


        <!-- City Card for Cagayan De Oro City -->
        <v-card class="city-card text-white mt-5" :style="{
          ...activeCardStyle('Cagayan De Oro City'),
          height: '250px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '30px',
          border: selectedCity === 'Cagayan De Oro City' ? '2px solid white' : 'none'
        }">
          <v-col class="weather-icon text-left ms-5 d-flex" style="display: flex; align-items: center;">
            <img :src="cityWeather['Cagayan De Oro City'].icon" alt="Weather" width="120" />
            <h2 class="ms-3">Cagayan De Oro City</h2>
          </v-col>

          <v-col class="text-right" style="margin-right: 30px;">
            <h2 class="temperature mb-3" style="font-size: 50px;">
              {{ cityWeather['Cagayan De Oro City'].temperature }}°C
            </h2>
            <v-btn color="primary" rounded @click="onSeeMoreClick('Cagayan De Oro City')" class="see-more">
              <h4 style="font-size: 11px;">Set default</h4>
            </v-btn>
          </v-col>
        </v-card>
      </v-col>

      <v-col cols="12" lg="4">
        <v-card class="weather mx-auto mt-4" elevation="0" style="border: none;" v-if="selectedCity">
          <v-card-item :title="selectedCity">
            <template v-slot:subtitle>
              <span style="font-size: 13.5px;">
                {{ cityWeather[selectedCity].description }}
              </span>
            </template>
          </v-card-item>

          <v-card-text class="mb-5">
            <v-row align="center" no-gutters>
              <v-col class="text-h2" cols="6" style="font-weight: bolder;">
                {{ cityWeather[selectedCity].temperature }}&deg;C
              </v-col>
              <v-col class="weather-icon text-right" cols="6">
                <img :src="cityWeather[selectedCity].icon" alt="Weather" width="150" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Today's Forecast Card -->
        <v-card class="forecast mx-auto mt-4 text-white" elevation="0" v-if="selectedCity">
          <v-card-title style="font-size: 16px; margin: 10px 0 5px 30px; color: gray;">
            Today's Hourly Forecast
          </v-card-title>

          <v-card-text>
            <div class="overflow-x-hidden">
              <div class="d-flex overflow-x-auto hide-scrollbar">
                <v-col v-for="(time, index) in hourlyForecast" :key="time.hour" cols="auto">
                  <div class="d-flex align-center">
                    <div class="forecast-item text-center">
                      <div style="color: gray;">{{ time.hour }}</div>
                      <img :src="time.image" alt="Weather" width="50" />
                      <div style="font-size: 18px; font-weight: bolder;">{{ time.temperature }}&deg;C</div>
                    </div>
                    <div v-if="index < hourlyForecast.length - 1" class="divider"></div>
                  </div>
                </v-col>
              </div>
            </div>
          </v-card-text>
        </v-card>

        <!-- 3-Day Weather Forecast -->
        <v-card class="forecast-card text-white" elevation="0"
          style="background-color: #2a2e3b; padding: 20px; margin-top: 20px;" v-if="selectedCity">
          <v-card-title
            style="font-size: 16px; text-align: center; margin-bottom: 20px; margin-top: 10px; color: gray;">
            <v-icon left class="mr-2">mdi-calendar</v-icon>
            3-Day Weather Forecast
          </v-card-title>
          <v-card-text>
            <v-list-item-group>
              <v-list-item v-for="(day, index) in threeDayForecast" :key="index">
                <v-list-item-content>
                  <v-list-item-title>
                    <div class="d-flex justify-space-between align-center">
                      <span style="color: gray">{{ day.date }}</span>
                      <img :src="day.icon" alt="Weather Icon" style="width: 40px; height: 40px; margin-right: 8px;" />
                      <span class="ml" style="font-size: 20px;"><strong>{{ day.temperature }}°C</strong></span>
                    </div>
                  </v-list-item-title>
                  <v-list-item-subtitle style="color: lightgray;">
                    {{ day.description }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-divider v-if="index < threeDayForecast.length - 1" style="margin: 20px 0;"></v-divider>
              </v-list-item>
            </v-list-item-group>
          </v-card-text>
        </v-card>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedCity: null, // Initially no city selected
      cityWeather: {
        'Butuan City': { temperature: null, condition: '', icon: '', description: '' },
        'Baguio City': { temperature: null, condition: '', icon: '', description: '' },
        'Manila': { temperature: null, condition: '', icon: '', description: '' },
        'Cebu City': { temperature: null, condition: '', icon: '', description: '' },
        'Cagayan De Oro City': { temperature: null, condition: '', icon: '', description: '' },
      },
      hourlyForecast: [],
      threeDayForecast: [],
      apiKey: '54b6c73039702d61cc9c0e499bbe8cfc', // API Key
    };
  },

  methods: {
    async fetchWeather(city) {
      const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

      try {
        const response = await axios.get(`${baseUrl}?q=${city}&appid=${this.apiKey}&units=metric`);

        console.log("Weather condition for " + city + ":", response.data.weather[0].main);
        

        // Extract data from API response
        const { main, weather, sys, dt } = response.data;

        const currentTime = dt; // Current time (UNIX timestamp)
        const sunrise = sys.sunrise; // Sunrise time (UNIX timestamp)
        const sunset = sys.sunset; // Sunset time (UNIX timestamp)

        // Determine if it's currently night
        const isNight = currentTime < sunrise || currentTime > sunset;

        // Update the weather data for the specific city
        const weatherCondition = weather[0].main.toLowerCase();
        this.cityWeather[city] = {
          temperature: Math.round(main.temp), // Round to nearest integer
          condition: weather[0].description,
          description: this.getWeatherDescription(weatherCondition),
          icon: this.getCustomWeatherIcon(weatherCondition, isNight), // Pass isNight flag to determine icon
        };

        if (!this.selectedCity) {
          // Set default selected city if none is set
          this.selectedCity = city;
        }
      } catch (error) {
        console.error(`Error fetching weather data for ${city}:`, error);
      }
    },

    async fetchForecast(city) {
      const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';

      try {
        const response = await axios.get(`${forecastUrl}?q=${city}&appid=${this.apiKey}&units=metric`);

        // Process hourly forecast (next 24 hours, each 3-hour interval)
        this.hourlyForecast = response.data.list.slice(0, 24).map((hour) => {
          const weatherCondition = hour.weather[0].main.toLowerCase();

          // Check if it's night for the forecasted hour
          const isNight = hour.dt < response.data.city.sunrise || hour.dt > response.data.city.sunset;

          return {
            hour: new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            temperature: Math.round(hour.main.temp), // No decimals
            image: this.getCustomWeatherIcon(weatherCondition, isNight), // Use isNight flag
            description: hour.weather[0].description,
            detailedDescription: this.getWeatherDescription(hour.weather[0].main),  // Add detailed description
          };
        });

        // Process 3-day forecast (pick one forecast per day)
        this.threeDayForecast = response.data.list.filter((entry, index) => index % 8 === 0).slice(0, 3).map((entry) => {
          const weatherCondition = entry.weather[0].main.toLowerCase();

          // Check if it's night for the forecasted day
          const isNight = entry.dt < response.data.city.sunrise || entry.dt > response.data.city.sunset;

          return {
            date: new Date(entry.dt * 1000).toLocaleDateString(),
            temperature: Math.round(entry.main.temp), // No decimals
            description: entry.weather[0].description,
            icon: this.getCustomWeatherIcon(weatherCondition, isNight),
          };
        });
      } catch (error) {
        console.error(`Failed to fetch forecast for ${city}:`, error);
      }
    },

    onSeeMoreClick(city) {
      this.selectedCity = city; // Update selected city
      this.fetchWeather(city); // Fetch weather data for the selected city
      this.fetchForecast(city); // Fetch forecast data for the selected city
    },

    getWeatherDescription(condition) {
      // Map weather conditions to descriptive phrases
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

      console.log("Condition passed to description mapping:", condition); 

      return descriptionMapping[condition] || "Weather condition is unclear";
    },

    getCustomWeatherIcon(condition, isNight) {
      // Map your custom images to weather conditions
      const iconMapping = {
        day: {
          clear: "/imgs/sun.png", // Clear sky (day)
          clouds: "/imgs/cloudy.png", // Cloudy (day)
          rain: "/imgs/rainy.png", // Rainy (day)
          drizzle: "/imgs/rainy.png", // Drizzle (day)
          thunderstorm: "/imgs/storm.png", // Thunderstorms (day)
          snow: "/imgs/snow.png", // Snow (day)
          mist: "/imgs/mist.png", // Mist or Fog (day)
        },
        night: {
          clear: "/imgs/clear-night.png", // Clear sky (night)
          clouds: "/imgs/cloudy-night.png", // Cloudy (night)
          rain: "/imgs/rainy-night.png", // Rainy (night)
          drizzle: "/imgs/rainy-night.png", // Drizzle (night)
          thunderstorm: "/imgs/stormy-night.png", // Thunderstorms (night)
          snow: "/imgs/night-snow.png", // Snow (night)
          mist: "/imgs/night-mist.png", // Mist or Fog (night)
        },
      };

      // Return the appropriate custom image based on time of day
      return (isNight ? iconMapping.night[condition] : iconMapping.day[condition]) || "/imgs/default.png";
    },

    activeCardStyle(city) {
      return {
        backgroundColor: this.selectedCity === city ? 'transparent' : '#2a2e3b', // Transparent for selected, dark gray for unselected
      };
    }
  },

  mounted() {
    // Fetch weather data and forecasts for all cities initially
    Object.keys(this.cityWeather).forEach((city) => {
      this.fetchWeather(city); // Fetch weather for each city
      this.fetchForecast(city); // Fetch forecast for each city
    });
  }
};
</script>


<style scoped>
.weather {
  background-color: transparent;
  color: white;
}

.weather-icon {
  justify-content: center;
  margin-top: -70px;
}

.forecast,
.weather-conditions,
.forecast-card {
  margin-top: 20px;
  background-color: #2a2e3b;
  border-radius: 20px;
}

.forecast-item {
  text-align: center;
  padding: 10px;
}

.overflow-x-hidden {
  overflow-x: hidden;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.divider {
  width: 1px;
  background-color: #4c4949;
  margin: 0 10px;
  height: 80px;
}

.temperature-value {
  margin-left: 40px;
}

@media (max-width: 600px) {
  .city-card {
    height: 150px !important;
    padding: 10px;
  }

  .weather-icon {
    padding-top: 50px;
  }

  .weather-icon img {
    width: 80px !important;
  }

  .city-card h2 {
    font-size: 20px !important;
  }

  .see-more h4 {
    font-size: 9px !important;
  }

  .forecast img {
    width: 40px !important;
  }

  .forecast-card {
    padding: 10px !important;
  }

  .forecast-card span {
    font-size: 14px !important;
  }
}
</style>
