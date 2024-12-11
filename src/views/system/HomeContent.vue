<template>
  <v-container fluid class="text-white" style="margin-top: -20px;">
    <v-row>
      <v-col cols="12" lg="8">
        <v-container>
          <v-card class="weather mx-auto mt-4" elevation="0" style="border: none;">
            <v-card-item :title="defaultCity">
              <template v-slot:subtitle>
                <span class="desc" style="font-size: 15.5px;">
                  <span v-if="!currentWeather.condition">Loading...</span>
                  <span v-else>{{ currentWeather.condition }}</span>
                </span>
              </template>
            </v-card-item>

            <v-card-text class="mb-5">
              <v-row align="center" no-gutters>
                <v-col class="text-h1 temp-font" cols="6" style="font-weight: bolder;">
                  <span>
                    <p style="color: lightgray; font-size: 24px;" v-if="!currentWeather.temperature">Fetching Weather
                      Temperature...</p>
                    <span v-else>{{ currentWeather.temperature }}&deg;{{ formattedTemperature }}
                      <span v-if="unitsStore.tempUnit === 'C'">C</span>
                      <span v-if="unitsStore.tempUnit === 'F'">F</span>
                    </span>
                  </span>
                </v-col>
                <v-col class="weather-icon text-right" cols="6">
                  <div v-if="!currentWeather.icon">
                    <span style="color: lightgray; font-size: 18px;">Loading icon...</span>
                  </div>
                  <img v-else :src="currentWeather.icon" alt="Weather Icon" width="180" />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-container>

        <!-- Today's Forecast Card -->
        <v-card class="forecast mx-auto mt-4 text-white" elevation="0">
          <v-card-title style="font-size: 16px; margin: 10px 0 5px 30px; color:gray;">
            Today's Hourly Forecast
          </v-card-title>

          <v-card-text>
            <!-- Loading Text for Hourly Forecast -->
            <div v-if="!hourlyForecast || hourlyForecast.length === 0">
              <span style="color: lightgray; font-size: 15px; margin-left:38%;">Loading hourly forecast...</span>
            </div>

            <div v-else class="overflow-x-hidden">
              <div class="d-flex overflow-x-auto hide-scrollbar">
                <v-col v-for="(time, index) in hourlyForecast" :key="time.hour" cols="auto" class="hour-details">
                  <v-btn class="forecast-item-btn" style="background: none; box-shadow: none;" outlined>
                    <div class="forecast-item text-center">
                      <div style="color:gray">{{ time.hour }}</div>
                      <img :src="time.image" alt="Weather" width="50" />
                      <div style="font-size: 18px; font-weight: bolder;">
                        {{ time.temperature }}&deg;{{ formattedTemperature }}
                        <span v-if="unitsStore.tempUnit === 'C'">C</span>
                        <span v-if="unitsStore.tempUnit === 'F'">F</span>
                      </div>
                    </div>
                  </v-btn>

                  <div v-if="index < hourlyForecast.length - 1" class="divider"></div>
                </v-col>
              </div>
            </div>
          </v-card-text>
        </v-card>

        <!-- Activity Suggestion Carousel-->
        <v-container class="suggestions">
          <v-col>
            <v-text class="suggestion-title mb-10" style="margin-left: 20px; color:gray;">Activity Suggestions</v-text>
            <div v-if="!activitySuggestions || activitySuggestions.length === 0">
              <span style="color: lightgray; font-size: 15px; margin-left:38%;">Loading activity suggestions...</span>
            </div>
            <v-carousel v-else height="200" :show-arrows="false" cycle hide-delimiters>
              <v-carousel-item v-for="(activity, i) in activitySuggestions" :key="i">
                <v-sheet color="transparent" height="100%">
                  <div class="d-flex fill-height justify-center align-center flex-column text-center">
                    <!-- Add the image here -->
                    <img :src="activity.icon" alt="activity-icon" class="activity-icon mt-10"
                      style="max-width: 100px; margin-bottom: 10px;" />
                    <div class="suggestion-text text-h5 font-weight-bold">{{ activity.title }}</div>
                    <div class="text-body-1 mb-10" style="color: #708090;">{{ activity.description }}</div>
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
                <v-col cols="6">
                  <div class="d-flex flex-column ">
                    <div class="d-flex align-center">
                      <v-icon class="mr-1" size="28">mdi-thermometer</v-icon>
                      <span style="color: gray; font-size: 15px;">Feels like</span>
                    </div>
                    <strong class="temperature-value" style="font-size: 20px;">{{ currentWeather.feelsLike }}°{{
                      formattedTemperature }}
                      <span v-if="unitsStore.tempUnit === 'C'">C</span>
                      <span v-if="unitsStore.tempUnit === 'F'">F</span></strong>
                  </div>

                  <div class="d-flex flex-column mt-4">
                    <div class="d-flex align-center">
                      <v-icon class="mr-1" size="28">mdi-cloud</v-icon>
                      <span style="color: gray; font-size: 15px;">Cloud Coverage</span>
                    </div>
                    <strong class="temperature-value" style="font-size: 20px;">{{ currentWeather.clouds }}</strong>
                  </div>

                  <div class="d-flex flex-column mt-4">
                    <div class="d-flex align-center">
                      <v-icon class="mr-2" size="28">mdi-water-percent</v-icon>
                      <span style="color: gray; font-size: 15px;">Humidity</span>
                    </div>
                    <strong class="temperature-value" style="font-size: 20px;">{{ currentWeather.humidity }}%</strong>
                  </div>

                  <div class="d-flex flex-column mt-4">
                    <div class="d-flex align-center">
                      <v-icon class="mr-1" size="28">mdi-weather-sunny</v-icon>
                      <span style="color: gray; font-size: 15px;">Condition</span>
                    </div>
                    <strong class="temperature-value" style="font-size: 20px;">{{ currentWeather.condition }}</strong>
                  </div>
                </v-col>

                <v-col cols="6">
                  <div class="d-flex1 flex-column">
                    <div class="d-flex align-center">
                      <v-icon class="mr-2" size="28">mdi-speedometer</v-icon>
                      <span style="color: gray; font-size: 15px;">Air Pressure</span>
                    </div>
                    <strong class="temperature-value" style="font-size: 20px;">{{ currentWeather.pressure }}{{
                      setPressureUnit
                      }}
                    </strong>
                  </div>

                  <div class="d-flex1 flex-column mt-4">
                    <div class="d-flex align-center">
                      <v-icon class="mr-2" size="28">mdi-weather-windy</v-icon>
                      <span style="color: gray; font-size: 15px;">Wind</span>
                    </div>
                    <strong class="temperature-value" style="font-size: 20px;">{{ currentWeather.windSpeed }} m/s
                    </strong>
                  </div>

                  <div class="d-flex1 flex-column mt-4">
                    <div class="d-flex align-center">
                      <v-icon class="mr-2" size="28">mdi-eye</v-icon>
                      <span style="color: gray; font-size: 15px;">Visibility</span>
                    </div>
                    <strong class="temperature-value" style="font-size: 20px;">{{ currentWeather.visibility }}
                      km</strong>
                  </div>

                  <div class="d-flex1 flex-column mt-4">
                    <div class="d-flex align-center">
                      <v-icon class="mr-2" size="28">mdi-weather-sunset</v-icon>
                      <span style="color: gray; font-size: 15px;">Sunset</span>
                    </div>
                    <strong class="temperature-value" style="font-size: 20px;">{{ currentWeather.sunset }}</strong>
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
              <div class="air-quality-description" style="margin-left: 5px; color:#708090;">
                <p>
                  <span v-if="airQuality.status === 'Good'"> The air quality is considered satisfactory, and air
                    pollution poses little or no risk.</span>
                  <span v-else-if="airQuality.status === 'Moderate'"> Air quality is acceptable; however, for some
                    pollutants, there may be a moderate health concern for a very small number of people.</span>
                  <span v-else> Everyone may begin to experience health effects; members of sensitive groups may
                    experience more serious health effects.</span>
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
            5-Day Weather Forecast
          </v-card-title>
          <v-card-text>
            <v-list-item-group>
      
              <div v-if="!fiveDayForecast || fiveDayForecast.length === 0">
                <span style="color: lightgray; font-size: 15px; margin-left: 28%;">Loading forecast data...</span>
              </div>

              <!-- Display Forecast -->
              <v-list-item v-for="(day, index) in fiveDayForecast" :key="index" v-else>
                <v-list-item-content>
                  <v-list-item-title>
                    <div class="d-flex justify-space-between align-center">
                      <span style="color: gray">{{ day.date }}</span>
                      <img :src="day.icon" alt="Weather Icon" style="width: 40px; height: 40px; margin-right: 8px;" />
                      <span class="ml" style="font-size: 20px;"><strong>{{ day.temperature }}°{{ formattedTemperature }}
                          <span v-if="unitsStore.tempUnit === 'C'">C</span>
                          <span v-if="unitsStore.tempUnit === 'F'">F</span></strong></span>
                    </div>
                  </v-list-item-title>
                </v-list-item-content>
                <v-divider v-if="index < fiveDayForecast.length - 1" style="margin: 20px 0;"></v-divider>
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
                <span class="sunrise-time">{{ currentWeather.sunrise }}</span>
              </div>

              <div class="sunset text-left">
                <v-icon class="sun-icon">mdi-weather-sunset</v-icon>
                <span class="sunset-label">Sunset</span>
                <span class="sunset-time">{{ currentWeather.sunset }}</span>
              </div>
            </div>
          </v-card-text>
        </v-card>

        <!-- Qoute Carddddd -->
        <v-card class="quote-card text-white mt-8 mb-16" height="350px" style="display: flex; justify-content: center; align-items: center; background-color:#2a2e3b; border-radius: 30px;">
          <div class="weather-quote" style="text-align: center; padding: 30px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <!-- Author image (circle style) -->
            <img :src="currentQuoteImage" alt="Author" style="border-radius: 50%; width: 100px; height: 100px; margin-bottom: 10px; object-fit: cover;" />
                
                <!-- Quote -->
            <blockquote style="margin: 0; font-style: italic; font-size: 22px; line-height: 1.5;">
              <p><strong style="font-size: 20px;">"{{ currentQuote }}"</strong></p>
            </blockquote>
                
                <!-- Author's name -->
            <footer class="text-right mt-5" style="font-size: 18px; color: #ddd;">
              — {{ currentAuthor }}
            </footer>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import supabase from '@/utils/supabase';
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { fetchWeather, fetchForecast } from '@/utils/useWeather';
import { useUnitsStore } from '@/stores/unit';

