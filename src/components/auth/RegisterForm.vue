<script setup>
  import { ref } from 'vue'
  import { requiredValidator, emailValidator, passwordValidator, confirmedValidator } from '@/utils/validators';
  import AlertNotification from '@/components/common/AlertNotification.vue';
  import { supabase, formActionDefault } from '@/utils/supabase.js'
import AlertNotification from '@/components/common/AlertNotification.vue';

  const visible = ref(false)
  const IsPasswordConfirmVisible = ref(false)

  const refVform = ref()

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

  const onSubmit = async () => {
    formAction.value = {... formActionDefault}
    formAction.value.formProcess = true

    const { data, error } = await supabase.auth.signUp(
  {
    email: formData.value.email,
    password: formData.value.password,
    options: {
      data: {
        first_name: formData.value.firstname,
        lastname: formData.value.lastname,
      }
    }
  }
)

  if(error){
    console.log(error)
    formAction.value.formErrorMessage = error.message
    formAction.value.formStatus = error.status
  }
  else if(data){
    console.log(data)
    formAction.value.formSuccessMessage = 'Successfully Registered Account.'
    // Add here more actions if you want
    refVform.value?.reset()
}

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

    <v-form ref="refVform" @submit.prevent="onFormSubmit">
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
                        :rules="[requiredValidator, passwordValidator]"
                    ></v-text-field>
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
                <v-btn rounded
                    type="submit"
                    :disabled="formAction.formProcess"
                    :loading="formAction.formProcess"
                    style="background: linear-gradient(to bottom right, rgba(135, 206, 250, 1), rgba(176, 224, 230, 1));">SIGN UP
                </v-btn>
            </div>
        </v-container>
    </v-form>
</template>