<template>
  <v-container class="text-white">
    <v-card class="units-cards text-white mt-8" height="auto" style="background-color:#2a2e3b; border-radius: 30px; padding: 20px;"> 
      <v-card-title>Units
      </v-card-title>         
      <v-card-text>
          <!-- Temperature -->
          <v-row>
            <v-text class="." style="margin-left: 20px; padding: 20px; color:gray;">Temperature</v-text>
          </v-row>
          <v-card  color="#2a2e3b" style="margin-left: 40px;">
            <v-row v-model="value" active>
              <v-col class="px-0">
                <v-btn block 
                :color="tempUnit === 'celsius' ? '#2a2e3b' : '#191d2c'" 
                @click="tempUnit = 'celsius'" value="celsius">Celsius</v-btn>
              </v-col>
              <v-divider vertical style="width: 1px;background-color: #4c4949;"></v-divider>
              <v-col class="px-0">
                <v-btn block 
                :color="tempUnit === 'fahrenheit' ? '#2a2e3b' : '#191d2c'" 
                @click="tempUnit = 'fahrenheit'" value="fahrenheit" >Fahrenheit</v-btn>
              </v-col>
            </v-row>
          </v-card>

          <!-- Wind Speed -->
          <v-row>
            <v-text class="." style="margin-left: 20px; padding: 20px; color:gray;">Wind Speed</v-text>
          </v-row>
          <v-card color="#2a2e3b" style="margin-left: 40px;">
            <v-row style="background-color: #2a2e3b;">
              <v-col class="px-0">
                <v-btn block 
                :color="windSpeedUnit === 'km/h' ? '#2a2e3b' : '#191d2c'" 
                @click="windSpeedUnit = 'km/h'"
                value="km/h">km/h</v-btn>
              </v-col>
              <v-divider vertical style="width: 1px;background-color: #4c4949;"></v-divider>
              <v-col class="px-0">
                <v-btn block 
                :color="windSpeedUnit === 'm/s' ? '#2a2e3b' : '#191d2c'" 
                @click="windSpeedUnit = 'm/s'"
                value="m/s">m/s</v-btn>
              </v-col>
              <v-divider vertical style="width: 1px;background-color: #4c4949;"></v-divider>
              <v-col class="px-0">
                <v-btn block 
                :color="windSpeedUnit === 'knots' ? '#2a2e3b' : '#191d2c'" 
                @click="windSpeedUnit = 'knots'"
                value="knots">Knots</v-btn>
              </v-col>
            </v-row>
          </v-card>

          <!-- Pressure -->
          <v-row>
            <v-text class="." style="margin-left: 20px; padding: 20px; color:gray;">Pressure</v-text>
          </v-row>
          <v-card color="#2a2e3b" style="margin-left: 40px;">
            <v-row>
              <v-col class="px-0">
                <v-btn block 
                :color="pressureUnit === 'hPa' ? '#2a2e3b' : '#191d2c'" 
                @click="pressureUnit = 'hPa'"
                value="hPa">hPa</v-btn>
              </v-col>
              <v-divider vertical style="width: 1px;background-color: #4c4949;"></v-divider>
              <v-col class="px-0">
                <v-btn block 
                :color="pressureUnit === 'inches' ? '#2a2e3b' : '#191d2c'" 
                @click="pressureUnit = 'inches'"
                value="inches">Inches</v-btn>
              </v-col>
              <v-divider vertical style="width: 1px;background-color: #4c4949;"></v-divider>
              <v-col class="px-0">
                <v-btn block 
                :color="pressureUnit === 'kPa' ? '#2a2e3b' : '#191d2c'" 
                @click="pressureUnit = 'kPa'"
                value="kPa">kPa</v-btn>
              </v-col>
              <v-divider vertical style="width: 1px;background-color: #4c4949;"></v-divider>
              <v-col class="px-0">
                <v-btn block 
                :color="pressureUnit === 'mm' ? '#2a2e3b' : '#191d2c'" 
                @click="pressureUnit = 'mm'"
                value="mm">mm</v-btn>
              </v-col>
            </v-row>
          </v-card>

          <!-- Precipitation -->
          <v-row>
            <v-text class="." style="margin-left: 20px; padding: 20px; color:gray;">Precipitation</v-text>
          </v-row>
           <v-card color="#2a2e3b" style="margin-left: 40px;"><!-- color="#2a2e3b" -->
            <v-row>
              <v-col class="px-0" >
                <v-btn block 
                :color="precipitationUnit === 'millimeters' ? '#2a2e3b' : '#191d2c'" 
                @click="precipitationUnit = 'millimeters'"
                value="millimeters">Millimeters</v-btn>
              </v-col>
              <v-divider vertical style="width: 1px;background-color: #4c4949;"></v-divider>
              <v-col class="px-0">
                <v-btn block 
                :color="precipitationUnit === 'inches' ? '#2a2e3b' : '#191d2c'" 
                @click="precipitationUnit = 'inches'"
                value="inches">Inches</v-btn>
              </v-col>
            </v-row>
          </v-card>

          <!-- Distance -->
          <v-row>
            <v-text class="." style="margin-left: 20px; padding: 20px; color:gray;">Distance</v-text>
          </v-row>
          <v-card color="#2a2e3b" style="margin-left: 40px; ">
            <v-row>              
              <v-col class="px-0">
                <v-btn block 
                :color="distanceUnit === 'kilometers' ? '#2a2e3b' : '#191d2c'" 
                @click="distanceUnit = 'kilometers'"
                value="kilometers">Kilometers</v-btn>
              </v-col>
              <v-divider vertical style="width: 1px;background-color: #4c4949;"></v-divider>
              <v-col class="px-0">
                <v-btn block 
                :color="distanceUnit === 'miles' ? '#2a2e3b' : '#191d2c'" 
                @click="distanceUnit = 'miles'"
                value="miles">Miles</v-btn>
              </v-col>
            </v-row>
          </v-card>
      </v-card-text>
    </v-card>

    <v-card class="notification-card text-white mt-8" style="background-color:#2a2e3b; border-radius: 30px; padding: 20px;">
      <v-card-title class="notification-header">Notifications</v-card-title>
        <v-row align="center">
          <v-col cols="11">
            <p class="notification-text" style="margin-left: 20px; padding: 20px; color:gray;">Be aware of the weather</p>
          </v-col>
          <v-col cols="1">
            <v-switch
              v-model="isNotificationOn"
              inset
              dense
              color="primary"
            />
          </v-col>
        </v-row>  
    </v-card>

    <v-card class="logout-card text-white mt-8" style="background-color:#2a2e3b; border-radius: 30px; padding: 20px;">
      <v-row>
        <v-col cols="11"> <v-card-title class="logout-header">Log out</v-card-title></v-col>
        <v-col cols="1" > <v-icon size="24" class="pt-5 pl-5">mdi-logout</v-icon></v-col>
      </v-row>
    </v-card>

  </v-container>
</template>
  
  <script>
  export default {
    name: "SettingContent",
    data() {
    return {
      tempUnit:'celsius',
      windSpeedUnit:'km/h',
      pressureUnit:'mm',
      precipitationUnit:'millimeters',
      distanceUnit:'kilometers', 
      isNotificationOn: true // default value for the switch
    };
  },
  };

  </script>
  
  <style scoped>

 

  </style>
