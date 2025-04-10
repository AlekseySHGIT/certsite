<template>
  <v-container fluid class="fill-height bg-grey-lighten-4">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-4 mx-auto" max-width="500" variant="outlined" elevation="1">
          <v-card-title class="text-h5 text-center mb-4">Авторизация</v-card-title>
          
          <v-form ref="form" @submit.prevent="submitLogin" validate-on="submit">
            <v-text-field
              v-model="credentials.email"
              label="Email"
              variant="outlined"
              density="comfortable"
              bg-color="white"
              prepend-inner-icon="mdi-account"
              :rules="[rules.required]"
              class="mb-4"
              hide-details="auto"
            ></v-text-field>
            
            <v-text-field
              v-model="credentials.password"
              label="Пароль"
              variant="outlined"
              density="comfortable"
              bg-color="white"
              prepend-inner-icon="mdi-lock"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="showPassword = !showPassword"
              :type="showPassword ? 'text' : 'password'"
              :rules="[rules.required]"
              class="mb-4"
              hide-details="auto"
            ></v-text-field>
            
            <v-alert
              v-if="errorMessage"
              type="error"
              variant="tonal"
              density="compact"
              class="mb-4"
            >
              {{ errorMessage }}
            </v-alert>
            
            <v-btn
              type="submit"
              color="primary"
              block
              size="large"
              :loading="loading"
              class="mb-4"
              elevation="1"
            >
              Войти
            </v-btn>
            
            <v-divider class="mb-4"></v-divider>
            
            <div class="text-center text-caption text-grey">
              <p class="mb-1">Для входа используйте:</p>
              <p class="mb-1">Email: client@client.cc / manager@manager.cc / admin@admin.cc</p>
              <p class="mb-0">Пароль: такой же, как Email</p>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

const router = useRouter()
const authStore = useAuthStore()
const form = ref(null)
const showPassword = ref(false)
const loading = ref(false)
const errorMessage = ref('')

const credentials = reactive({
  email: '',
  password: ''
})

const rules = {
  required: value => !!value || 'Обязательное поле',
}

const submitLogin = async () => {
  errorMessage.value = ''
  const { valid } = await form.value.validate()
  
  if (valid) {
    loading.value = true
    
    try {
      await authStore.login(credentials.email, credentials.password)
      router.push('/applications')
    } catch (error) {
      errorMessage.value = error.message || 'Ошибка входа. Проверьте введенные данные.'
    } finally {
      loading.value = false
    }
  }
}
</script>
