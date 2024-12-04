<template>
  <v-container fluid class="text-white mb-16" style="margin-top: -20px;">
    <v-row>
      <!-- Left Section: Search and City Cards -->
      <v-col cols="12" lg="8">
        <!-- Search Bar -->
        <v-text-field 
          label="Search for Cities"
          filled dense rounded solo flat
          background-color="grey lighten-3"
          append-inner-icon="mdi-magnify"
          @click:append="onSearchClick"
        ></v-text-field>

        <!-- Add City Menu -->
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn color="primary" class="add-city mb-5" v-bind="props">
              Add City
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index" :value="index">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- City Cards (Dynamic Generation) -->
        <v-card
          v-for="(city, index) in items"
          :key="index"
          class="city-card text-white mt-5"
          :style="{
            ...activeCardStyle(city.title),
            height: '250px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '30px',
            border: selectedCity === city.title ? '2px solid white' : 'none'
          }"
        >
          <!-- City Weather Icon and Title -->
          <v-col class="weather-icon text-left ms-5 d-flex" style="display: flex; align-items: center;">
            <img :src="cityWeather[city.title]?.icon || 'default-icon.png'" alt="Weather" width="120" />
            <h2 class="ms-3">{{ city.title }}</h2>
          </v-col>

          <!-- Temperature and Actions -->
          <v-col class="text-right" style="margin-right: 30px;">
            <h2 class="temperature mb-3" style="font-size: 50px;">
              {{ cityWeather[city.title]?.temperature || 'loading...' }}°C
            </h2>
            <v-btn color="primary" rounded @click="onSeeMoreClick(city.title)" class="see-more">
              <h4 style="font-size: 11px;">Set default</h4>
            </v-btn>
            <v-btn color="red" rounded @click="onDeleteCity(city.title)" class="delete-city" style="margin-left: 10px;">
              <h4 style="font-size: 10px;">Delete</h4>
            </v-btn>
          </v-col>
        </v-card>
      </v-col>

      <!-- Right Section: Selected City Details -->
      <v-col cols="12" lg="4">
        <!-- Selected City Weather -->
        <v-card class="weather mx-auto mt-4" elevation="0" style="border: none;" v-if="selectedCity">
          <v-card-item :title="selectedCity">
            <template v-slot:subtitle>
              <span class="desc" style="font-size: 13.5px;">
                {{ cityWeather[selectedCity]?.description || 'loading...' }}
              </span>
            </template>
          </v-card-item>

          <v-card-text class="mb-5">
            <v-row align="center" no-gutters>
              <v-col class="text-h2" cols="6" style="font-weight: bolder;">
                {{ cityWeather[selectedCity]?.temperature || 'loading...' }}&deg;C
              </v-col>
              <v-col class="weather-icon text-right" cols="6">
                <img :src="cityWeather[selectedCity]?.icon || 'default.png'" alt="" width="150" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Today's Hourly Forecast -->
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
        <v-card
          class="forecast-card text-white"
          elevation="0"
          style="background-color: #2a2e3b; padding: 20px; margin-top: 20px;"
          v-if="selectedCity"
        >
          <v-card-title
            style="font-size: 16px; text-align: center; margin-bottom: 20px; margin-top: 10px; color: gray;"
          >
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
import supabase from '@/utils/supabase';
import { fetchWeather, fetchForecast } from '@/utils/useWeather';
import { useUnitsStore } from '@/stores/unit';

export default {
  data() {
    return {
      items: [], // Dynamically populated list of cities
      selectedCity: null, 
      cityWeather: {}, // Stores weather data dynamically based on fetched cities
      hourlyForecast: [],  
      threeDayForecast: [],  
      isLoading: true, // Loading state for fetching data
      error: null, // Error state
    };
  },

  async mounted() {
    this.unitsStore = useUnitsStore(); // Initialize the units store
    this.unitsStore.loadUnitsFromLocalStorage(); // Load saved units

    // Fetch cities from Supabase on mount
    await this.fetchCitiesFromSupabase();

    // Fetch weather data for each city
    this.items.forEach(city => {
      const cityName = city.title;
      this.cityWeather[cityName] = { temperature: null, condition: '', icon: '', description: '' };
      this.fetchWeather(cityName);
      this.fetchForecast(cityName);
    });

    this.isLoading = false; // Mark loading as complete
  },

  methods: {
    async fetchCitiesFromSupabase() {
      try {
        this.isLoading = true;

        // Fetch cities from the 'locations' table
        const { data: cityData, error } = await supabase
          .from('locations')
          .select('city'); // Adjust column name as per your table schema

        if (error) {
          throw new Error(`Error fetching locations: ${error.message}`);
        }

        // Populate the items array with fetched cities
        this.items = cityData.map(city => ({ title: city.city }));
      } catch (err) {
        console.error('Unexpected error while fetching cities from Supabase:', err.message);
        this.error = err.message;
      } finally {
        this.isLoading = false;
      }
    },

    async fetchWeather(city) {
      try {
        const weatherData = await fetchWeather(city);
        this.cityWeather[city] = weatherData;
        if (!this.selectedCity) {
          this.selectedCity = city; // Set the first city as the selected city
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
    },
  },
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