<template>
  <v-container fluid class="text-white mb-16" style="margin-top: -20px;">
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
                <v-col class="text-h1 temp-font" cols="6" style="font-weight: bolder;">
                  {{ unitsStore.convertedTemp }}&deg;{{ unitsStore.tempUnit }}
                </v-col>
                <v-col class="weather-icon text-right" cols="6">
                  <img src="/imgs/sun.png" alt="Weather" width="150" />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-container>

        <!-- Today's Forecast Card -->
        <v-card class="forecast mx-auto mt-4 text-white" elevation="0">
          <v-card-title style="font-size: 16px; margin: 10px 0 5px 30px; color:gray;">Today's Hourly
            Forecast
          </v-card-title>

          <v-card-text>
            <div class="overflow-x-hidden">
              <div class="d-flex overflow-x-auto hide-scrollbar">
                <v-col v-for="(time, index) in hourlyForecast" :key="time.hour" cols="auto" class="hour-details">

                  <v-btn class="forecast-item-btn" style="background: none; box-shadow: none;"
                    @click="showDetails(time)" outlined>
                    <div class="forecast-item text-center">
                      <div style="color:gray">{{ time.hour }}</div>
                      <img :src="time.image" alt="Weather" width="50" />
                      <div style="font-size: 18px; font-weight: bolder;">
                        {{ time.temperature }}&deg;{{ unitsStore.tempUnit }}
                      </div>
                    </div>
                  </v-btn>

                  <div v-if="index < hourlyForecast.length - 1" class="divider"></div>
                </v-col>
              </div>
            </div>
          </v-card-text>
        </v-card>

        <!-- Modal (v-dialog) for Detailed Weather Info -->
        <v-dialog v-model="dialog" max-width="500px" persistent>
  <v-card class="rounded-lg" elevation="10" style="background-color: #2a2e3b; color: white; border-radius: 20px;">
    <v-card-title class="headline" style="font-size: 16px; font-weight: bold; padding:30px">
      Weather Details for {{ selectedTime.hour }}
    </v-card-title>

    <v-card-text>
      <v-row>

        <v-col cols="6">
          <div class="weather-detail-item">
            <strong>Temperature:</strong> {{ selectedTime.temperature }}&deg;{{ unitsStore.tempUnit }}
          </div>
          <div class="weather-detail-item">
            <strong>Air Quality:</strong> {{ selectedTime.airQuality }}
          </div>
          <div class="weather-detail-item">
            <strong>Wind Speed:</strong> {{ selectedTime.windSpeed }} km/h
          </div>
        </v-col>

       
        <v-col cols="6">
          <div class="weather-detail-item">
            <strong>UV Index:</strong> {{ selectedTime.uvIndex }}
          </div>
          <div class="weather-detail-item">
            <strong>Humidity:</strong> {{ selectedTime.humidity }}%
          </div>
        </v-col>
      </v-row>
    </v-card-text>

    
    <v-card-actions class="justify-center mb-5" style="">
      <v-btn @click="dialog = false" style="min-width: 150px; background-color: #3f51b5; color:white;">
        Close
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>



        <!-- Activity Suggestion Carousel-->
        <v-container class="suggestions">
          <v-col>
            <v-text class="suggestion-title" style="margin-left: 20px; color:gray;">Activity Suggestions</v-text>
            <v-carousel height="150" :show-arrows="false" cycle hide-delimiters>
              <v-carousel-item v-for="(activity, i) in activitySuggestions" :key="i">
                <v-sheet color="transparent" height="100%">
                  <div class="d-flex fill-height justify-center align-center flex-column text-center">
                    <div class="suggestion-text text-h5 font-weight-bold">{{ activity.title }}</div>
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
              style="font-size: 16px; margin: 0px 0 5px 10px; color:gray">
              <span>Weather Conditions</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-col cols="7">
                  <div class="d-flex flex-column">
                    <div class="d-flex align-center">
                      <v-icon class="mr-1" size="28">mdi-thermometer</v-icon>
                      <span style="color: gray; font-size: 15px;">Feels like</span>
                    </div>
                    <strong class="temperature-value" style="font-size: 20px;">30&deg;</strong>
                  </div>

                  <div class="d-flex flex-column mt-4">
                    <div class="d-flex align-center">
                      <v-icon class="mr-1" size="28">mdi-weather-sunny</v-icon>
                      <span style="color: gray; font-size: 15px;">UV Index</span>
                    </div>
                    <strong class="temperature-value" style="font-size: 20px;">3</strong>
                  </div>

                  <div class="d-flex flex-column mt-4">
                    <div class="d-flex align-center">
                      <v-icon class="mr-2" size="28">mdi-water-percent</v-icon>
                      <span style="color: gray; font-size: 15px;">Humidity</span>
                    </div>
                    <strong class="temperature-value" style="font-size: 20px;">60%</strong>
                  </div>

                  <div class="d-flex flex-column mt-4">
                    <div class="d-flex align-center">
                      <v-icon class="mr-2" size="28">mdi-speedometer</v-icon>
                      <span style="color: gray; font-size: 15px;">Air Pressure</span>
                    </div>
                    <strong class="temperature-value" style="font-size: 20px;">{{ unitsStore.convertedPressure }} {{
                      unitsStore.pressureUnit }}</strong>
                  </div>
                </v-col>

                <v-col cols="5">
                  <div class="d-flex flex-column">
                    <div class="d-flex align-center">
                      <v-icon class="mr-1" size="28">mdi-water-percent</v-icon>
                      <span style="color: gray; font-size: 15px;">Chance of Rain</span>
                    </div>
                    <strong class="temperature-value" style="font-size: 20px;">0%</strong>
                  </div>

                  <div class="d-flex flex-column mt-4">
                    <div class="d-flex align-center">
                      <v-icon class="mr-2" size="28">mdi-weather-windy</v-icon>
                      <span style="color: gray; font-size: 15px;">Wind</span>
                    </div>
                    <strong class="temperature-value" style="font-size: 20px;"> {{ unitsStore.convertedWindSpeed }}
                      <i>{{ unitsStore.windSpeedUnit }}</i></strong>
                  </div>

                  <div class="d-flex flex-column mt-4">
                    <div class="d-flex align-center">
                      <v-icon class="mr-2" size="28">mdi-eye</v-icon>
                      <span style="color: gray; font-size: 15px;">Visibility</span>
                    </div>
                    <strong class="temperature-value" style="font-size: 20px;">7 mi</strong>
                  </div>

                  <div class="d-flex flex-column mt-4">
                    <div class="d-flex align-center">
                      <v-icon class="mr-2" size="28">mdi-weather-sunset</v-icon>
                      <span style="color: gray; font-size: 15px;">Sunset</span>
                    </div>
                    <strong class="temperature-value" style="font-size: 20px;">20:58</strong>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-container>
        </v-card>

        <!-- Air Quality Card -->
        <v-card class="air-quality-card mx-auto mt-4 text-white" elevation="0" style="background-color: #2a2e3b;">
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
          <v-card-title
            style="font-size: 16px; text-align: center; margin-bottom: 40px; margin-top: 10px; color: gray;">
            <v-icon left class="mr-2">
              mdi-calendar
            </v-icon>
            7-Day Weather Forecast
          </v-card-title>
          <v-card-text>
            <v-list-item-group>
              <v-list-item v-for="(day, index) in weeklyForecast" :key="index">
                <v-list-item-content>
                  <v-list-item-title>
                    <div class="d-flex  justify-space-between align-center">
                      <span style="color:gray">{{ day.date }}</span>
                      <img :src="getWeatherIcon(day.temperature)" alt="Weather Icon"
                        style="width: 40px; height: 40px; margin-right: 8px;" />
                      <span class="ml" style="font-size: 20px;"><strong>{{ day.temperature }}°{{ unitsStore.tempUnit
                          }}</strong></span>
                    </div>
                  </v-list-item-title>
                </v-list-item-content>
                <v-divider v-if="index < weeklyForecast.length - 1" style="margin: 20px 0;"></v-divider>
              </v-list-item>
            </v-list-item-group>
          </v-card-text>
        </v-card>

        <v-card class="wax-cresent text-white" elevation="0" style="background-color: #2a2e3b; padding: 20px;">
          <v-card-title style="font-size: 16px; margin: 10px 0 15px 30px; color: gray;">
            <v-icon left class="mr-2">
              mdi-moon-waxing-crescent
            </v-icon>
            Waxing Crescent
          </v-card-title>

          <v-card-text>
            <div class="sun-animation-container">
              <svg width="100%" height="100px" viewBox="0 0 300 100">
                <!-- Parabolic curve path -->
                <defs>
                  <filter id="glow">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                    <feFlood flood-color="orange" result="color" />
                    <feComposite in2="blur" operator="in" />
                    <feMerge>
                      <feMergeNode />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <!-- Parabolic curve path -->
                <path id="parabolaPath" d="M10 80 Q 150 -50 290 80" stroke="gray" fill="none" stroke-width="2" />
                <!-- Sun element that follows the path with glow effect -->
                <circle id="sun" r="12" fill="orange" filter="url(#glow)">
                  <animateMotion dur="5s" repeatCount="1" fill="freeze">
                    <mpath href="#parabolaPath" />
                  </animateMotion>
                </circle>
              </svg>
            </div>

            <!-- Sunrise Details -->
            <div class="d-flex details">
              <div class="sunrise text-left">
                <v-icon class="sun-icon">mdi-weather-sunset-up</v-icon>
                <span class="sunrise-label">Sunrise</span>
                <span class="sunrise-time">6:30 AM</span>
              </div>

              <div class="sunset text-left">
                <v-icon class="sun-icon">mdi-weather-sunset</v-icon>
                <span class="sunset-label">Sunset</span>
                <span class="sunset-time">5:45 PM</span>
              </div>
            </div>
          </v-card-text>
        </v-card>

        <!-- Qoute Carddddd -->
        <v-card class="quote-card text-white mt-8 mb-16" height="330px"
          style="display: flex; justify-content: center; align-items: center; background-color:#2a2e3b; border-radius: 30px;">
          <div class="weather-quote" style="text-align: center; padding: 50px;">
            <blockquote>
              <p><strong><span style="font-size: 25px;">" </span>{{ currentQuote }}<span style="font-size: 25px;">
                    "</span></strong></p>
              <footer class="text-right mt-10">— {{ currentAuthor }}</footer>
            </blockquote>
          </div>
        </v-card>



      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useUnitsStore } from '@/stores/unit';

