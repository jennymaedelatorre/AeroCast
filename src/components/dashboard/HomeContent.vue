<template>
    <v-container fluid class="text-white">
        <v-row>
            <v-col cols="12" lg="8">
                <v-text-field label="Search for Cities" filled dense rounded solo flat background-color="grey lighten-3"
                    append-inner-icon="mdi-magnify" @click:append="onSearchClick"></v-text-field>

                <v-container>
                    <v-card class="weather mx-auto mt-4" elevation="0" style="border: none;">
                        <v-card-item title="Butuan City">
                            <template v-slot:subtitle>
                                Chance of rain 0%
                            </template>
                        </v-card-item>

                        <v-card-text class="mb-5">
                            <v-row align="center" no-gutters>
                                <v-col class="text-h2" cols="6" style="font-weight: bolder;">
                                    25&deg;C
                                </v-col>
                                <v-col class="weather-icon text-right" cols="6">
                                    <img src="/imgs/4.png" alt="Weather" width="88" />
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-container>

                <!-- Today's Forecast Card -->
                <v-card class="forecast mx-auto mt-4 text-white" elevation="0">
                    <v-card-title style="font-size: 16px; margin: 10px 0 5px 30px;">Today's Hourly
                        Forecast</v-card-title>

                    <v-card-text>
                        <div class="overflow-x-hidden">
                            <div class="d-flex overflow-x-auto hide-scrollbar">
                                <v-col v-for="(time, index) in hourlyForecast" :key="time.hour" cols="auto">
                                    <div class="d-flex align-center">
                                        <div class="forecast-item text-center">
                                            <div>{{ time.hour }}</div>
                                            <img :src="time.image" alt="Weather" width="36" />
                                            <div style="font-size: 18px; font-weight: bolder;">{{ time.temperature
                                                }}&deg;C</div>
                                        </div>
                                        <!-- Add vertical divider only if not the last item -->
                                        <div v-if="index < hourlyForecast.length - 1" class="divider"></div>
                                    </div>
                                </v-col>
                            </div>
                        </div>
                    </v-card-text>
                </v-card>

                <!-- Activity Suggestion Carousel-->
                <v-container class="suggestions">
                    <v-col>
                        <v-text class="suggestion-title" style="margin-left: 20px">Activity Suggestions</v-text>
                        <v-carousel height="150" :show-arrows="false" cycle hide-delimiters>
                            <v-carousel-item v-for="(activity, i) in activitySuggestions" :key="i">
                                <v-sheet color="transparent" height="100%">
                                    <div class="d-flex fill-height justify-center align-center flex-column text-center">
                                        <div class="text-h5 font-weight-bold">{{ activity.title }}</div>
                                        <div class="text-body-1" style="color: #708090;">{{ activity.description }}
                                        </div>
                                    </div>
                                </v-sheet>
                            </v-carousel-item>
                        </v-carousel>
                    </v-col>
                </v-container>

                <!-- Weather Conditions Card -->
                <v-card class="weather-conditions mx-auto mt-4 text-white" elevation="0">
                    <v-container>
                        <v-card-title class="d-flex justify-space-between align-center"
                            style="font-size: 16px; margin: 0px 0 5px 10px;">
                            <span>Weather Conditions</span>
                            <v-btn color="primary" rounded @click="onSeeMoreClick" class="see-more">
                                <h4 style="font-size: 10px;">See More</h4>
                            </v-btn>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            <v-row>
                                <v-col cols="7">
                                    <div class="d-flex flex-column">
                                        <div class="d-flex align-center">
                                            <v-icon class="mr-1" size="28">mdi-thermometer</v-icon>
                                            <span>Feels like</span>
                                        </div>
                                        <strong class="temperature-value" style="font-size: 20px;">30&deg;</strong>
                                    </div>

                                    <div class="d-flex flex-column mt-4">
                                        <div class="d-flex align-center">
                                            <v-icon class="mr-1" size="28">mdi-weather-sunny</v-icon>
                                            <span>UV Index</span>
                                        </div>
                                        <strong class="temperature-value" style="font-size: 20px;">3</strong>
                                    </div>

                                    <div class="d-flex flex-column mt-4">
                                        <div class="d-flex align-center">
                                            <v-icon class="mr-2" size="28">mdi-water-percent</v-icon>
                                            <span>Humidity</span>
                                        </div>
                                        <strong class="temperature-value" style="font-size: 20px;">60%</strong>
                                    </div>

                                    <div class="d-flex flex-column mt-4">
                                        <div class="d-flex align-center">
                                            <v-icon class="mr-2" size="28">mdi-speedometer</v-icon>
                                            <span>Air Pressure</span>
                                        </div>
                                        <strong class="temperature-value" style="font-size: 20px;">1009 hPa</strong>
                                    </div>
                                </v-col>

                                <v-col cols="5">
                                    <div class="d-flex flex-column">
                                        <div class="d-flex align-center">
                                            <v-icon class="mr-1" size="28">mdi-water-percent</v-icon>
                                            <span>Chance of Rain</span>
                                        </div>
                                        <strong class="temperature-value" style="font-size: 20px;">0%</strong>
                                    </div>

                                    <div class="d-flex flex-column mt-4">
                                        <div class="d-flex align-center">
                                            <v-icon class="mr-2" size="28">mdi-weather-windy</v-icon>
                                            <span>Wind</span>
                                        </div>
                                        <strong class="temperature-value" style="font-size: 20px;">0.2
                                            <i>Km/h</i></strong>
                                    </div>

                                    <div class="d-flex flex-column mt-4">
                                        <div class="d-flex align-center">
                                            <v-icon class="mr-2" size="28">mdi-eye</v-icon>
                                            <span>Visibility</span>
                                        </div>
                                        <strong class="temperature-value" style="font-size: 20px;">7 mi</strong>
                                    </div>

                                    <div class="d-flex flex-column mt-4">
                                        <div class="d-flex align-center">
                                            <v-icon class="mr-2" size="28">mdi-weather-sunset</v-icon>
                                            <span>Sunset</span>
                                        </div>
                                        <strong class="temperature-value" style="font-size: 20px;">20:58</strong>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-container>
                </v-card>

                <!-- Air Quality Card -->
                <v-card class="air-quality-card mx-auto mt-4 text-white" elevation="0"
                    style="background-color: #2a2e3b;">
                    <v-container>
                        <div class="d-flex align-center mb-3" style="margin-left: 20px">
                            <v-icon class="mr-2" size="25">mdi-dots-grid</v-icon>
                            <span>Air Quality</span>
                        </div>
                        <v-card-title style="margin-left: 5px; font-size: 25px;">
                            <strong>{{ airQuality.status }} {{ airQuality.pm25 }} µg/m³</strong>
                        </v-card-title>
                        <v-card-text>
                            <div class="d-flex align-center">
                                <span></span>
                            </div>
                            <div class="air-quality-description" style="margin-left: 5px; color:#708090; ">
                                <p>
                                    <span v-if="airQuality.status === 'Good'"> The air quality is considered
                                        satisfactory, and air pollution poses little or no risk.</span>
                                    <span v-else-if="airQuality.status === 'Moderate'"> Air quality is acceptable;
                                        however, for some pollutants, there may be a moderate health concern for a very
                                        small number of people.</span>
                                    <span v-else> Everyone may begin to experience health effects; members of sensitive
                                        groups may experience more serious health effects.</span>
                                </p>
                            </div>
                        </v-card-text>
                        <!-- Progress Line -->
                        <div class="progress-container">
                            <div class="rainbow-progress"></div>
                            <div class="progress-indicator" :style="{ left: (airQuality.pm25) + '%' }"></div>
                        </div>
                    </v-container>
                </v-card>
            </v-col>

            <!-- 2nnnndddddd Colummmmnnnnn -->
            <v-col cols="12" lg="4">
                <v-card class="forecast-card text-white" elevation="0" style="background-color: #2a2e3b; padding: 20px;">
                    <v-card-title style="font-size: 16px; margin: 10px 0 15px 30px; color: gray;">
                        <v-icon left class="mr-2">
                            mdi-calendar 
                        </v-icon>
                        7-Day Weather Forecast
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-list-item-group>
                            <v-list-item v-for="(day, index) in weeklyForecast" :key="index">
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <div class="d-flex  justify-space-between align-center">
                                            <span class="mr-">{{ day.date }}</span>
                                            <img :src="getWeatherIcon(day.temperature)" alt="Weather Icon"
                                                style="width: 30px; height: 30px; margin-right: 8px;" />
                                            <span class="ml" style="font-size: 20px;" ><strong>{{ day.temperature }}°C</strong></span>
                                        </div>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import sunnyIcon from '/imgs/4.png';
