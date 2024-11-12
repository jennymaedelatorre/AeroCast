// main.js

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import 'leaflet/dist/leaflet.css';

// Vuetify imports
import '@mdi/font/css/materialdesignicons.css';
import '@fortawesome/fontawesome-free/css/all.css'; // Font Awesome
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, fa } from 'vuetify/iconsets/fa'; // Font Awesome icon set
import { mdi } from 'vuetify/iconsets/mdi';         // Material Design Icons

import App from './App.vue';
import router from './router';

const app = createApp(App);

// Create Vuetify instance with both Font Awesome and Material Design Icons
const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',  // Sets the default icon set to Material Design
    aliases,
    sets: {
      mdi,              // Material Design Icons
      fa,               // Font Awesome
    },
  },
  components,
  directives,
});

const pinia = createPinia();

app.use(pinia); // Use Pinia for state management
app.use(router);
app.use(vuetify);

app.mount('#app');
