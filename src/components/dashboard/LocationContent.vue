<template>
  <v-container fluid class="text-white" style="margin-top: -20px;">
    <v-row>
      <v-col cols="12" lg="8">
        <v-text-field label="Search for Cities" filled dense rounded solo flat background-color="grey lighten-3"
          append-inner-icon="mdi-magnify" @click:append="onSearchClick"></v-text-field>

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
            <img src="/imgs/sun.png" alt="Weather" width="120" />
            <h2 class="ms-3">Butuan City</h2>
          </v-col>

          <v-col class="text-right" style="margin-right: 30px;">
            <h2 class="temperature mb-3" style="font-size: 50px;">28°C</h2>
            <v-btn color="primary" rounded @click="onSeeMoreClick('Butuan City')" class="see-more">
              <h4 style="font-size: 11px;">Set default</h4>
            </v-btn>
          </v-col>
        </v-card>

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
            <img src="/imgs/storm.png" alt="Weather" width="120" />
            <h2 class="ms-3">Baguio City</h2>
          </v-col>

          <v-col class="text-right" style="margin-right: 30px;">
            <h2 class="temperature mb-3" style="font-size: 50px;">18°C</h2>
            <v-btn color="primary" rounded @click="onSeeMoreClick('Baguio City')" class="see-more">
              <h4 style="font-size: 11px;">Set default</h4>
            </v-btn>
          </v-col>
        </v-card>

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
            <img src="/imgs/sun.png" alt="Weather" width="120" />
            <h2 class="ms-3">Manila</h2>
          </v-col>

          <v-col class="text-right" style="margin-right: 30px;">
            <h2 class="temperature mb-3" style="font-size: 50px;">32°C</h2>
            <v-btn color="primary" rounded @click="onSeeMoreClick('Manila')" class="see-more">
              <h4 style="font-size: 11px;">Set default</h4>
            </v-btn>
          </v-col>
        </v-card>

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
            <img src="/imgs/rain.png" alt="Weather" width="120" />
            <h2 class="ms-3">Cebu City</h2>
          </v-col>

          <v-col class="text-right" style="margin-right: 30px;">
            <h2 class="temperature mb-3" style="font-size: 50px;">32°C</h2>
            <v-btn color="primary" rounded @click="onSeeMoreClick('Cebu City')" class="see-more">
              <h4 style="font-size: 11px;">Set default</h4>
            </v-btn>
          </v-col>
        </v-card>

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
            <img src="/imgs/storm.png" alt="Weather" width="120" />
            <h2 class="ms-3">Cagayan De Oro City</h2>
          </v-col>

          <v-col class="text-right" style="margin-right: 30px;">
            <h2 class="temperature mb-3" style="font-size: 50px;">17°C</h2>
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
        Chance of rain {{ cityWeather[selectedCity].chanceOfRain }}%
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
  <v-card class="forecast-card text-white" elevation="0" style="background-color: #2a2e3b; padding: 20px; margin-top: 20px;" v-if="selectedCity">
    <v-card-title style="font-size: 16px; text-align: center; margin-bottom: 20px; margin-top: 10px; color: gray;">
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
export default {
  data() {
    return {
      selectedCity: 'Butuan City', 
      cityWeather: {
        'Butuan City': { temperature: 28, condition: 'Sunny', icon: '/imgs/sun.png' },
        'Baguio City': { temperature: 18, condition: 'Cloudy', icon: '/imgs/storm.png' },
        'Manila': { temperature: 32, condition: 'Sunny', icon: '/imgs/sun.png' },
        'Cebu City': { temperature: 32, condition: 'Rainy', icon: '/imgs/rain.png' },
        'Cagayan De Oro City': { temperature: 17, condition: 'Stormy', icon: '/imgs/storm.png' },
      }, // Sample weather data for each city
      hourlyForecast: [
        { hour: '7:00 AM', image: '/imgs/rain.png', temperature: 18 },
        { hour: '8:00 AM', image: '/imgs/6.png', temperature: 19 },
        { hour: '9:00 AM', image: '/imgs/4.png', temperature: 20 },
        { hour: '10:00 AM', image: '/imgs/sun.png', temperature: 21 },
        { hour: '11:00 AM', image: '/imgs/sun.png', temperature: 23 },
        { hour: '12:00 NN', image: '/imgs/sun.png', temperature: 28 },
        { hour: '1:00 PM', image: '/imgs/sun.png', temperature: 29 },
        { hour: '2:00 PM', image: '/imgs/sun.png', temperature: 32 },
        { hour: '3:00 PM', image: '/imgs/sun.png', temperature: 30 },
        { hour: '4:00 PM', image: '/imgs/sun.png', temperature: 28 },
        { hour: '5:00 PM', image: '/imgs/sun.png', temperature: 25 },
        { hour: '6:00 PM', image: '/imgs/rain.png', temperature: 18 },
      ],
      threeDayForecast: [
        { date: 'Tomorrow', temperature: 30, icon: '/imgs/sun.png', description: 'Sunny' },
        { date: 'Day After', temperature: 29, icon: '/imgs/storm.png', description: 'Cloudy' },
        { date: 'In 3 Days', temperature: 28, icon: '/imgs/rain.png', description: 'Rainy' }
      ]
    };
  },
  methods: {
    onSeeMoreClick(city) {
      this.selectedCity = city; // Update selected city
      alert(`Successfully set ${city} as default!`);
    },
    onSearchClick() {
      alert("Search button clicked!");
    },
    activeCardStyle(city) {
      return {
        backgroundColor: this.selectedCity === city ? 'transparent' : '#2a2e3b', // Transparent for selected, dark gray for unselected
      };
    }
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
.forecast-card{
  margin-top: 20px;
  background-color: #2a2e3b;
  border-radius: 30px;
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
</style>
