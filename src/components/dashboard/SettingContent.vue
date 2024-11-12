<template>
  <v-container class="text-white">
    <v-card class="units-cards text-white" height="auto" style="background-color:#2a2e3b; border-radius: 30px; padding: 20px;"> 
      <v-card-title>Units</v-card-title>         
      <v-card-text>
          <!-- Temperature -->
          <v-row>
            <v-text class="." style="margin-left: 20px; padding: 20px; color:gray;">Temperature</v-text>
          </v-row>
          <v-card class="switch">
            <v-row v-model="value" active>
              <v-col>
                <v-btn block class="switch-btn"
                  :color="unitsStore.tempUnit === 'C' ? '#2a2e3b' : '#191d2c'" 
                  @click="unitsStore.setTempUnit('C')">Celsius</v-btn>
              </v-col>
              <v-divider vertical style="width: 1px;background-color: #4c4949;"></v-divider>
              <v-col>
                <v-btn block class="switch-btn"
                  :color="unitsStore.tempUnit === 'F' ? '#2a2e3b' : '#191d2c'" 
                  @click="unitsStore.setTempUnit('F')">Fahrenheit</v-btn>
              </v-col>
            </v-row>
          </v-card>

          <!-- Wind Speed -->
          <v-row>
            <v-text class="." style="margin-left: 20px; padding: 20px; color:gray;">Wind Speed</v-text>
          </v-row>
          <v-card class="switch">
            <v-row>
              <v-col>
                <v-btn block class="switch-btn"
                  :color="unitsStore.windSpeedUnit === 'km/h' ? '#2a2e3b' : '#191d2c'" 
                  @click="unitsStore.setWindSpeedUnit('km/h')">km/h</v-btn>
              </v-col>
              <v-divider vertical style="width: 1px;background-color: #4c4949;"></v-divider>
              <v-col>
                <v-btn block class="switch-btn"
                  :color="unitsStore.windSpeedUnit === 'm/s' ? '#2a2e3b' : '#191d2c'" 
                  @click="unitsStore.setWindSpeedUnit('m/s')">m/s</v-btn>
              </v-col>
              <v-divider vertical style="width: 1px;background-color: #4c4949;"></v-divider>
              <v-col>
                <v-btn block class="switch-btn"
                  :color="unitsStore.windSpeedUnit === 'knots' ? '#2a2e3b' : '#191d2c'" 
                  @click="unitsStore.setWindSpeedUnit('knots')">Knots</v-btn>
              </v-col>
            </v-row>
          </v-card>

          <!-- Pressure -->
          <v-row>
            <v-text class="." style="margin-left: 20px; padding: 20px; color:gray;">Pressure</v-text>
          </v-row>
          <v-card class="switch">
            <v-row>
              <v-col>
                <v-btn block class="switch-btn"
                  :color="unitsStore.pressureUnit === 'hPa' ? '#2a2e3b' : '#191d2c'" 
                  @click="unitsStore.setPressureUnit('hPa')">hPa</v-btn>
              </v-col>
              <v-divider vertical style="width: 1px;background-color: #4c4949;"></v-divider>
              <v-col>
                <v-btn block class="switch-btn"
                  :color="unitsStore.pressureUnit === 'inches' ? '#2a2e3b' : '#191d2c'" 
                  @click="unitsStore.setPressureUnit('inches')">Inches</v-btn>
              </v-col>
              <v-divider vertical style="width: 1px;background-color: #4c4949;"></v-divider>
              <v-col>
                <v-btn block class="switch-btn"
                  :color="unitsStore.pressureUnit === 'kPa' ? '#2a2e3b' : '#191d2c'" 
                  @click="unitsStore.setPressureUnit('kPa')">kPa</v-btn>
              </v-col>
              <v-divider vertical style="width: 1px;background-color: #4c4949;"></v-divider>
              <v-col>
                <v-btn block class="switch-btn"
                  :color="unitsStore.pressureUnit === 'mm' ? '#2a2e3b' : '#191d2c'" 
                  @click="unitsStore.setPressureUnit('mm')">mm</v-btn>
              </v-col>
            </v-row>
          </v-card>

          <!-- Precipitation -->
          <v-row>
            <v-text class="." style="margin-left: 20px; padding: 20px; color:gray;">Precipitation</v-text>
          </v-row>
           <v-card class="switch">
            <v-row>
              <v-col>
                <v-btn block class="switch-btn"
                  :color="unitsStore.precipitationUnit === 'millimeters' ? '#2a2e3b' : '#191d2c'" 
                  @click="unitsStore.setPrecipitationUnit('millimeters')">Millimeters</v-btn>
              </v-col>
              <v-divider vertical style="width: 1px;background-color: #4c4949;"></v-divider>
              <v-col>
                <v-btn block class="switch-btn"
                  :color="unitsStore.precipitationUnit === 'inches' ? '#2a2e3b' : '#191d2c'" 
                  @click="unitsStore.setPrecipitationUnit('inches')">Inches</v-btn>
              </v-col>
            </v-row>
          </v-card>

          <!-- Distance -->
          <v-row>
            <v-text class="." style="margin-left: 20px; padding: 20px; color:gray;">Distance</v-text>
          </v-row>
          <v-card class="switch">
            <v-row>
              <v-col>
                <v-btn block class="switch-btn"
                  :color="unitsStore.distanceUnit === 'kilometers' ? '#2a2e3b' : '#191d2c'" 
                  @click="unitsStore.setDistanceUnit('kilometers')">Kilometers</v-btn>
              </v-col>
              <v-divider vertical style="width: 1px;background-color: #4c4949;"></v-divider>
              <v-col>
                <v-btn block class="switch-btn"
                  :color="unitsStore.distanceUnit === 'miles' ? '#2a2e3b' : '#191d2c'" 
                  @click="unitsStore.setDistanceUnit('miles')">Miles</v-btn>
              </v-col>
            </v-row>
          </v-card>
      </v-card-text>
    </v-card>

    <!-- Notification Card -->
    <v-card class="notification-card text-white mt-8" style="background-color:#2a2e3b; border-radius: 30px; padding: 20px;">
      <v-card-title class="notification-header">Notifications</v-card-title>
      <v-row align="center">
        <v-col cols="11">
          <p class="notification-text" style="margin-left: 20px; padding: 20px; color: gray;">Be aware of the weather</p>
        </v-col>
        <v-col cols="1">
          <v-switch 
            v-model="isNotificationOn"
            inset
            dense
            color="primary"
            @change="toggleNotification" 
          />
        </v-col>
      </v-row>  
    </v-card>

    <!-- Dialog for Notification Confirmation -->
    <v-dialog v-model="showDialog" max-width="400">
      <v-card class="dialog-card" style="border-radius: 10%;">
        <v-card-title class="dialog-title">
          <v-icon color="primary" class="mr-2">mdi-bell</v-icon>
          {{ dialogTitle }}
        </v-card-title>
        <v-card-text class="dialog-text">{{ dialogMessage }}</v-card-text>
        <v-card-actions class="dialog-actions">
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="showDialog = false" class="dialog-button">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-card class="logout-card text-white mt-8 mb-8" style="background-color:#2a2e3b; border-radius: 30px; padding: 20px;">
      <v-row>
        <v-col cols="11"> <v-card-title class="logout-header" style="color: gray;">Log out</v-card-title></v-col>
        <router-link to="/login" class="logout-icon-link">
            <v-icon size="24" class="pt-8 pl-10">mdi-logout</v-icon>
          </router-link>
      </v-row>
    </v-card>

  </v-container>