const currentUserId = ref(null)
const currentQuote = ref('');
const currentAuthor = ref('');
const currentQuoteImage = ref('');
let quoteTimer = null;
let index = 0;

const currentWeather = ref({ condition: 'Loading weather...' });
const hourlyForecast = ref([]);
const airQuality = ref({ status: 'Good', pm25: 15 });
const activitySuggestions = ref([]);

const unitsStore = useUnitsStore();



const temperatureDisplay = computed(() => {
  return unitsStore.tempUnit === 'C'
    ? `${currentWeather.value.temperature}°C`
    : `${(currentWeather.value.temperature * 9) / 5 + 32}°F`;
});


const setPressureUnit = computed(() => {
  return unitsStore.pressureUnit === 'hPa'
    ? ' hPa'
    : ' mmHg';
});


const weather = ref({
  feelsLike: 0,
  uvIndex: 0,
  humidity: 0,
  pressure: 0,
  precipitation: 0,
  windSpeed: 0,
  visibility: 0,
  clouds: 0,
  sunrise: '',
  sunset: '',
  condition: '',
  icon: '',
});

const fiveDayForecast = ref([]);
const defaultCity = ref('');


// Fetch authenticated user ID
const fetchAuthenticatedUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }

  return user.id;
};

// Fetch default city for the logged-in user
const fetchDefaultCityFromSupabase = async () => {
  try {
    const { data, error } = await supabase
      .from('user_locations')
      .select('location_id')
      .eq('user_id', currentUserId.value)
      .eq('is_default', true)
      .single();

    if (error || !data) {
      console.warn('No default city found. Using fallback.');
      return 'Butuan City'; 
    }

    // Fetch city name from the locations table
    const { data: locationData, error: locationError } = await supabase
      .from('locations')
      .select('city')
      .eq('id', data.location_id)
      .single();

    if (locationError) {
      console.warn('Error fetching city name:', locationError);
      return 'Butuan City';
    }

    return locationData?.city || 'Butuan City';
  } catch (err) {
    console.error('Error fetching default city from Supabase:', err);
    return 'Butuan City'; 
  }
};