import stormyIcon from '/imgs/5.png';
import rainyIcon from '/imgs/6.png';

// Define the hourly forecast data
const hourlyForecast = ref([
  { hour: '6:00 AM', image: sunnyIcon, temperature: 24 },
  { hour: '7:00 AM', image: stormyIcon, temperature: 28 },
  { hour: '8:00 AM', image: sunnyIcon, temperature: 32 },
  { hour: '8:00 AM', image: rainyIcon, temperature: 15 },
  { hour: '8:00 AM', image: rainyIcon, temperature: 18 },
  { hour: '8:00 AM', image: sunnyIcon, temperature: 22 },
  { hour: '8:00 AM', image: sunnyIcon, temperature: 21 },
  { hour: '8:00 AM', image: sunnyIcon, temperature: 25 },
  { hour: '8:00 AM', image: sunnyIcon, temperature: 19 },
  { hour: '8:00 AM', image: sunnyIcon, temperature: 26 },
  { hour: '8:00 AM', image: rainyIcon, temperature: 17 },
  { hour: '8:00 AM', image: rainyIcon, temperature: 18 },
  { hour: '8:00 AM', image: rainyIcon, temperature: 19 },
  { hour: '8:00 AM', image: sunnyIcon, temperature: 25 },
  { hour: '8:00 AM', image: sunnyIcon, temperature: 22 },
  
]);