// Use the Pinia store
const unitsStore = useUnitsStore();


import cloudyIcon from '/imgs/4.png';
import sunnyIcon from '/imgs/sun.png';
import stormyIcon from '/imgs/storm.png';
import rainyIcon from '/imgs/rain.png';

// Define the hourly forecast data
const hourlyForecast = ref([
  { hour: '6:00 AM', image: cloudyIcon, temperature: 24, airQuality: 'Good', uvIndex: 5, windSpeed: 15, humidity: 60  },
  { hour: '7:00 AM', image: cloudyIcon, temperature: 28, airQuality: 'Moderate', uvIndex: 4, windSpeed: 10, humidity: 65 },
  { hour: '8:00 AM', image: sunnyIcon, temperature: 32, airQuality: 'Unhealthy', uvIndex: 2, windSpeed: 20, humidity: 80  },
  { hour: '9:00 AM', image: rainyIcon, temperature: 15 },
  { hour: '10:00 AM', image: rainyIcon, temperature: 18 },
  { hour: '11:00 AM', image: sunnyIcon, temperature: 22 },
  { hour: '12:00 NN', image: sunnyIcon, temperature: 21 },
  { hour: '1:00 PM', image: sunnyIcon, temperature: 25 },
  { hour: '2:00 PM', image: sunnyIcon, temperature: 19 },
  { hour: '3:00 PM', image: sunnyIcon, temperature: 26 },
  { hour: '4:00 PM', image: rainyIcon, temperature: 17 },
  { hour: '5:00 PM', image: rainyIcon, temperature: 18 },
  { hour: '6:00 PM', image: rainyIcon, temperature: 19 },
  { hour: '7:00 PM', image: rainyIcon, temperature: 18 },
  { hour: '8:00 PM', image: rainyIcon, temperature: 15 },

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

// For managing the modal dialog
const dialog = ref(false) 
const selectedTime = ref({})  

// Function to handle when an hourly forecast item is clicked
function showDetails(time) {
  selectedTime.value = time  
  dialog.value = true        
}

const onSeeMoreClick = () => {
  alert("See More button clicked!");
};

// Define activity suggestions based on weather conditions
const activitySuggestions = ref([]);
const weatherCondition = 'sunny'; 

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

// Quotes logic
const quotes = ref([
  { text: "There’s no such thing as bad weather, only inappropriate clothing.", author: "Sir Ranulph Fiennes" },
  { text: "The best thing about the weather is that it’s always changing.", author: "Unknown" },
  { text: "The sun is a daily reminder that we too can rise again from the darkness.", author: "Unknown" },
  { text: "A little rain each day will quench the drought.", author: "Anonymous" },
  { text: "Sunshine is delicious, rain is refreshing, wind braces us up, snow is exhilarating; there’s really no such thing as bad weather, only different kinds of good weather.", author: "John Ruskin" },
  { text: "Every storm runs out of rain.", author: "Maya Angelou" },
  { text: "In the midst of winter, I found there was, within me, an invincible summer.", author: "Albert Camus" },
  { text: "The sky is the daily bread of the eyes.", author: "Ralph Waldo Emerson" },
  { text: "Weather is a great metaphor for life—sometimes it's good, sometimes it's bad, and there's nothing much you can do about it but carry an umbrella.", author: "Terry Pratchett" },
  { text: "If you don't like the weather in New England, just wait a few minutes.", author: "Mark Twain" },
  { text: "The sun will shine on those who stand before it shines on those who kneel under them.", author: "A. M. McCaffrey" },
  { text: "The best time to plant a tree was twenty years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "Rain is not a period of despair. It is a symbol of life.", author: "Unknown" },
  { text: "A change in the weather is sufficient to recreate the world and ourselves.", author: "Marcel Proust" },
  { text: "To appreciate the beauty of a snowflake, it is necessary to stand out in the cold.", author: "Aristotle" }
]);

const currentQuote = ref('');
const currentAuthor = ref('');
let index = 0;


let airQualityInterval;
let quoteInterval; 

const updateQuote = () => {
  currentQuote.value = quotes.value[index].text;
  currentAuthor.value = quotes.value[index].author;
  index = (index + 1) % quotes.value.length;
};


onMounted(() => {
  generateRandomAirQuality();
  airQualityInterval = setInterval(generateRandomAirQuality, 5000);
  loadActivitiesBasedOnWeather();
  updateQuote();
  quoteInterval = setInterval(updateQuote, 3000);
});


onBeforeUnmount(() => {
  clearInterval(airQualityInterval);
  clearInterval(quoteInterval);
});

</script>


<style scoped>
@media (max-width: 600px) {
  .temp-font {
    font-size: 55px !important;; 
  }
}
.forecast-item-btn{
  color:white;
  margin-left: 10px;
}
.weather-detail-item {
  margin: 10px 0;
  font-size: 16px;
  color: #b0bec5;
  margin-left: 10px;
}

.weather-detail-item strong {
  color: #fff;
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
.suggestions,
.air-quality-card,
.forecast-card,
.wax-cresent,
.qoute-card {
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

.suggestion-text {
  font-family: 'Montserrat', sans-serif;
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

.details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sunrise,
.sunset {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.sun-icon {
  margin-bottom: 4px;
}

.sunrise-label,
.sunset-label {
  font-weight: bold;
}

.sunrise-time,
.sunset-time {
  font-size: 14px;
  color: gray;
}

.quote {
  font-family: 'Montserrat', sans-serif;
}

blockquote {
  font-style: italic;
  font-size: 1.1rem;
  line-height: 1.5;
}
</style>
