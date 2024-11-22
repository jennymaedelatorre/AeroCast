<script setup>
  import { ref } from 'vue'
  import { requiredValidator, emailValidator, passwordValidator, confirmedValidator } from '@/utils/validators';
  import AlertNotification from '@/components/common/AlertNotification.vue';
  import { supabase, formActionDefault } from '@/utils/supabase.js'
  import { useRouter } from 'vue-router'

  // Load pre-defined vue  functions
  const router = useRouter()

  // Load Variables
  const formDataDefault = {
    firstname:'',
    lastname:'',  
    email: '',
    password: '',
    password_confirmation:'',
  }

  const formData = ref({
    ...formDataDefault
  })
  const formAction = ref({
    ...formActionDefault
  })
  const visible = ref(false)
  const IsPasswordConfirmVisible = ref(false)
  const refVform = ref()

  // Register Functionality
  const onSubmit = async () => {
    // Reset Form Action utils
    formAction.value = {... formActionDefault}
    // Turn on processing
    formAction.value.formProcess = true

    const { data, error } = await supabase.auth.signUp(
      {
      email: formData.value.email,
      password: formData.value.password,
      options: {
        data: {
          first_name: formData.value.firstname,
          lastname: formData.value.lastname,
          is_admin: false //Just Turn to true if admin account
          //role: 'Administrator' // If role based
        }
      }
      }
    )

    if(error){
      // console.log(error) Add Error Message and Status Code
      formAction.value.formErrorMessage = error.message
      formAction.value.formStatus = error.status
    }
    else if(data){
      // console.log(data) Add Success Message 
      formAction.value.formSuccessMessage = 'Successfully Registered! You can now log in.'
      // Add here more actions if you want
      router.replace('/login')
    }

    // Reset Form
    refVform.value?.reset()
    // Turn off Processing
    formAction.value.formProcess = false
  }

  // Trigger Validators
  const onFormSubmit = () => {
    refVform.value?.validate().then(({ valid }) => {
        if (valid) onSubmit()
     })
  }
</script>

<template>
  <AlertNotification 
    :form-success-message="formAction.formSuccessMessage"
    :form-error-message="formAction.formErrorMessage"
  ></AlertNotification>  

  <v-form ref="refVform" @submit.prevent="onFormSubmit" class="text-slide-down">
        <v-container>
            <v-row>
                <!-- First Name and Last Name Side by Side -->
                <v-col cols="12" md="6">
                    <v-text-field
                        v-model="formData.firstname" 
                        label="First Name" 
                        prepend-icon="mdi-account" 
                        required
                        color="teal accent-3"
                        :rules="[requiredValidator]">
                    </v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                    <v-text-field
                        v-model="formData.lastname" 
                        label="Last Name" 
                        prepend-icon="mdi-account" 
                        required 
                        color="teal accent-3"
                        :rules="[requiredValidator]">
                    </v-text-field>
                </v-col>
            </v-row>

            <!-- Email Field-->
            <v-row>
                <v-col cols="12">
                    <v-text-field
                        v-model="formData.email" 
                        label="Email" 
                        prepend-icon="mdi-email" 
                        type="text"
                        color="teal accent-3"
                        :rules="[requiredValidator, emailValidator]">
                    </v-text-field>
                </v-col>
            </v-row>

            <!-- Password Field -->
            <v-row>
                <v-col cols="12">
                    <v-text-field
                        v-model="formData.password" 
                        id="password" 
                        label="Password" 
                        prepend-icon="mdi-lock"
                        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" 
                        :type="visible ? 'text' : 'password'"
                        color="teal accent-3" 
                        @click:append-inner="visible = !visible"
                        :rules="[requiredValidator, passwordValidator]">
                    </v-text-field>
                </v-col>
            </v-row>

            <!-- Password confirmation Field  -->
            <v-row>
                <v-col cols="12">
                    <v-text-field
                        v-model="formData.password_confirmation" 
                        id="password" 
                        label="Password Confirmation" 
                        prepend-icon="mdi-lock"
                        :append-inner-icon="IsPasswordConfirmVisible ? 'mdi-eye-off' : 'mdi-eye'" 
                        :type="IsPasswordConfirmVisible ? 'text' : 'password'"
                        color="teal accent-3" 
                        @click:append-inner="IsPasswordConfirmVisible = !IsPasswordConfirmVisible"
                        :rules="[requiredValidator, confirmedValidator(formData.password_confirmation,formData.password)]">
                    </v-text-field>
                </v-col>
            </v-row>

            <div class="text-center mt-3 mb-10">
                <!-- <v-btn rounded
                    type="submit"
                    class="custom-btn-gradient">SIGN UP
                </v-btn> -->  
              <v-btn
              rounded
              type="submit"
              class="custom-btn-gradient"
              :disabled="formAction.formProcess"
               > <!-- Disable if loading -->
              <template v-if="!formAction.formProcess">
                SIGN UP
              </template>
              <template v-else>
                <v-progress-circular
                  indeterminate
                  color="white"
                  size="20"
                ></v-progress-circular>
              </template>
          </v-btn>
            </div>
        </v-container>
    </v-form>
</template>

<style scoped>
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
.custom-btn-gradient {
  background-color: #121640;
  color: white;
  border: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
.custom-btn-gradient:hover {
  background: linear-gradient(to top right, #87cefa, #b0e0e6);
  color: white;
}
</style>