// Save default city for the logged-in user
const saveDefaultCityToSupabase = async (city) => {
  try {
    // Fetch the location ID for the given city
    const { data: locationData, error: locationError } = await supabase
      .from('locations')
      .select('id')
      .eq('city', city)
      .single();

    if (locationError) {
      console.error('Error finding location:', locationError);
      return;
    }

    const locationId = locationData?.id;

    if (!locationId) {
      console.warn('Location ID not found for city:', city);
      return;
    }

    // Save user-specific default city 
    const { error: saveError } = await supabase
      .from('user_locations')
      .upsert({
        user_id: currentUserId.value,
        location_id: locationId,
        is_default: true,
      });

    if (saveError) {
      console.error('Error saving default city:', saveError);
    } else {
      console.log('Default city saved:', city);
    }
  } catch (err) {
    console.error('Error saving default city:', err);
  }
};


// Function to load weather and air quality data
const loadWeatherData = async () => {
  try {
    console.log(`Fetching weather data for: ${defaultCity.value}`);

    // Fetch current weather
    const weatherData = await fetchWeather(defaultCity.value);
    currentWeather.value = weatherData;


    // Fetch forecast data
    const forecast = await fetchForecast(defaultCity.value);
    hourlyForecast.value = forecast.hourlyForecast;
    fiveDayForecast.value = forecast.fiveDayForecast;


    airQuality.value.pm25 = weatherData.pm25 || 15;
    airQuality.value.status = determineAirQualityStatus(airQuality.value.pm25);


    console.log('Air Quality:', airQuality.value);

    console.log('Current Weather:', currentWeather.value);
    console.log('Hourly Forecast:', hourlyForecast.value);
    console.log('5-Day Forecast:', fiveDayForecast.value);

    loadActivitiesBasedOnWeather();
  } catch (error) {
    console.error('Error loading weather data:', error);
  }
};