</template>

  
<script setup>
import { useUnitsStore } from '@/stores/unit';

const unitsStore = useUnitsStore();
import { ref } from 'vue';

const isNotificationOn = ref(false);
const showDialog = ref(false);
const dialogTitle = ref('');
const dialogMessage = ref('');

function toggleNotification() {
  showDialog.value = true; 
  if (isNotificationOn.value) {
    dialogTitle.value = "Notifications Enabled!";
    dialogMessage.value = "You will now receive weather notifications.";
  } else {
    dialogTitle.value = "Notifications Disabled!";
    dialogMessage.value = "You will no longer receive weather notifications.";
  }
}
</script>

<style scoped>
  .switch {
   background-color:#191d2c;
   margin-left: 30px;
   border-radius: 15px;
   padding-right: 10px;
  }
  .switch-btn{
    border-radius: 10px; 
    margin: 5px;
  }

  .dialog-card {
  border-radius: 50px;
  padding: 16px;
  background-color: #333945;
  color: #ffffff;
}

.dialog-title {
  display: flex;
  align-items: center;
  font-weight: bold;
  color: #ffffff;
  font-size: 1.25em;
}

.dialog-text {
  font-size: 1em;
  color: #b0b3b8;
  margin-top: 10px;
  margin-bottom: 10px;
}


.dialog-actions {
  justify-content: flex-end;
  padding-top: 12px;
}


.dialog-button {
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 10px;
  padding: 10px 20px;
}

.logout-icon-link {
  color: white;
  text-align: center;
  text-decoration: none;
}
 
</style>
