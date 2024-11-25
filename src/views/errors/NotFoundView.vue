<script setup>
import { isAuthenticated } from '@/utils/supabase';
import { onMounted, ref } from 'vue'


// Load Variables
const isLoggedIn = ref(false)

// Get Authentication status from supabase
const getLoggedStatus = async () => {
  isLoggedIn.value = await isAuthenticated()
}

// Load Functions during component rendering
onMounted(() => {
  getLoggedStatus()
})
</script>
<template>
  <v-row class="error-page ">
    <v-card class="notfound-card text-white pt-16" style="background-color:#2a2e3b;  height: 100vh;">

      <v-col class="mx-auto mt-16 text-center pt-10" cols="12" lg="4">
        <h1 class="text-h1 font-weight-black" style="color: #FFB300;">404</h1>
        <h2 class="text-h2 font-weight-black mb-2">Page Not Found</h2>

        <p class="text-subtitle-1 font-weight-bold mb-4">Page does not exist.</p>

        <v-btn class="mt-2" color="#212121" prepend-icon="mdi-home" to="/dashboard/home">
          Back to {{ isLoggedIn ? 'Dashboard' : 'Homepage' }}
        </v-btn>
      </v-col>
    </v-card>

  </v-row>
</template>

  <style>
    .notfound-card{
      width: 100%;
    }
  </style>