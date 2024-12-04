<template>
  <v-container fluid class="text-white mb-16" style="margin-top: -20px;">
    <v-row>
      <v-col cols="12" lg="8">
        <v-text-field label="Search for Cities" filled dense rounded solo flat background-color="grey lighten-3"
          append-inner-icon="mdi-magnify" @click:append="onSearchClick"></v-text-field>

        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn color="primary" class="add-city mb-5" v-bind="props">
              Add city
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index" :value="index">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

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
            <v-btn color="red" rounded @click="onDeleteCity('Butuan City')" class="delete-city"
              style="margin-left: 10px;">
              <h4 style="font-size: 10px;">Delete</h4>
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
            <v-btn color="red" rounded @click="onDeleteCity('Baguio City')" class="delete-city"
              style="margin-left: 10px;">
              <h4 style="font-size: 10px;">Delete</h4>
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
            <v-btn color="red" rounded @click="onDeleteCity('Manila')" class="delete-city" style="margin-left: 10px;">
              <h4 style="font-size: 10px;">Delete</h4>
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
            <v-btn color="red" rounded @click="onDeleteCity('Cebu City')" class="delete-city"
              style="margin-left: 10px;">
              <h4 style="font-size: 10px;">Delete</h4>
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
            <v-btn color="red" rounded @click="onDeleteCity('Cagayan De Oro City')" class="delete-city"
              style="margin-left: 10px;">
              <h4 style="font-size: 10px;">Delete</h4>
            </v-btn>
          </v-col>
        </v-card>
      </v-col>

      <v-col cols="12" lg="4">
        <v-card class="weather mx-auto mt-4" elevation="0" style="border: none;" v-if="selectedCity">
          <v-card-item :title="selectedCity">
            <template v-slot:subtitle>
              <span class="desc"style="font-size: 13.5px;">
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
import { fetchWeather, fetchForecast } from '@/utils/useWeather';
import { useUnitsStore } from '@/stores/unit';


export default {
  data() {
    return {
      items: [
        { title: 'Davao City' },
        { title: 'Makati' },
        { title: 'Zamboanga City' },
        { title: 'Mandaue City' },
      ],
      selectedCity: null, 
      cityWeather: {
        'Butuan City': { temperature: null, condition: '', icon: '', description: '' },
        'Baguio City': { temperature: null, condition: '', icon: '', description: '' },
        'Manila': { temperature: null, condition: '', icon: '', description: '' },
        'Cebu City': { temperature: null, condition: '', icon: '', description: '' },
        'Cagayan De Oro City': { temperature: null, condition: '', icon: '', description: '' },
      },
      hourlyForecast: [],  
      threeDayForecast: [],  
    };
  },

  mounted() {
    this.unitsStore = useUnitsStore();  // Make sure to initialize it
  this.unitsStore.loadUnitsFromLocalStorage();  // Load from localStorage
    Object.keys(this.cityWeather).forEach((city) => {
      this.fetchWeather(city);
      this.fetchForecast(city);
    });
  },

  methods: {
    async fetchWeather(city) {
      try {
        const weatherData = await fetchWeather(city);
        this.cityWeather[city] = weatherData;
        if (!this.selectedCity) {
          this.selectedCity = city;
        }
      } catch (error) {
        console.error(`Error fetching weather for ${city}:`, error);
      }
    },

    async fetchForecast(city) {
      try {
        const { hourlyForecast, threeDayForecast } = await fetchForecast(city);
        this.hourlyForecast = hourlyForecast;
        this.threeDayForecast = threeDayForecast;
      } catch (error) {
        console.error(`Error fetching forecast for ${city}:`, error);
      }
    },

    onSeeMoreClick(city) {
      this.selectedCity = city;
      this.fetchWeather(city);
      this.fetchForecast(city);
    },

    activeCardStyle(city) {
      return {
        backgroundColor: this.selectedCity === city ? 'transparent' : '#2a2e3b', 
      };
    }
  }
};
</script>



<style scoped>
.add-city {
  padding: 10px 10%;
  border-radius: 10px;
}
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
  .add-city{
    font-size: 10px !important;
    font-weight: bold;
  }
  .desc{
    font-size: 11.5px !important;
  }
  .see-more{
    margin-bottom: 5px;
  }

  .see-more h4 {
    padding: 3px 5px;
    font-size: 8px !important;
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
