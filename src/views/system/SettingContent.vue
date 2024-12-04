<template>
  <v-container class="setting-container text-white mb-16">
    <v-card class="units-cards text-white" height="520px"
      style="background-color:#2a2e3b; border-radius: 20px; padding: 8px;">
      <v-card-title style="font-weight: bolder; padding-top:30px; padding-left: 30px;">Units</v-card-title>
      <v-card-text>
        <!-- Temperature -->
        <v-row>
          <v-text class=". mt-5" style="padding: 20px; color: gray;">Temperature</v-text>
        </v-row>
        <v-card class="switch">
          <v-row>
            <v-col>
              <v-btn block class="switch-btn" :color="unitsStore.tempUnit === 'C' ? '#2a2e3b' : '#191d2c'"
                @click="unitsStore.setTemperatureUnit('C')">Celsius</v-btn>
            </v-col>
            <v-divider vertical style="width: 1px;background-color: #4c4949;"></v-divider>
            <v-col>
              <v-btn block class="switch-btn" :color="unitsStore.tempUnit === 'F' ? '#2a2e3b' : '#191d2c'"
                @click="unitsStore.setTemperatureUnit('F')">Fahrenheit</v-btn>
            </v-col>
          </v-row>
        </v-card>


        <!-- Pressure -->
        <v-row>
          <v-text class=". mt-8" style="padding: 20px; color: gray;">Pressure</v-text>
        </v-row>
        <v-card class="switch">
          <v-row>
            <v-col>
              <v-btn block class="switch-btn" :color="unitsStore.pressureUnit === 'hPa' ? '#2a2e3b' : '#191d2c'"
                @click="unitsStore.setPressureUnit('hPa')">hPa</v-btn>
            </v-col>
            <v-divider vertical style="width: 1px;background-color: #4c4949;"></v-divider>
            <v-col>
              <v-btn block class="switch-btn" :color="unitsStore.pressureUnit === 'mmHg' ? '#2a2e3b' : '#191d2c'"
                @click="unitsStore.setPressureUnit('mmHg')">mmHg</v-btn>
            </v-col>
          </v-row>
        </v-card>

        <!-- Precipitation -->
        <v-row>
          <v-text class=". mt-8" style="padding: 20px; color: gray;">Precipitation</v-text>
        </v-row>
        <v-card class="switch">
          <v-row>
            <v-col>
              <v-btn block class="switch-btn"
                :color="unitsStore.precipitationUnit === 'mm' ? '#2a2e3b' : '#191d2c'"
                @click="unitsStore.setPrecipitationUnit('mm')">
                Millimeters
              </v-btn>
            </v-col>
            <v-divider vertical style="width: 1px;background-color: #4c4949;"></v-divider>
            <v-col>
              <v-btn block class="switch-btn" :color="unitsStore.precipitationUnit === 'inches' ? '#2a2e3b' : '#191d2c'"
                @click="unitsStore.setPrecipitationUnit('inches')">
                Inches
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-card-text>
    </v-card>

    <!-- Logout Card -->
    <v-card class="logout-card text-white mt-5" style="background-color:#2a2e3b; border-radius: 20px; padding: 20px;"
      @click="onLogout" :loading="formAction.formProcess" :disabled="formAction.formProcess">
      <v-row align="center" class="d-flex">
        <v-col cols="auto" class="d-flex align-center">
          <v-card-title class="logout-header" style="font-size: 18px; font-weight: bolder;">Logout</v-card-title>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto" class="d-flex justify-end pe-3">
          <v-icon size="24">mdi-logout</v-icon>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
import { useUnitsStore } from '@/stores/unit';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { supabase, formActionDefault } from '@/utils/supabase';

const unitsStore = useUnitsStore();


// Logout function
const router = useRouter();
const formAction = ref({ ...formActionDefault });

const onLogout = async () => {
  formAction.value.formProcess = true;
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error during logout:', error.message);
    formAction.value.formProcess = false;
    return;
  }
  formAction.value.formProcess = false;
  router.replace('/');
};
</script>

<style scoped>
  .setting-container{
    margin-top: -30px;
    margin-left: 0px;
  }
  .switch {
   background-color:#191d2c;
   margin-left: 0px;
   border-radius: 15px;
   padding-right: 10px;
  }
  .switch-btn{
    border-radius: 10px; 
    margin: 5px;
    font-size: 12.5px;
    font-weight: bold;
  }

.logout-icon-link {
  color: white;
  text-decoration: none;
}
 
</style>
