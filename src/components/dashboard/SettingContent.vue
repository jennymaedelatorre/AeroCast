<template>
  <v-container class="text-white">
    <v-card class="units-cards text-white mt-8" height="auto" style="background-color:#2a2e3b; border-radius: 30px; padding: 20px;"> 
        <v-card-title>Units</v-card-title>    

      
        <v-card-text>
          <!-- Temperature -->
          <v-row>
            <v-text class="." style="margin-left: 20px; padding: 20px; color:gray;">Temperature</v-text>
          </v-row>
          <v-card style="margin-left: 40px;">
            <v-row>
              <v-col class="px-0">
                <v-btn block value="celsius">Celsius</v-btn>
              </v-col>
              <v-col class="px-0">
                <v-btn block value="fahrenheit">Fahrenheit</v-btn>
              </v-col>
            </v-row>
          </v-card>

          <!-- Wind Speed -->
          <v-row>
            <v-text class="." style="margin-left: 20px; padding: 20px; color:gray;">Wind Speed</v-text>
          </v-row>
          <v-card style="margin-left: 40px;">
            <v-row style="background-color: #2a2e3b;">
              <v-col class="px-0">
                <v-btn block value="km/h">km/h</v-btn>
              </v-col>
              <v-col class="px-0">
                <v-btn block value="m/s">m/s</v-btn>
              </v-col>
              <v-col class="px-0">
                <v-btn block value="Knots">Knots</v-btn>
              </v-col>
            </v-row>
          </v-card>

          <!-- Pressure -->
          <v-row>
            <v-text class="." style="margin-left: 20px; padding: 20px; color:gray;">Pressure</v-text>
          </v-row>
          <v-card style="margin-left: 40px;">
            <v-row>
              <v-col class="px-0">
                <v-btn block value="hPa">hPa</v-btn>
              </v-col>
              <v-col class="px-0">
                <v-btn block value="Inches">Inches</v-btn>
              </v-col>
              <v-col class="px-0">
                <v-btn block value="kPa">kPa</v-btn>
              </v-col>
              <v-col class="px-0">
                <v-btn block value="mm">mm</v-btn>
              </v-col>
            </v-row>
          </v-card>

          <!-- Precipitation -->
          <v-row>
            <v-text class="." style="margin-left: 20px; padding: 20px; color:gray;">Precipitation</v-text>
          </v-row>
          <v-card style="margin-left: 40px;">
            <v-row>
              <v-col class="px-0" >
                <v-btn block value="Millimeters">Millimeters</v-btn>
              </v-col>
              <v-col class="px-0">
                <v-btn block value="Inches">Inches</v-btn>
              </v-col>
            </v-row>
          </v-card>

          <!-- Distance -->
          <v-row>
            <v-text class="." style="margin-left: 20px; padding: 20px; color:gray;">Distance</v-text>
          </v-row>
          <v-card style="margin-left: 40px; ">
            <v-row>
              
              <v-col class="px-0">
                <v-btn block value="Kilometers">Kilometers</v-btn>
              </v-col>
              <v-col class="px-0">
                <v-btn block value="Miles">Miles</v-btn>
              </v-col>
            </v-row>
          </v-card>
          
          
      </v-card-text>
   
    </v-card>

    <v-card class="notification-card text-white mt-8" style="background-color:#2a2e3b; border-radius: 30px; padding: 20px;">
      <v-card-title class="notification-header">Notifications</v-card-title>
      <v-card-text>
        <v-row align="center">
          <v-col cols="10">
            <p class="notification-text" style="padding: 20px; color:gray;">Be aware of the weather</p>
          </v-col>
          <v-col cols="2">
            <v-switch
              v-model="isNotificationOn"
              inset
              dense
              color="primary"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>


  </v-container>
</template>
  
  <script>
  export default {
    name: "SettingContent",
    data() {
    return {
      isNotificationOn: true, // default value for the switch
    };
  },
  };

  </script>
  
  <style scoped>


  </style>
  