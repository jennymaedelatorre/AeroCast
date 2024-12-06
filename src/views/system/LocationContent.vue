<template>
  <v-container fluid class="text-white mb-16" style="margin-top: -20px;">
    <v-row>
      <v-col cols="12" lg="8">
        <!-- Search Bar -->
        <v-text-field v-model="searchQuery" label="Search for Cities" filled dense rounded solo flat background-color="grey lighten-3"
          append-inner-icon="mdi-magnify" @click:append="onSearchClick"></v-text-field>

        <!-- Add City Button and Dialog -->
        <v-btn color="primary" class="add-city mb-5" @click="dialog = true">
          Add City
        </v-btn>

        <!-- Success Alert -->
        <v-alert v-if="successAlert" type="success" dismissible class="mt-4" transition="slide-x-reverse-transition">
          {{ successMessage }}
        </v-alert>

        <!-- Error Alert -->
        <v-alert v-if="errorAlert" type="error" dismissible class="mt-4" transition="slide-x-reverse-transition">
          <p>The city you entered could not be found. Please try again with a valid city name.</p>
        </v-alert>

        <!-- Dialog for Adding a New City -->
        <v-dialog v-model="dialog" max-width="400px">
          <v-card
            style="background-color: #2a2e3b; height:500px; color:#fff; font-weight: bold; padding: 20px; border-radius: 20px; font-family: 'Times New Roman', Times, serif;">
            <v-card-title>
              <v-icon left color="white">mdi-map-plus</v-icon>
              <span> Add New City</span>
            </v-card-title>

            <v-card-text>
              <!-- Error Alert (only shown if city is invalid) -->
              <v-alert v-if="cityNotFound" type="error" dismissible>
                The city you entered could not be found. Please try again with a valid city name.
              </v-alert>

              <v-text-field v-model="newCityName" label="Enter City Name" outlined dense></v-text-field>
            </v-card-text>

            <v-card-actions>
              <v-btn color="white" text @click="handleAddCity">Add</v-btn>
              <v-btn color="red" text @click="dialog = false">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Modal for displaying alert when city is invalid -->
        <v-dialog v-model="isModalVisible" max-width="400px">
          <v-card class=""
            style="background-color: #2a2e3b; height:500px; color:#fff; font-weight: bold; padding: 20px; border-radius: 20px; font-family: 'Times New Roman', Times, serif;">
            <v-card-title class="error-title ">
              <v-icon left color="red">mdi-alert-circle</v-icon>
              Invalid City
            </v-card-title>
            <v-card-text>
              <p>The city you entered could not be found. Please try again with a valid city name.</p>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" text @click="closeModal">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Modal for successful city deletion -->
        <v-dialog v-model="isDeleteModalVisible" max-width="400px">
          <v-card
            style="background-color: #2a2e3b; height:300px; color:#fff; font-weight: bold; padding: 20px; border-radius: 20px; font-family: 'Times New Roman', Times, serif;">
            <v-card-title>
              <v-icon left color="green">mdi-check-circle</v-icon>
              City Deleted Successfully
            </v-card-title>
            <v-card-text>
              <p>{{ successMessage }}</p>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" text @click="closeDeleteModal">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- City Cards (Dynamic Generation) -->
        <v-card v-for="(city, index) in items" :key="index" class="city-card text-white mt-5" :style="{
          ...activeCardStyle(city.title),
          height: '250px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '30px',
          border: city.isDefault ? '3px solid gold' : selectedCity === city.title ? '2px solid white' : 'none'
        }">
          <v-col class="weather-icon text-left ms-5 d-flex" style="display: flex; align-items: center;">
            <div style="display: flex; flex-direction: column; align-items: center; padding-left: 30px; padding-top: 20px;">
              <img :src="cityWeather[city.title]?.icon || 'default-icon.png'" alt="" width="120" />
              <p
                v-if="!cityWeather[city.title]?.condition"
                style="color: lightgray; font-size: 14px; margin-top: 10px;"
              >
                Loading weather condition...
              </p>
              <p
                v-else
                style="color: lightgray; font-size: 14px; margin-top: 10px;"
              >
                {{ cityWeather[city.title]?.condition }}
              </p>
            </div>
            <div class="ms-8" style="flex: 1;">
              <h2>{{ city.title }}</h2>
              <p>{{ city.description }}</p>
            </div>
          </v-col>

          <v-col class="text-right" style="margin-right: 30px;">
            <h2 class="temperature mb-3" style="font-size: 50px;">
              {{ cityWeather[city.title]?.temperature || 'loading...' }}°C
            </h2>
            <v-btn color="primary" rounded @click="setDefaultCity(city.title)" class="see-more">
              <h4 style="font-size: 11px;">Set default</h4>
            </v-btn>
            <v-btn color="red" rounded @click="deleteCity(city.title)" class="delete-city" style="margin-left: 10px;">
              <h4 style="font-size: 10px;">Delete</h4>
            </v-btn>
          </v-col>
        </v-card>


      </v-col>

      <!-- Right Section: Selected City Details -->
      <v-col cols="12" lg="4">
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
import supabase from '@/utils/supabase';
import { fetchWeather, fetchForecast } from '@/utils/useWeather';
import { useUnitsStore } from '@/stores/unit';

