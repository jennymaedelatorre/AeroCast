<template>
  <v-container class="about">
    <!-- About Section -->
    <v-row dense>
      <v-col>
        <v-card class="about-card" style="background-color: #2a2e3b; color: #fff; border-radius: 20px; margin-left: -10px; padding: 20px;">
          <v-card-title class="text-h5"
            style="font-family: Georgia, 'Times New Roman', Times, serif; font-weight: bolder;">About
            Aerocast</v-card-title>
          <v-card-text>
            Welcome to our app! Aerocast is your ultimate weather companion, delivers weather
            details powered by advanced weather APIs, ensuring reliable information tailored to your location.. Stay
            informed with real-time updates for your selected default city,
            including current conditions, temperature, humidity, and more. Plan ahead with our detailed hourly forecasts
            and 5-day outlooks, ensuring you're prepared for any changes in the weather. Additionally, Aerocast provides
            helpful suggestions based on the current conditions, such as tips for staying safe during storms, dressing
            for colder temperatures, or making the most of sunny days. Aerocast provides everything you need to stay
            informed
            and prepared, all in a simple and reliable platform.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="text-center"
        style="color: white; font-weight: bolder; font-family: Georgia, 'Times New Roman', Times, serif">
        <h2>Meet Our Team</h2>
        <v-divider class="my-2"></v-divider>
      </v-col>
    </v-row>

    <!-- Cards Section -->
    <v-row dense justify="space-around" class="my-4">
      <!-- Card 1 -->
      <v-col cols="12" sm="4" class="mb-4"> 
        <v-card class="team-card mx-auto" max-width="344" style="background-color:#2a2e3b; color: white; border-radius: 20px;">
          <v-img height="200px" src="/imgs/zoe.jpg" cover></v-img>

          <v-card-title style="font-family: Georgia, 'Times New Roman', Times, serif; font-weight: bolder">
            Reones Arjayle Espina
          </v-card-title>

          <v-card-subtitle>
            System Analyst
          </v-card-subtitle>

          <v-card-actions>
            <v-btn color="orange-lighten-2" text>Contact Me</v-btn>
            <v-spacer></v-spacer>
            <v-btn :icon="show[0] ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="toggleCard(0)"></v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show[0]">
              <v-divider></v-divider>
              <v-card-text>
                Dedicated to ensuring smooth system operations and efficient project analysis.
                Skilled in graphic design with a keen eye for creating visually appealing and impactful designs.
                Studied at Caraga State University, currently a 3rd-year IT student with a passion for creativity and
                innovation.
              </v-card-text>
            </div>
          </v-expand-transition>

          <!-- Social Icons -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon href="https://web.facebook.com/reonestarjayle.espina" target="_blank" aria-label="Facebook">
              <v-icon color="white">mdi-facebook</v-icon>
            </v-btn>
            <v-btn icon href="https://www.linkedin.com/in/reonest-espina-6b8b81327/" target="_blank" aria-label="Instagram">
              <v-icon style="color:#0077B5">mdi-linkedin</v-icon>
            </v-btn>
            <v-btn icon href="https://reonestarjayleespina.github.io/" target="_blank" aria-label="Website">
              <v-icon color="green">mdi-web</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Card 2 -->
      <v-col cols="12" sm="4" class="mb-4"> 
        <v-card class="team-card mx-auto" max-width="344" style="background-color:#2a2e3b; color: white; border-radius: 20px;">
          <v-img height="200px" src="/imgs/jenny.jpg" cover></v-img>

          <v-card-title style="font-family: Georgia, 'Times New Roman', Times, serif; font-weight: bolder">
            Jenny Mae De La Torre
          </v-card-title>

          <v-card-subtitle>
            Developer
          </v-card-subtitle>

          <v-card-actions>
            <v-btn color="orange-lighten-2" text>Contact Me</v-btn>
            <v-spacer></v-spacer>
            <v-btn :icon="show[1] ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="toggleCard(1)"></v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show[1]">
              <v-divider></v-divider>
              <v-card-text>
                Passionate about building scalable and user-friendly applications.
                Studied at Caraga State University, currently a 3rd-year IT student and an aspiring web developer.
                Aspires to become a skilled web developer and enjoys editing and graphic designing, combining technical
                skills with
                creativity.
              </v-card-text>
            </div>
          </v-expand-transition>

          <!-- Social Icons -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon href="https://web.facebook.com/jennymae.quarteros/" target="_blank" aria-label="Facebook">
              <v-icon color="white">mdi-facebook</v-icon>
            </v-btn>
            <v-btn icon href="https://www.instagram.com/jennymae_15/profilecard/?igsh=MXA1eXJlYzhscWVxbQ=="
              target="_blank" aria-label="Instagram">
              <v-icon color="pink">mdi-instagram</v-icon>
            </v-btn>
            <v-btn icon href="https://jennymaedelatorre.github.io/" target="_blank" aria-label="Website">
              <v-icon color="green">mdi-web</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Card 3 -->
      <v-col cols="12" sm="4" class="mb-4">
        <v-card class="team-card mx-auto" max-width="344" style="background-color:#2a2e3b; color: white; border-radius: 20px;">
          <v-img height="200px" src="/imgs/kyte.jpg" cover></v-img>

          <v-card-title style="font-family: Georgia, 'Times New Roman', Times, serif; font-weight: bolder">
            Honey Kyte Castillano
          </v-card-title>

          <v-card-subtitle>
            Developer
          </v-card-subtitle>

          <v-card-actions>
            <v-btn color="orange-lighten-2" text>Contact Me</v-btn>
            <v-spacer></v-spacer>
            <v-btn :icon="show[2] ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="toggleCard(2)"></v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show[2]">
              <v-divider></v-divider>
              <v-card-text>
                Expert in turning creative ideas into functional solutions.
                Highly skilled in cybersecurity and debugging, ensuring secure and seamless application performance.
                Passionate about problem-solving, innovation, and delivering efficient and reliable solutions.
                Studied at Caraga State University, currently a 3rd-year IT student dedicated to mastering cybersecurity, 
                software development and debugging.
              </v-card-text>
            </div>
          </v-expand-transition>

          <!-- Social Icons -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon href="https://web.facebook.com/honeykyte.castillano" target="_blank" aria-label="Facebook">
              <v-icon color="white">mdi-facebook</v-icon>
            </v-btn>
            <v-btn icon href="https://www.linkedin.com/in/honey-kyte-castillano-aa6762328/" target="_blank"
              aria-label="Instagram">
              <v-icon style="color:#0077B5">mdi-linkedin</v-icon>
            </v-btn>
            <v-btn icon href="https://honeykytecastillano.github.io/" target="_blank" aria-label="Website">
              <v-icon color="green">mdi-web</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'


const show = ref([false, false, false])


const toggleCard = (index) => {
  show.value[index] = !show.value[index]
}
</script>

<style scoped>
.about {
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

.about-card {
  transition: transform 0.3s ease; 
}

.about-card:hover {
  transform: scale(1.02); 
}

.team-card {
  transition: transform 0.3s ease; 
}

.team-card:hover {
  transform: translateY(-10px); 
}

</style>
