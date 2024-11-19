<script setup>

  import { ref } from 'vue'
  import { requiredValidator, emailValidator } from '@/utils/validators';
  import { supabase,formActionDefault } from '@/utils/supabase';
  import { useRouter } from 'vue-router';
  import AlertNotification from '@/components/common/AlertNotification.vue';

  // Utilize pre-defined vue  functions
  const router = useRouter()

  // Load Variables
  const formDataDefault = {
    email: '',
    password: '',
  }
  const formData = ref({
    ...formDataDefault
  })
  const formAction = ref({
    ...formActionDefault
  })
  const visible = ref(false)
  const refVform = ref()

  const onSubmit = async () => {
    // Reset Form Action utils
    formAction.value = {... formActionDefault}
    // Turn on processing
    formAction.value.formProcess = true

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.value.email,
      password: formData.value.password
    })

    if(error){
      // console.log(error) Add Error Message and Status Code
      formAction.value.formErrorMessage = error.message
      formAction.value.formStatus = error.status
    }
    else if(data){
      // console.log(data) Add Success Message 
      formAction.value.formSuccessMessage = 'Successfully Logged Account.'
      // Add here more actions if you want
      router.replace('/dashboard')
    }

    // Reset Form
    refVform.value?.reset()
    // Turn off Processing
    formAction.value.formProcess = false
  }

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

  <v-form ref="refVform" fast-fail @submit.prevent="onFormSubmit" class="text-slide-down">
      <v-text-field 
      v-model="formData.email"
      label="Email" 
      name="Email" 
      prepend-icon="mdi-email" 
      type="text" 
      color="teal accent-3"
      :rules="[requiredValidator, emailValidator]" 
      />

      <v-text-field 
      v-model="formData.password"
      id="password-confirmation" 
      label="Password" 
      name="Password" 
      prepend-icon="mdi-lock"
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" 
      :type="visible ? 'text' : 'password'"
      color="teal accent-3" 
      @click:append-inner="visible = !visible" 
      :rules="[requiredValidator]" 
      />

      
      <div class="text-center mt-3 mb-10">
          <v-btn rounded
              type="submit"
              class="custom-btn-gradient">SIGN IN
          </v-btn>
      </div>
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