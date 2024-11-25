<template>
    <v-container class="calendar text-white">
        <v-col>
          <v-card class="calendar-card text-white" height="auto" style="background-color:#2a2e3b; border-radius: 30px; padding: 40px;"> 
            <FullCalendar :options="calendarOptions" />
          </v-card>
        </v-col>
    </v-container>
  </template>
  
  <script>

    import FullCalendar from '@fullcalendar/vue3'
    import dayGridPlugin from '@fullcalendar/daygrid'
    import interactionPlugin from '@fullcalendar/interaction'

    export default {
      components: {
        FullCalendar // make the <FullCalendar> tag available
      },
      data() {
        return {
          calendarOptions: {
            plugins: [ dayGridPlugin, interactionPlugin ],
            initialView: 'dayGridMonth'
          }
        }
      }
    }

  </script>
  
  <style scoped>
  .calendar{
    margin-top:-40px;
    margin-left: 0;
  }
  </style>
  