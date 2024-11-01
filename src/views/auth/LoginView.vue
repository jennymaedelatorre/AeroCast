<script setup>
import AppLayout from '@/components/layout/AppLayout.vue';
import LoginForm from '@/components/auth/LoginForm.vue';
import RegisterForm from '@/components/auth/RegisterForm.vue';

</script>

<!-- prepend-icon="mdi-account" -->

<template>
  <v-responsive class="border rounded">
    <v-app>
      <v-container class="full-height mt-16 mb-15" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="8">
          <v-card class="elevation-12 custom-border">
            <v-window v-model="step">
              <!-- First Window Item (Sign In) -->
              <v-window-item :value="-1">
                <v-row>
                  <!-- Left Side -->
                  <v-col cols="12" md="8">
                    <v-card-text class="mt-12 mx-7">
                      <h1 class="text-center display-2" style="color: rgba(176, 224, 230, 1);">Sign in to AeroCast</h1>
                      <div class="text-center mt-4 mb-8">
                        <v-icon class="mx-8">
                          <v-icon><i class="fa-brands fa-facebook" style="color: #05368a;"></i></v-icon>
                        </v-icon>
                        <v-icon class="me-8">
                          <v-icon><i class="fa-regular fa-envelope" style="color: #b52a12;"></i></v-icon>
                        </v-icon>
                        <v-icon>
                          <v-icon><i class="fa-brands fa-linkedin" style="color: #166bda;"></i></v-icon>
                        </v-icon>
                      </div>
                      <!-- <h4 class="text-center mt-4 mb-5">Ensure your email for registration</h4> -->
                      
                      <LoginForm></LoginForm>

                    </v-card-text>
                    <!-- <div class="text-center mt-3 mb-10">
                      <v-btn rounded
                        style="background: linear-gradient(to bottom right, rgba(135, 206, 250, 1), rgba(176, 224, 230, 1));">SIGN
                        IN</v-btn>
                    </div> -->
                  </v-col>

                  <!-- Right Side -->
                  <v-col cols="12" md="4"
                    style="background: linear-gradient(to bottom right, rgba(135, 206, 250, 1), rgba(176, 224, 230, 1));">
                    <v-card-text class="white--text mt-12" style="color: #fff;">
                      <h1 class="text-center display-1">Welcome!</h1>
                      <h5 class="text-center">Enter your personal email and start your journey with us</h5>
                    </v-card-text>
                    <div class="text-center mb-12">
                      <v-btn rounded outlined="" dark @click="nextStep">SIGN UP</v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-window-item>

              <!-- Second Window Item (Sign Up) -->
              <v-window-item :value="2">
                <v-row class="full-height">
                  <!-- Left Side -->
                  <v-col cols="12" md="4"
                    style="background: linear-gradient(to bottom right, rgba(135, 206, 250, 1), rgba(176, 224, 230, 1));">
                    <v-card-text class="mt-12" style="color:#fff;">
                      <h1 class="text-center display-1">Join Us Today!</h1>
                      <h5 class="text-center">To keep connected with us please login with your personal info</h5>
                    </v-card-text>
                    <div class="text-center mb-5">
                      <v-btn rounded outlined="" dark @click="previousStep">SIGN IN</v-btn>
                    </div>
                  </v-col>

                  <!-- Right Side -->
                  <v-col cols="12" md="8">
                    <v-card-text class="mt-12 mx-">
                      <h1 class="text-center display-2" style="color: rgba(176, 224, 230, 1);">Create an Account</h1>
                      <div class="text-center mt-4 mb-8">
                        <v-icon class="mx-8">
                          <v-icon><i class="fa-brands fa-facebook" style="color: #05368a;"></i></v-icon>
                        </v-icon>
                        <v-icon class="me-8">
                          <v-icon><i class="fa-regular fa-envelope" style="color: #b52a12;"></i></v-icon>
                        </v-icon>
                        <v-icon>
                          <v-icon><i class="fa-brands fa-linkedin" style="color: #166bda;"></i></v-icon>
                        </v-icon>
                      </div>
                      <!-- <h4 class="text-center mt-4 mb-5">Ensure your email for registration</h4> -->
                      
                      <RegisterForm></RegisterForm>

                    </v-card-text>
                    <!-- <div class="text-center mt-3 mb-10">
                      <v-btn rounded
                        style="background: linear-gradient(to bottom right, rgba(135, 206, 250, 1), rgba(176, 224, 230, 1));">SIGN
                        UP</v-btn>
                    </div> -->
                  </v-col>
                </v-row>
              </v-window-item>
            </v-window>
          </v-card>
        </v-col>
      </v-row>
      </v-container>
    </v-app>
  </v-responsive>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      step: 0, // Default to "Sign In" (Login Page)
    };
  },
  methods: {
    nextStep() {
      if (this.step < 1) { // Two steps: 0 (Login) and 1 (Register)
        this.step++;
        sessionStorage.setItem('currentStep', this.step); // Save current step to sessionStorage
      }
    },
    previousStep() {
      if (this.step > 0) {
        this.step--;
        sessionStorage.setItem('currentStep', this.step); // Save current step to sessionStorage
      }
    },
  },
  mounted() {
    // Retrieve saved step from sessionStorage (if any)
    const savedStep = sessionStorage.getItem('currentStep');

    if (savedStep !== null && !isNaN(savedStep)) {
      // Convert saved step to a number and set it as the current step
      this.step = parseInt(savedStep, 10);
    } else {
      // No saved step, ensure the default is login page (step 0)
      this.step = 0;
    }
  },
};
</script>


<style scoped>
.custom-border {
  border: 1px solid #fff;
}
</style>

<style>
body {
  font-family: 'Source Sans Pro', sans-serif;
}
</style>