export default {
    name: 'LocationContent',
  data() {
    return {
      successMessage: '',
      errorMessage: '',
      successAlert: false,
      errorAlert: false,
      items: [],
      selectedCity: null,
      cityWeather: {},
      hourlyForecast: [],
      threeDayForecast: [],
      isLoading: true,
      error: null,
      dialog: false,
      newCityName: '',
      cityNotFound: false,
      isModalVisible: false,
      isDeleteModalVisible: false,
      searchQuery:'',
    };
  },
  computed: {
    filteredItems(){
      if (!this.searchQuery.trim()) {
        return this.items; // Show all cities if search query is empty
      }

      const query = this.searchQuery.toLowerCase();
      return this.items.filter(city => city.title.toLowerCase().startsWith(query));
    },
  },


  async mounted() {
    this.unitsStore = useUnitsStore();
    this.unitsStore.loadUnitsFromLocalStorage();

    // Fetch cities from Supabase
    await this.fetchCitiesFromSupabase();
    await this.fetchDefaultCity();

    // Fetch weather data for each city
    this.items.forEach((city) => {
      const cityName = city.title;
      this.cityWeather[cityName] = { temperature: null, condition: '', icon: '', description: '' };
      this.fetchWeather(cityName);
      this.fetchForecast(cityName);
    });

    this.isLoading = false;
  },

  methods: {
    closeModal() {
      this.isModalVisible = false;
      this.errorAlert = false;
      this.cityNotFound = false;
    },

    closeDeleteModal() {
      this.isDeleteModalVisible = false;
    },

    async fetchCitiesFromSupabase() {
      try {
        this.isLoading = true;

        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) throw new Error('User not authenticated');

        // Fetch user-specific locations
        const { data: userLocations, error: userLocationsError } = await supabase
          .from('user_locations')
          .select('location_id (city)')
          .eq('user_id', user.id);

        if (userLocationsError) throw new Error(`Error fetching user locations: ${userLocationsError.message}`);

        // Fetch default locations
        const { data: defaultLocations, error: defaultLocationsError } = await supabase
          .from('locations')
          .select('city')
          .eq('is_default', true); 

        if (defaultLocationsError) throw new Error(`Error fetching default locations: ${defaultLocationsError.message}`);

        // Combine user-specific and default locations
        const allLocations = [
          ...userLocations.map((entry) => ({ title: entry.location_id.city })),
          ...defaultLocations.map((entry) => ({ title: entry.city }))
        ];

        // Remove duplicates (if any)
        this.items = allLocations.filter(
          (value, index, self) => self.findIndex((v) => v.title === value.title) === index
        );
      } catch (err) {
        console.error(err.message);
        this.error = err.message;
      } finally {
        this.isLoading = false;
      }
    },

    async handleAddCity() {
      if (!this.newCityName.trim()) return;

      try {
        const weatherData = await fetchWeather(this.newCityName);

        if (!weatherData || !weatherData.temperature) {
          throw new Error('City not found');
        }

        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) throw new Error('User not authenticated');

        // Insert city into the locations table with is_default: false
        const { data: locationData, error: locationError } = await supabase
          .from('locations')
          .insert([{ city: this.newCityName, is_default: false }]) 
          .select('id');

        if (locationError) throw new Error(locationError.message);

        const locationId = locationData[0].id;

        // Link the city to the user in the user_locations table
        const { error: linkError } = await supabase
          .from('user_locations')
          .insert([{ user_id: user.id, location_id: locationId }]);

        if (linkError) throw new Error(linkError.message);

        this.items.push({ title: this.newCityName });
        this.cityWeather[this.newCityName] = weatherData;
        this.newCityName = '';
        this.dialog = false;
        this.cityNotFound = false;

        this.successMessage = 'City added successfully!';
        this.successAlert = true;

        setTimeout(() => {
          this.successAlert = false;
        }, 3000);
      } catch (err) {
        console.error(err.message);
        if (err.message === 'City not found') {
          this.cityNotFound = true;
          this.errorMessage = 'The city you entered could not be found. Please try again with a valid city name.';
          this.errorAlert = true;

          this.isModalVisible = true;
          setTimeout(() => {
            this.errorAlert = false;
            this.cityNotFound = false;
            this.isModalVisible = false;
          }, 3000);
        } else {
          this.errorMessage = err.message;
          this.errorAlert = true;
          this.isModalVisible = true;
        }
      }
    },

    async deleteCity(cityName) {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) throw new Error('User not authenticated');

        const { data: locationData, error: locationError } = await supabase
          .from('locations')
          .select('id')
          .eq('city', cityName);

        if (locationError || locationData.length === 0) throw new Error('City not found');

        const locationId = locationData[0].id;

        const { error: deleteError } = await supabase
          .from('user_locations')
          .delete()
          .match({ user_id: user.id, location_id: locationId });

        if (deleteError) throw new Error(deleteError.message);

        this.items = this.items.filter((city) => city.title !== cityName);
        delete this.cityWeather[cityName];
        if (this.selectedCity === cityName) {
          this.selectedCity = this.items.length > 0 ? this.items[0].title : null;
        }

        this.isDeleteModalVisible = true;
        this.successAlert = true;
        this.successMessage = `${cityName} has been successfully deleted!`;

        setTimeout(() => {
          this.isDeleteModalVisible = false;
          this.successAlert = false;
        }, 3000);
      } catch (err) {
        console.error(err.message);
      }
    },

    async setDefaultCity(cityName) {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error('User not authenticated');

    const { data: locationData, error: locationError } = await supabase
      .from('locations')
      .select('id')
      .eq('city', cityName)
      .single();

    if (locationError || !locationData) throw new Error('City not found');

    const locationId = locationData.id;

    // Remove existing default
    const { error: resetError } = await supabase
      .from('user_locations')
      .update({ is_default: false })
      .eq('user_id', user.id)
      .eq('is_default', true);

    if (resetError) throw new Error('Failed to reset existing default city');

    // Set the new default city
    const { error: setDefaultError } = await supabase
      .from('user_locations')
      .update({ is_default: true })
      .match({ user_id: user.id, location_id: locationId });

    if (setDefaultError) throw new Error('Failed to set default city');

    this.selectedCity = cityName; // Update the local state
    this.successMessage = `${cityName} has been set as your default city!`;
    this.successAlert = true;

    setTimeout(() => {
      this.successAlert = false;
    }, 3000);
  } catch (err) {
    console.error(err.message);
    this.errorAlert = true;
    this.errorMessage = err.message;
    setTimeout(() => {
      this.errorAlert = false;
    }, 3000);
  }
},


