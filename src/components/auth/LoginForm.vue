<script setup>
  import { ref } from 'vue'
  import { requiredValidator, emailValidator } from '@/utils/validators';

  const visible = ref(false)

  const refVform = ref()

  const formDataDefault = {
    email: '',
    password: '',
  }

  const formData = ref({
    ...formDataDefault
  })

  const onSubmit = () => {
    alert(formData.value.password)
  }

  const onFormSubmit = () => {
    refVform.value?.validate().then(({ valid }) => {
        if (valid) onSubmit()
     })
  }
</script>

<template>
    <v-form ref="refVform" fast-fail @submit.prevent="onFormSubmit">
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
        id="password" 
        label="Password" 
        name="Password" 
        prepend-icon="mdi-lock"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" 
        :type="visible ? 'text' : 'password'"
        color="teal accent-3" 
        @click:append-inner="visible = !visible" 
        :rules="[requiredValidator]" 
        />

        
        <div class="text-center mt-3 mb-10 ">
            <v-btn rounded
                type="submit"
                style="background: linear-gradient(to bottom right, rgba(135, 206, 250, 1), rgba(176, 224, 230, 1)); text-decoration: none;">
                <RouterLink to="/dashboard" style="text-decoration: none; color:white "> SIGN IN</RouterLink>
            </v-btn>
        </div>
    </v-form>
</template>