const determineAirQualityStatus = (pm25) => {
  if (pm25 <= 50) {
    return 'Good';
  } else if (pm25 <= 100) {
    return 'Moderate';
  } else if (pm25 <= 150) {
    return 'Unhealthy for Sensitive Groups';
  } else if (pm25 <= 200) {
    return 'Unhealthy';
  } else if (pm25 <= 300) {
    return 'Very Unhealthy';
  } else {
    return 'Hazardous';
  }
};

// Function to load activity suggestions based on weather condition
const loadActivitiesBasedOnWeather = () => {
  const condition = currentWeather.value.condition.toLowerCase();

  // Log the condition for debugging
  console.log(`Weather Condition: ${condition}`);

  // Clear or sunny weather
  if (condition.includes('clear') || condition.includes('sunny')) {
    activitySuggestions.value = [
      { title: 'Go Hiking', description: 'Explore scenic trails and enjoy nature.', color: '#FFEB3B', icon: '/imgs/hiking.png' },
      { title: 'Outdoor Picnic', description: 'Have a relaxing day at the park with family or friends.', color: '#FF9800', icon: '/imgs/picnic.png' },
      { title: 'Bike Ride', description: 'Go for a refreshing bike ride to nearby attractions.', color: '#4CAF50', icon: '/imgs/bike.png' },
      { title: 'Photography Walk', description: 'Capture the beauty of a sunny day with your camera.', color: '#FFC107', icon: '/imgs/photograph.png' },
    ];
  }
  // Rain-related conditions (rain, drizzle, overcast, etc.)
  else if (
    condition.includes('rain') ||
    condition.includes('drizzle') ||
    condition.includes('showers') ||
    condition.includes('overcast') ||
    condition.includes('cloud')
  ) {
    activitySuggestions.value = [
      { title: 'Carry an Umbrella', description: 'Be prepared for the rain by bringing an umbrella.', color: '#2196F3', icon: '/imgs/umbrellaa.png' },
      { title: 'Drink Coffee', description: 'Warm yourself up with a comforting cup of coffee.', color: '#795548', icon: '/imgs/coffee.png' },
      { title: 'Watch a Movie', description: 'Enjoy a cozy indoor movie marathon.', color: '#607D8B', icon: '/imgs/movie.png' },
      { title: 'Bake Some Treats', description: 'Try baking cookies or a cake at home.', color: '#FF5722', icon: '/imgs/bake.png' },
      { title: 'Indoor Gardening', description: 'Spruce up your indoor space with some plants.', color: '#8BC34A', icon: '/imgs/gardening.png' },
      { title: 'Play Board Games', description: 'Have fun playing classic board games with family.', color: '#3F51B5', icon: '/imgs/games.png' },
    ];
  }
  // Storm-related conditions (thunderstorm, lightning, etc.)
  else if (
    condition.includes('storm') ||
    condition.includes('thunder') ||
    condition.includes('lightning')
  ) {
    activitySuggestions.value = [
      { title: 'Stay Safe Indoors', description: 'Stay indoors and avoid venturing out during the storm.', color: '#FF0000', icon: '/imgs/safety.png' },
      { title: 'Avoid Electrical Appliances', description: 'Unplug sensitive devices and avoid using electrical items.', color: '#FFC107', icon: '/imgs/electric.png' },
      { title: 'Listen to Weather Updates', description: 'Stay informed by tuning in to weather updates.', color: '#03A9F4', icon: '/imgs/update.png' },
      { title: 'Prepare an Emergency Kit', description: 'Keep essentials like water, flashlights, and first aid ready.', color: '#4CAF50', icon: '/imgs/emergency.png' },
      { title: 'Backup Power Sources', description: 'Charge all devices and keep portable power banks ready.', color: '#9E9E9E', icon: '/imgs/charge.png' },
    ];
  }
  // Snow-related conditions
  else if (condition.includes('snow') || condition.includes('sleet')) {
    activitySuggestions.value = [
      { title: 'Build a Snowman', description: 'Have fun sculpting a snowman with friends.', color: '#00BCD4', icon: '/imgs/snowman.png' },
      { title: 'Hot Cocoa Night', description: 'Warm up with a cup of hot cocoa by the fire.', color: '#795548', icon: '/imgs/cocoa.png' },
      { title: 'Snowball Fight', description: 'Enjoy a playful snowball fight outdoors.', color: '#3F51B5', icon: '/imgs/snowball.png' },
      { title: 'Winter Photography', description: 'Capture stunning photos of snow-covered scenery.', color: '#E91E63', icon: '/imgs/photograph.png' },
    ];
  }
  // Default (foggy, mist, hazy, or unclassified weather)
  else {
    activitySuggestions.value = [
      { title: 'Read a Book', description: 'Immerse yourself in a good book.', color: '#5C6BC0', icon: '/imgs/read.png' },
      { title: 'Meditate', description: 'Take a moment to focus on your breathing and relax.', color: '#9C27B0', icon: '/imgs/meditate.png' },
      { title: 'Home Workout', description: 'Stay active with an indoor workout session.', color: '#F44336', icon: '/imgs/workout.png' },
      { title: 'Learn a New Recipe', description: 'Experiment in the kitchen with a new dish.', color: '#FF9800', icon: '/imgs/recipe.png' },
    ];
  }

  // Log suggestions for debugging
  console.log('Activity Suggestions:', activitySuggestions.value);
};

