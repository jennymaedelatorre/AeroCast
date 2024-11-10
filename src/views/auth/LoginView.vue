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
                    <v-card-text class="mt-12 mx-7 text-slide-down">
                      <h1 class="text-center display-2 gradient-text" style="font-size: 2.1rem">Sign in to AeroCast</h1>
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
                  <v-col cols="12" md="4" class="right-side-bg">
                    <v-img
                        :width="200" 
                        aspect-ratio="16/9" 
                        cover
                        src="/imgs/logo1.png" 
                        class="logo logo-float mt-12"
                        style="outline: none; margin: 0 auto;"
                    ></v-img>
                    <v-card-text class="white--text" style="color: #fff;">
                      <h1 class="text-center display-1 text-grow">Welcome!</h1> 
                      <h5 class="text-center text-slide-down">Enter your personal email and start your journey with us</h5> 
                    </v-card-text>
                    <div class="text-center mb-12">
                      <v-btn rounded outlined="" dark @click="nextStep" class="custom-btn-gradient text-grow">SIGN UP</v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-window-item>

              <!-- Second Window Item (Sign Up) -->
              <v-window-item :value="2">
                <v-row class="full-height">
                  <!-- Left Side -->
                  <v-col cols="12" md="4" class="right-side-bg">
                    <v-img
                        :width="200" 
                        aspect-ratio="16/9" 
                        cover
                        src="/imgs/logo1.png" 
                        class="logo mt-12"
                        style="outline: none; margin: 0 auto;"
                    ></v-img>
                    <v-card-text style="color:#fff;">
                      <h1 class="text-center display-1 text-grow">Join Us Today!</h1>
                      <h5 class="text-center text-slide-down">To keep connected with us please login with your personal info</h5>
                    </v-card-text>
                    <div class="text-center mb-5">
                      <v-btn rounded outlined="" dark @click="previousStep" class="custom-btn-gradient text-grow">SIGN IN</v-btn>
                    </div>
                  </v-col>

                  <!-- Right Side -->
                  <v-col cols="12" md="8">
                    <v-card-text class="mt-12 text-slide-down">
                      <h1 class="text-center display-2 gradient-text" style="font-size: 2.1rem">Create an Account</h1>
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
.gradient-text {
    background: linear-gradient(90deg, #a4508b, #5fddc1); 
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bold;
  }
@keyframes fadeIn {
  from {
    opacity: 0; 
  }
  to {
    opacity: 1; 
  }
}

@keyframes float {
  0% {
    transform: translateY(0); 
  }
  50% {
    transform: translateY(-5px); 
  }
  100% {
    transform: translateY(0); 
  }
}

.logo {
  margin: 0 auto;
  display: block;
  outline: none;
  border: none;
  box-shadow: none;
  animation: fadeIn 1s ease-in, float 2s ease-in-out infinite; /* Apply both animations */
}


@keyframes grow {
  from {
    transform: scale(0);
    opacity: 0; 
  }
  to {
    transform: scale(1); 
    opacity: 1; 
  }
}

.text-grow {
  animation: grow 0.5s ease forwards;
}



@keyframes slideDown {
  from {
    transform: translateY(-20px); 
    opacity: 0; 
  }
  to {
    transform: translateY(0); 
    opacity: 1; 
  }
}

.text-slide-down {
  animation: slideDown 0.5s ease forwards;
}



.custom-border {
  border: 1px solid #fff;
  border-radius: 20px;
  background: transparent;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px); 
}
.custom-btn-gradient {
  background: linear-gradient(to bottom right, #87cefa, #b0e0e6);
  color: white;
  border: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
.custom-btn-gradient:hover {
  background: linear-gradient(to top right, #87cefa, #b0e0e6);
  color: white;
}
</style>

<style>
.right-side-bg {
  background-color: #121640;
  /* background: url('/imgs/bg1.jpg') no-repeat center center;  */
  background-size: cover;
  color: #fff;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  background-size: cover; 
  background-attachment: fixed; 
  backdrop-filter: blur(3px);
}

</style>