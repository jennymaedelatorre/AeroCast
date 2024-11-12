<template>
    <v-container class="text-white">
      <v-card class="units-cards text-white" height="auto" style="background-color:#2a2e3b; border-radius: 30px; padding: 20px;"> 
        <FullCalendar :options="calendarOptions" />
      </v-card>
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
  /* Optional: Add specific styles for LocationContent */
  </style>
  