// Quotes logic
const quotes = ref([
  { text: "There’s no such thing as bad weather, only inappropriate clothing.", author: "Sir Ranulph Fiennes", image: "/imgs/ranulph.jpg" },
  { text: "The sun is a daily reminder that we too can rise again from the darkness.", author: "Unknown", image: "/imgs/unknown.jpg" },
  { text: "It is not the strongest of the species that survive, nor the most intelligent, but the one most responsive to change.", author: "Charles Darwin", image: "/imgs/darwin.jpg" },
  { text: "The earth has music for those who listen.", author: "George Santayana", image: "/imgs/George.jpg" },
  { text: "In every walk with nature, one receives far more than he seeks.", author: "John Muir", image: "/imgs/john.jpg" },
  { text: "A little rain each day will quench the drought.", author: "Anonymous", image: "/imgs/anonymous.jpg" },
  { text: "Sunshine is delicious, rain is refreshing, wind braces us up, snow is exhilarating; there’s really no such thing as bad weather, only different kinds of good weather.", author: "John Ruskin", image: "/imgs/john-ruskin.jpg" },
  { text: "Every storm runs out of rain.", author: "Maya Angelou", image: "/imgs/maya.jpg" },
  { text: "In the midst of winter, I found there was, within me, an invincible summer.", author: "Albert Camus", image: "/imgs/albert-camus.jpg" },
  { text: "The sky is the daily bread of the eyes.", author: "Ralph Waldo Emerson", image: "/imgs/emerson.jpg" },
  { text: "Weather is a great metaphor for life—sometimes it's good, sometimes it's bad, and there's nothing much you can do about it but carry an umbrella.", author: "Terry Pratchett", image: "/imgs/terry.jpg" },
  { text: "If you don't like the weather in New England, just wait a few minutes.", author: "Mark Twain", image: "/imgs/mark.jpg" },
  { text: "The best time to plant a tree was twenty years ago. The second best time is now.", author: "Chinese Proverb", image: "/imgs/chinese.jpg" },
  { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein", image: "/imgs/albert.jpg" },
  { text: "Rain is not a period of despair. It is a symbol of life.", author: "Unknown", image: "/imgs/unknown.jpg" },
  { text: "A change in the weather is sufficient to recreate the world and ourselves.", author: "Marcel Proust", image: "/imgs/marcel.jpg" },
  { text: "To appreciate the beauty of a snowflake, it is necessary to stand out in the cold.", author: "Aristotle", image: "/imgs/aristotle.jpg" }
]);

const updateQuote = () => {
  const quote = quotes.value[index];
  currentQuote.value = quote.text;
  currentAuthor.value = quote.author;
  currentQuoteImage.value = quote.image;

  index = (index + 1) % quotes.value.length;
};

onMounted(async () => {
  currentUserId.value = await fetchAuthenticatedUser();
  if (!currentUserId.value) {
    console.error('No user logged in. Default settings applied.');
    defaultCity.value = 'Butuan City';
    return;
  }

  defaultCity.value = await fetchDefaultCityFromSupabase();
  console.log(`Fetched default city: ${defaultCity.value}`);
  
  unitsStore.loadUnitsFromLocalStorage();
  loadWeatherData();

  
  updateQuote();
  quoteTimer = setInterval(updateQuote, 5000); 
});

onBeforeUnmount(() => {
  clearInterval(quoteTimer); 
});

</script>



<style scoped>
@media (max-width: 600px) {
  .temp-font {
    font-size: 55px !important;
  }

  .desc {
    font-size: 11.5px;
  }

  .temperature-value {
    font-size: 18px !important
  }

  .weather-icon img {
    width: 148px !important;
    height: auto !important;
  }

  .d-flex {
    margin-left: 0 !important;
  }

  .d-flex1 {
    margin-left: 0 !important;
  }

  blockquote {
    margin-top: 10px;
    font-size: 1.1rem !important;
  }
}

.forecast-item-btn {
  color: white;
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

.d-flex {
  margin-left: 10px;
}

.d-flex1 {
  margin-left: 80px;
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