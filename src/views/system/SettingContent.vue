<template>
  <v-container class="setting-container text-white mb-16">
    <v-card class="units-cards text-white" height="auto"
      style="background-color:#2a2e3b; border-radius: 20px; padding: 8px;">
      <v-card-title style="font-weight: bolder;">Units</v-card-title>
      <v-card-text>
        <!-- Temperature -->
        <v-row>
          <v-text class="." style="padding: 20px; color:gray;">Temperature</v-text>
        </v-row>
        <v-card class="switch">
          <v-row v-model="value" active>
            <v-col>
              <v-btn block class="switch-btn" :color="unitsStore.tempUnit === 'C' ? '#2a2e3b' : '#191d2c'"
                @click="unitsStore.setTempUnit('C')">Celsius</v-btn>
            </v-col>
            <v-divider vertical style="width: 1px;background-color: #4c4949;"></v-divider>
            <v-col>
              <v-btn block class="switch-btn" :color="unitsStore.tempUnit === 'F' ? '#2a2e3b' : '#191d2c'"
                @click="unitsStore.setTempUnit('F')">Fahrenheit</v-btn>
            </v-col>
          </v-row>
        </v-card>

        <!-- Wind Speed -->
        <v-row>
          <v-text class="." style="padding: 20px; color:gray;">Wind Speed</v-text>
        </v-row>
        <v-card class="switch">
          <v-row>
            <v-col>
              <v-btn block class="switch-btn" :color="unitsStore.windSpeedUnit === 'km/h' ? '#2a2e3b' : '#191d2c'"
                @click="unitsStore.setWindSpeedUnit('km/h')">km/h</v-btn>
            </v-col>
            <v-divider vertical style="width: 1px;background-color: #4c4949;"></v-divider>
            <v-col>
              <v-btn block class="switch-btn" :color="unitsStore.windSpeedUnit === 'm/s' ? '#2a2e3b' : '#191d2c'"
                @click="unitsStore.setWindSpeedUnit('m/s')">m/s</v-btn>
            </v-col>
          </v-row>
        </v-card>

        <!-- Pressure -->
        <v-row>
          <v-text class="." style="padding: 20px; color:gray;">Pressure</v-text>
        </v-row>
        <v-card class="switch">
          <v-row>
            <v-col>
              <v-btn block class="switch-btn" :color="unitsStore.pressureUnit === 'hPa' ? '#2a2e3b' : '#191d2c'"
                @click="unitsStore.setPressureUnit('hPa')">hPa</v-btn>
            </v-col>
            <v-divider vertical style="width: 1px;background-color: #4c4949;"></v-divider>
            <v-col>
              <v-btn block class="switch-btn" :color="unitsStore.pressureUnit === 'mm' ? '#2a2e3b' : '#191d2c'"
                @click="unitsStore.setPressureUnit('mm')">mm</v-btn>
            </v-col>
          </v-row>
        </v-card>

        <!-- Precipitation -->
        <v-row>
          <v-text class="." style="padding: 20px; color:gray;">Precipitation</v-text>
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
              <v-btn block class="switch-btn" :color="unitsStore.precipitationUnit === 'inches' ? '#2a2e3b' : '#191d2c'"
                @click="unitsStore.setPrecipitationUnit('inches')">Inches</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-card-text>
    </v-card>

    <!-- Notification Card -->
    <v-card class="notification-card text-white mt-5"
      style="background-color:#2a2e3b; border-radius: 20px; padding: 8px;">
      <v-card-title style="font-weight: bolder; font-size: 18px;">Notifications</v-card-title>
      <v-row align="center" no-gutters>
        <v-col cols="auto" class="d-flex align-center">
          <span class="notification-text" style="color: gray; padding-left: 20px">Be aware of the weather</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto" class="d-flex justify-end align-center pe-3">
          <v-switch v-model="isNotificationOn" inset dense color="primary" @change="toggleNotification" />
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

    <!-- Logout Card -->
    <v-card class="logout-card text-white mt-5 " style="background-color:#2a2e3b; border-radius: 20px; padding: 20px;"
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
import { supabase, formActionDefault } from '@/utils/supabase';
import { useRouter } from 'vue-router';

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
  text-decoration: none;
}
 
</style>