// Define the weekly forecast data
const weeklyForecast = ref([
  { date: 'Monday', temperature: 24 }, 
  { date: 'Tuesday', temperature: 18 },
  { date: 'Wednesday', temperature: 22 },
  { date: 'Thursday', temperature: 15 },
  { date: 'Friday', temperature: 18 },
  { date: 'Saturday', temperature: 22 },
  { date: 'Sunday', temperature: 20 }, 
]);

// Function to get the weather icon based on temperature
const getWeatherIcon = (temperature) => {
  if (temperature >= 30) {
    return sunnyIcon; 
  } else if (temperature >= 20) {
    return sunnyIcon; 
  } else if (temperature >= 15) {
    return stormyIcon; 
  } else {
    return rainyIcon; 
  }
};


const onSeeMoreClick = () => {
  alert("See More button clicked!");
};

// Define activity suggestions based on weather conditions
const activitySuggestions = ref([]);
const weatherCondition = 'sunny'; // Example weather condition

const loadActivitiesBasedOnWeather = () => {
  if (weatherCondition === 'sunny') {
    activitySuggestions.value = [
      { title: 'Go Hiking', description: 'Enjoy the scenic trails near you.', color: '#FFEB3B' },
      { title: 'Outdoor Picnic', description: 'Have a relaxing day at the park.', color: '#FF9800' },
      { title: 'Go for a Bike Ride', description: 'Enjoy the fresh air and exercise.', color: '#8BC34A' },
    ];
  } else if (weatherCondition === 'rainy') {
    activitySuggestions.value = [
      { title: 'Watch a Movie', description: 'Catch the latest films in theaters.', color: '#9E9E9E' },
      { title: 'Read a Book', description: 'Get cozy with a good book.', color: '#5C6BC0' },
      { title: 'Visit a Museum', description: 'Explore local history and art.', color: '#FF7043' },
    ];
  } else if (weatherCondition === 'snowy') {
    activitySuggestions.value = [
      { title: 'Go Skiing', description: 'Hit the slopes and enjoy the snow.', color: '#90CAF9' },
      { title: 'Build a Snowman', description: 'Have fun building a snowman.', color: '#D1C4E9' },
      { title: 'Enjoy Hot Cocoa', description: 'Warm up with a cup of hot cocoa.', color: '#FFCCBC' },
    ];
  } else {
    activitySuggestions.value = [
      { title: 'Explore Local Shops', description: 'Discover unique finds in your area.', color: '#C5E1A5' },
      { title: 'Go to a Cafe', description: 'Relax at a local cafe.', color: '#FFF59D' },
      { title: 'Visit an Art Gallery', description: 'Admire local art and creativity.', color: '#B0BEC5' },
    ];
  }
};

// hold air quality data
const airQuality = ref({
  status: 'Good',
  pm25: 15,
});

// Function to generate a random PM2.5 value and update the air quality object
const generateRandomAirQuality = () => {
  const randomPm25 = Math.floor(Math.random() * 101);
  airQuality.value.pm25 = randomPm25;

  // Set air quality status based on PM2.5 value
  if (randomPm25 <= 35) {
    airQuality.value.status = 'Good';
  } else if (randomPm25 <= 75) {
    airQuality.value.status = 'Moderate';
  } else {
    airQuality.value.status = 'Unhealthy';
  }
};

// Lifecycle hook to run the function when the component is mounted
let airQualityInterval;
onMounted(() => {
  generateRandomAirQuality();
  airQualityInterval = setInterval(generateRandomAirQuality, 5000); 
  loadActivitiesBasedOnWeather(); 
});

// Cleanup interval on component unmount
onBeforeUnmount(() => {
  clearInterval(airQualityInterval);
});
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
.forecast, .weather-conditions, .suggestions, .air-quality-card,
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
.temperature-value{
    margin-left: 40px;
}

.progress-container {
  position: relative;
  width: 95%;
  height: 10px; 
  margin-top: 10px; 
  background-color: transparent; 
  margin-bottom: 20px;
  margin: 10px auto;
}

.rainbow-progress {
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet); 
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  border-radius: 20px;
}

.progress-indicator {
  position: absolute;
  top: -2px; 
  width: 16px; 
  height: 16px; 
  background-color: white; 
  border-radius: 50%; 
  border: 2px solid #fff; 
  transform: translate(-50%, 0);
  transition: left 0.5s ease; 
  z-index: 20;
}
</style>
