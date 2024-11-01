<!-- <script setup>
 import { isAuthenticated } from '@/utils/supabase '
 import ProfileHeader from './ProfileHeader.vue'
 import { useDisplay } from 'vuetify'
 import { ref } from 'vue'
 
const theme = ref('light')

function onClick () {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

// Utilize pre-defined vue functions
const { mobile } = useDisplay()
const theme = ref(localStorage.getItem('theme') ?? 'light')

// Load Variables
const isLoggedIn = ref(false)

//  Toggle Theme
const onToggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', theme.value)
}

// Get Authentication status from supabase
const getLoggedStatus = async () => {
  isLoggedIn.value = await isAuthenticated()
}

// Load Functions during component rendering
onMounted(() => {
  getLoggedStatus()
})

</script> -->

<template>
  <v-responsive class="border rounded">
    <v-app>
      <!-- <v-app-bar class="px-3">
        <v-spacer></v-spacer>

        <v-btn :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'" text="Toggle Theme" slim
          @click="onClick"></v-btn>

          <ProfileHeader v-if='isLoggedIn'></ProfileHeader>
      </v-app-bar> -->

      <slot name="navigation"></slot>

      <v-main>
        <v-container class="full-height mt-16 mb-15" fluid>
            <slot name="login_reg"></slot>
        </v-container>
      </v-main>

      <!-- <v-footer border app>2024 - AeroCast</v-footer> -->
    </v-app>
  </v-responsive>
</template>