async fetchDefaultCity() {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error('User not authenticated');

    // Query the user's default city
    const { data: defaultCity, error: defaultCityError } = await supabase
      .from('user_locations')
      .select('location_id (city)')
      .eq('user_id', user.id)
      .eq('is_default', true)
      .single();

    if (defaultCityError || !defaultCity) {
      console.warn('No default city found, selecting the first available city.');
      if (this.items.length > 0) this.selectedCity = this.items[0].title;
      return;
    }

    // Set the default city
    this.selectedCity = defaultCity.location_id.city;
    this.fetchWeather(this.selectedCity);
    this.fetchForecast(this.selectedCity);
  } catch (error) {
    console.error('Error fetching default city:', error);
  }
},



    async fetchWeather(city) {
      try {
        const weatherData = await fetchWeather(city);
        if (!weatherData || !weatherData.temperature) {
          throw new Error(`Weather data for ${city} not found`);
        }
        this.cityWeather[city] = weatherData;
        if (!this.selectedCity) {
          this.selectedCity = city;
        }
      } catch (error) {
        console.error(`Error fetching weather for ${city}:`, error);
        this.cityNotFound = true;
        this.errorMessage = 'The city you entered could not be found. Please try again with a valid city name.';
        this.errorAlert = true;
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
  .ms-8 h2 {
    margin-left: -10px;
  }

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

  .add-city {
    font-size: 10px !important;
    font-weight: bold;
  }

  .desc {
    font-size: 11.5px !important;
  }

  .see-more {
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